import { InputWithButton } from "@/core/components/InputWithButton";
import RenderTable, { Column } from "@/core/components/RenderTable";
import UserAvatar from "@/core/components/UserAvatar";
import DashLayout from "@/core/layouts/DashLayout";
import getOrdersByAdmin from "@/features/orders/queries/getOrdersByAdmin";
import { BlitzPage } from "@blitzjs/next";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { Group, Stack, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 10;
const AdminOrders: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ orders, count, from, to }] = usePaginatedQuery(getOrdersByAdmin, {
    orderBy: { id: "asc" },
    where: {
      user: { name: search ? { contains: search, mode: "insensitive" } : undefined },
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
      accessor: (order: OrderType) => <Text>{order.totalPrice} DT</Text>,
    },
    {
      header: "Status",
      accessor: (order: OrderType) => <Text>{order.status}</Text>,
    },
    {
      header: "Date",
      accessor: (order: OrderType) => <Text>{dayjs(order.createdAt).format("DD/MM/YYYY")}</Text>,
    },
  ];
  return (
    <DashLayout>
      <Stack flex={8} gap={30}>
        <Group justify="space-between">
          <Group>
            <InputWithButton defaultValue={search} onChange={(event) => setSearch(event.currentTarget.value)} w={400} />
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
    </DashLayout>
  );
};

export default AdminOrders;
