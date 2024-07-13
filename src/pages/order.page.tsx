import Layout from "@/core/layouts/Layout";
import getOrders from "@/features/orders/queries/getOrders";
import { OrdersType } from "@/features/orders/schema";
import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Badge, Group, Stack, Table, Title } from "@mantine/core";
import dayjs from "dayjs";
import { statusColor } from "./admin/orders.page";

const OrderTable = ({ items }: { items: OrdersType }) => {
  const rows = items.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{dayjs(item.createdAt).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>{item.totalPrice} DT</Table.Td>
      <Table.Td>{item.totalQuantities}</Table.Td>
      <Table.Td>
        <Badge size="md" variant="gradient" gradient={{ from: "gray", to: statusColor(item.status), deg: 90 }}>
          {item.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const OrderPage: BlitzPage = () => {
  const [orders] = useQuery(getOrders, {});

  return (
    <Layout title="Order">
      <Stack w={{ base: "100%", md: 1000, lg: 1200 }} mx="auto">
        <Title>Orders</Title>
        <Group w="100%" align="start" gap={50}>
          <Stack flex={7}>
            <OrderTable items={orders} />
          </Stack>
        </Group>
      </Stack>
    </Layout>
  );
};

export default OrderPage;
