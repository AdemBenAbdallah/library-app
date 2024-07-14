import { InputWithButton } from "@/core/components/InputWithButton";
import RenderTable, { Column } from "@/core/components/RenderTable";
import UserAvatar from "@/core/components/UserAvatar";
import DashLayout from "@/core/layouts/DashLayout";
import updateOrderStatus from "@/features/orders/mutations/updateOrderStatus";
import getOrdersByAdmin from "@/features/orders/queries/getOrdersByAdmin";
import { categoryNameFormat } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { Badge, Button, ComboboxItem, Group, Modal, Select, Stack } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { OrderStatus } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;
export const statusColor = (status: OrderStatus) => {
  switch (status) {
    case "CREATED":
      return "yellow";
    case "PROCESSING":
      return "green";
    case "DELIVERED":
      return "red";
    case "SHIPPED":
      return "blue";
    default:
      return "gray";
  }
};
const AdminOrders: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [$updateOrderStatus, { isLoading }] = useMutation(updateOrderStatus);
  const [selectedStatus, setSelectedStatus] = useState<ComboboxItem | null>(null);

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ orders, count, from, to }] = usePaginatedQuery(getOrdersByAdmin, {
    orderBy: { id: "asc" },
    where: {
      user: { name: search ? { contains: search, mode: "insensitive" } : undefined },
      status: statusFilter || undefined,
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  type OrderType = (typeof orders)[number];
  const columns: Column<OrderType>[] = [
    {
      header: "User",
      accessor: (order: OrderType) => (
        <Group>
          <UserAvatar user={order.user} />
          {order.user?.name}
        </Group>
      ),
    },
    {
      header: "Total",
      accessor: (order: OrderType) => `${order.totalPrice} DT`,
    },
    {
      header: "Status",
      accessor: (order: OrderType) => (
        <Badge size="md" variant="gradient" gradient={{ from: "gray", to: statusColor(order.status), deg: 90 }}>
          {order.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      accessor: (order: OrderType) => dayjs(order.createdAt).format("DD/MM/YYYY"),
    },
    {
      header: "",
      accessor: (order: OrderType) => (
        <Group
          onClick={() => {
            setSelectedOrderId(order.id);
            open();
          }}
        >
          <IconEdit stroke={1} onClick={() => {}} style={{ cursor: "pointer" }} size={25} />
        </Group>
      ),
    },
  ];
  return (
    <DashLayout>
      <Stack flex={8} gap={30}>
        <Group justify="space-between">
          <Group>
            <InputWithButton defaultValue={search} onChange={(event) => setSearch(event.currentTarget.value)} w={400} />
            <Select
              w={250}
              radius="xl"
              size="md"
              placeholder="Status"
              data={Object.keys(OrderStatus).map((key) => ({
                value: key,
                label: categoryNameFormat(key) || "",
              }))}
              value={statusFilter}
              onChange={(_value: OrderStatus) => setStatusFilter(_value)}
            />
          </Group>
        </Group>
        <RenderTable
          data={orders}
          columns={columns}
          totalCount={count}
          currentPage={page + 1}
          onPageChange={(newPage: number) => router.push({ query: { page: newPage - 1 } })}
          itemsPerPage={ITEMS_PER_PAGE}
          from={from}
          to={to}
        />
      </Stack>
      <Modal opened={opened} onClose={close} title="More Info">
        <Stack>
          <Select
            size="lg"
            placeholder="Choisissez une catégorie"
            data={Object.keys(OrderStatus).map((key) => ({
              value: key,
              label: categoryNameFormat(key) || "",
            }))}
            value={selectedStatus ? selectedStatus.value : null}
            onChange={(_value, option) => setSelectedStatus(option)}
          />
          <Group ml={"auto"}>
            <Button variant="outline">Cancel</Button>
            <Button
              loading={isLoading}
              disabled={!selectedStatus}
              onClick={async () => {
                await $updateOrderStatus({ id: selectedOrderId!, status: selectedStatus?.value as OrderStatus });
                showNotification({
                  color: "green",
                  title: "Updated",
                  message: "order status updated successfully",
                });
                close();
              }}
            >
              Update
            </Button>
          </Group>
        </Stack>
      </Modal>
    </DashLayout>
  );
};

export default AdminOrders;
