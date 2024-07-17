import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import RenderTable, { Column } from "@/core/components/RenderTable";
import UserAvatar from "@/core/components/UserAvatar";
import UserDetails from "@/core/components/UserDetails";
import DashLayout from "@/core/layouts/DashLayout";
import getUsersByAdmin from "@/features/users/queries/getUsersByAdmin";
import { calculateAge } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { Badge, Center, Drawer, Group, Loader, Select, Stack } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { GenderType } from "@prisma/client";
import { IconEye, IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

const ITEMS_PER_PAGE = 10;

type FilterGenderType = {
  value: GenderType;
  label: string;
};

const UsersPage: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [genderFilter, setGenderFilter] = useState<FilterGenderType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useDebouncedState("", 200);

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ users, count, from, to }] = usePaginatedQuery(getUsersByAdmin, {
    orderBy: { id: "asc" },
    where: {
      role: "USER",
      name: search ? { contains: search, mode: "insensitive" } : undefined,
      gender: genderFilter?.value || undefined,
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  type UserType = (typeof users)[number];
  const columns: Column<UserType>[] = [
    {
      header: "Utilisateur",
      accessor: (user: UserType) => (
        <Group>
          <UserAvatar user={user} />
          {user.name}
        </Group>
      ),
    },
    { header: "E-mail", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Telephone", accessor: "phoneNumber" },
    { header: "Âge", accessor: (user: UserType) => calculateAge(user.birthdayDate) },
    {
      header: "Genre",
      accessor: (user: UserType) => (
        <Badge bg={user.gender === "MALE" ? "ocean-blue" : "bright-pink"} size="lg" circle>
          <Center>{user.gender === "MALE" ? <IconGenderMale size={20} /> : <IconGenderFemale size={20} />}</Center>
        </Badge>
      ),
    },

    {
      header: "date d'adhésion",
      accessor: (user: UserType) => dayjs(user.createdAt).format("YYYY-MM-DD"),
    },
    {
      header: "",
      accessor: (user: UserType) => (
        <Group>
          <IconEye
            onClick={() => {
              setUserId(user.id);
              open();
            }}
            stroke={1}
            style={{ cursor: "pointer" }}
            size={25}
          />
        </Group>
      ),
    },
  ];

  return (
    <DashLayout title="Users">
      <Stack gap={30}>
        <Group>
          <InputWithButton defaultValue={search} onChange={(event) => setSearch(event.currentTarget.value)} w={400} />
          <Select
            w={120}
            radius="xl"
            size="md"
            placeholder="Gender"
            data={[
              { value: "", label: "All" },
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
            value={genderFilter ? genderFilter.value : null}
            onChange={(_value, option: FilterGenderType) => setGenderFilter(option)}
          />
        </Group>
        {users && (
          <RenderTable
            data={users}
            columns={columns}
            totalCount={count}
            currentPage={page + 1}
            onPageChange={(newPage: number) => router.push({ query: { page: newPage - 1 } })}
            itemsPerPage={ITEMS_PER_PAGE}
            from={from}
            to={to}
          />
        )}
        {!users && <NotFound text="Aucun utilisateur trouvé." />}
      </Stack>
      <Drawer opened={opened} onClose={close}>
        <Suspense fallback={<Loader />}>
          <UserDetails userId={userId} />
        </Suspense>
      </Drawer>
    </DashLayout>
  );
};

export default UsersPage;
UsersPage.authenticate = { role: "ADMIN" };
