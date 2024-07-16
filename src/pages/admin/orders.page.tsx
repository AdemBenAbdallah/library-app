import { InputWithButton } from "@/core/components/InputWithButton";
import RenderTable, { Column } from "@/core/components/RenderTable";
import UserAvatar from "@/core/components/UserAvatar";
import DashLayout from "@/core/layouts/DashLayout";
import assignOrder from "@/features/orders/mutations/assignOrder";
import updateOrderStatus from "@/features/orders/mutations/updateOrderStatus";
import getOrdersByAdmin from "@/features/orders/queries/getOrdersByAdmin";
import getLivreurByAdmin from "@/features/users/queries/getLivreurByAdmin";
import { categoryNameFormat } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc";
import { Badge, Button, ComboboxItem, Group, Modal, Select, Stack, Tooltip } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { OrderStatus } from "@prisma/client";
import { IconEdit, IconSquareRoundedPlusFilled } from "@tabler/icons-react";
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
  const [openedAssign, { open: openAssign, close: closeAssign }] = useDisclosure(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [$updateOrderStatus, { isLoading }] = useMutation(updateOrderStatus);
  const [selected, setSelected] = useState<ComboboxItem | null>(null);
  const [livreurs, { isLoading: isLoadingLivreurs }] = useQuery(getLivreurByAdmin, { search: "" });
  const [$assignOrder] = useMutation(assignOrder);

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
        <Group>
          <Group
            onClick={() => {
              setSelectedOrderId(order.id);
              open();
            }}
          >
            <IconEdit stroke={1} style={{ cursor: "pointer" }} size={25} />
          </Group>
          <Tooltip
            onClick={() => {
              setSelectedOrderId(order.id);
              openAssign();
            }}
            label="Assign to livreur"
          >
            <IconSquareRoundedPlusFilled style={{ cursor: "pointer" }} size={25} />
          </Tooltip>
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
      <Modal opened={opened} onClose={close} title="Change status">
        <Stack>
          <Select
            size="lg"
            placeholder="Select status"
            data={Object.keys(OrderStatus).map((key) => ({
              value: key,
              label: categoryNameFormat(key) || "",
            }))}
            value={selected ? selected.value : null}
            onChange={(_value, option) => setSelected(option)}
          />
          <Group ml={"auto"}>
            <Button variant="outline">Cancel</Button>
            <Button
              loading={isLoading}
              disabled={!selected}
              onClick={async () => {
                await $updateOrderStatus({ id: selectedOrderId!, status: selected?.value as OrderStatus });
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
      <Modal opened={openedAssign} onClose={closeAssign} title="Assign to livreur">
        <Stack>
          <Select
            size="lg"
            placeholder="Choisissez un livreur"
            data={livreurs.map((livreur) => ({
              value: livreur.id,
              label: livreur.name || "",
            }))}
            disabled={isLoadingLivreurs}
            value={selected ? selected.value : null}
            onChange={(_value, option) => setSelected(option)}
          />
          <Group ml={"auto"}>
            <Button variant="outline">Cancel</Button>
            <Button
              loading={isLoading}
              disabled={!selected}
              onClick={async () => {
                if (!selectedOrderId || !selected) return;
                await $assignOrder({ orderId: selectedOrderId, livreurId: selected.value });
                showNotification({
                  color: "green",
                  title: "Updated",
                  message: "order assigned successfully",
                });
                setSelected(null);
              }}
            >
              Assign
            </Button>
          </Group>
        </Stack>
      </Modal>
    </DashLayout>
  );
};

export default AdminOrders;
