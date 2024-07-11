import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import RenderTable, { Column } from "@/core/components/RenderTable";
import { StatsRing } from "@/core/components/StatsRing";
import UserAvatar from "@/core/components/UserAvatar";
import UserDetails from "@/core/components/UserDetails";
import Layout from "@/core/layouts/Layout";
import getUsersByAdmin from "@/features/users/queries/getUsersByAdmin";
import { GlobalModal } from "@/modals";
import { calculateAge } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { Badge, Center, Drawer, Flex, Group, Loader, Select, Stack } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { GenderType } from "@prisma/client";
import { IconEdit, IconEye, IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
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
      header: "Date de début d'abonnement",
      accessor: (user: UserType) => dayjs(user.lastSubscription?.startDate).format("YYYY-MM-DD"),
    },
    {
      header: "Date de fin d'abonnement",
      accessor: (user: UserType) => dayjs(user.lastSubscription?.endDate).format("YYYY-MM-DD"),
    },
    {
      header: "",
      accessor: (user: UserType) => (
        <Group>
          <IconEdit
            stroke={1}
            onClick={() =>
              openContextModal({
                modal: GlobalModal.AddUserSubsctiption,
                title: "Ajouter une nouvelle durée d'abonnement",
                innerProps: { userId: user.id },
              })
            }
            style={{ cursor: "pointer" }}
            size={25}
          />
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
    <Layout title="Users">
      <Flex gap={20}>
        <StatsRing />
        <Stack flex={8} gap={30}>
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
      </Flex>
      <Drawer opened={opened} onClose={close}>
        <Suspense fallback={<Loader />}>
          <UserDetails userId={userId} />
        </Suspense>
      </Drawer>
    </Layout>
  );
};

export default UsersPage;
UsersPage.authenticate = { role: "ADMIN" };
