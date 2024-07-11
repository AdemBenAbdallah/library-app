import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Avatar, Badge, Group, Stack, Table, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

const OrderTable = ({ items }) => {
  const rows = items.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group>
          <Avatar src={item.avatar} size={50} radius="md" />
          <Text visibleFrom="sm">{item.title}</Text>
        </Group>
      </Table.Td>
      <Table.Td visibleFrom="sm">{item.author}</Table.Td>
      <Table.Td>{item.price} DT</Table.Td>
      <Table.Td>3</Table.Td>
      <Table.Td>
        <Badge size="md" variant="gradient" gradient={{ from: "gray", to: "yellow", deg: 90 }}>
          pending
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Book</Table.Th>
          <Table.Th visibleFrom="sm">Date</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const OrderSummary = ({ subtotal, total }) => (
  <Stack c="white" p={20} flex={2} bg="black" style={{ borderRadius: 8 }}>
    <Stack gap={50}>
      <Stack>
        <Group justify="space-between">
          <Text fw={500}>Subtotal</Text>
          <Text fw={500} span>
            {subtotal} DT
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>Subtotal</Text>
          <Text fw={500} span>
            {subtotal} DT
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>Subtotal</Text>
          <Text fw={500} span>
            {subtotal} DT
          </Text>
        </Group>
      </Stack>
      <Stack>
        <Group justify="space-between">
          <Text fw={500}>Total</Text>
          <Text fw={500} span>
            {total} DT
          </Text>
        </Group>
      </Stack>
    </Stack>
  </Stack>
);

const OrderPage: BlitzPage = () => {
  const orderItems = [
    {
      id: 1,
      avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
      title: "The 12 Week Year",
      author: dayjs(new Date()).format("YYYY-MM-DD"),
      price: 20.0,
      quantity: 1,
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <Layout title="Order">
      <Stack w={{ base: "100%", md: 1000, lg: 1200 }} mx="auto">
        <Title>Shopping Order</Title>
        <Group w="100%" align="start" gap={50}>
          <Stack flex={7}>
            <OrderTable items={orderItems} />
          </Stack>
          <OrderSummary subtotal={subtotal} total={total} />
        </Group>
      </Stack>
    </Layout>
  );
};

export default OrderPage;
