import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import RenderTable, { Column } from "@/core/components/RenderTable";
import { StatsRing } from "@/core/components/StatsRing";
import UserAvatar from "@/core/components/UserAvatar";
import Layout from "@/core/layouts/Layout";
import { CoachForm } from "@/features/users/form/CoachForm";
import deleteUser from "@/features/users/mutations/deleteUser";
import getUsersByAdmin from "@/features/users/queries/getUsersByAdmin";
import { calculateAge } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { Badge, Button, Center, Flex, Group, Modal, Select, Stack, Text } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { GenderType } from "@prisma/client";
import { IconGenderFemale, IconGenderMale, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

type FilterGenderType = {
  value: GenderType;
  label: string;
};
const ITEMS_PER_PAGE = 10;
const CoachsPage: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [genderFilter, setGenderFilter] = useState<FilterGenderType | null>(null);
  const [search, setSearch] = useDebouncedState("", 200);
  const [$deleteUser, { isLoading }] = useMutation(deleteUser, {});

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ users, count, from, to }] = usePaginatedQuery(getUsersByAdmin, {
    orderBy: { id: "asc" },
    where: {
      role: "COACH",
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
      header: "",
      accessor: (user: UserType) => (
        <IconTrash onClick={() => openDeleteModal(user.id)} style={{ cursor: "pointer" }} stroke={1} size={25} />
      ),
    },
  ];

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: "Supprimer votre Coach",
      centered: true,
      children: <Text size="md">Êtes-vous sûr de vouloir supprimer votre Coach ?</Text>,
      labels: { confirm: "Supprimer", cancel: "Cancel" },
      confirmProps: { color: "red", loading: isLoading },
      onConfirm: async () => {
        await $deleteUser({ id });
        notifications.show({
          title: "Coach supprimé",
          message: "Le Coach a bien été supprimé",
          color: "red",
        });
      },
    });

  const hasCoachs = users && users.length > 0;
  return (
    <Layout title="Coaches">
      <Flex gap={20}>
        <StatsRing />
        <Stack flex={8} gap={30}>
          <Group justify="space-between">
            <Group>
              <InputWithButton
                defaultValue={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                w={400}
              />
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
            <Button onClick={open} radius={"md"} c={"white"}>
              Add Coach
            </Button>
          </Group>
          {hasCoachs && (
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
          {!hasCoachs && <NotFound text="Aucun coach trouvé." />}
        </Stack>
      </Flex>
      <Modal opened={opened} onClose={close}>
        <CoachForm close={close} />
      </Modal>
    </Layout>
  );
};

export default CoachsPage;
