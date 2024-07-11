import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Avatar, Button, Group, NumberInput, Stack, Table, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const CartTable = ({ items }) => {
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
      <Table.Td>
        <NumberInput w={100} defaultValue={item.quantity} min={1} />
      </Table.Td>
      <Table.Td style={{ cursor: "pointer" }}>
        <IconTrash size={20} stroke={1} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Book</Table.Th>
          <Table.Th visibleFrom="sm">Author</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const CartSummary = ({ subtotal, total }) => (
  <Stack c="white" p={20} flex={2} bg="black" style={{ borderRadius: 8 }}>
    <Text fw={500}>Shopping Cart</Text>
    <Stack gap={50}>
      <Stack>
        <Group justify="space-between">
          <Text>Subtotal</Text>
          <Text span>{subtotal} DT</Text>
        </Group>
        <Group justify="space-between">
          <Text>Subtotal</Text>
          <Text span>{subtotal} DT</Text>
        </Group>
        <Group justify="space-between">
          <Text>Subtotal</Text>
          <Text span>{subtotal} DT</Text>
        </Group>
      </Stack>
      <Stack>
        <Group justify="space-between">
          <Text fw={500}>Total</Text>
          <Text fw={500} span>
            {total} DT
          </Text>
        </Group>
        <Button size="sm" w="100%" bg="white" c="black">
          Checkout
        </Button>
      </Stack>
    </Stack>
  </Stack>
);

const CartPage: BlitzPage = () => {
  const cartItems = [
    {
      id: 1,
      avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
      title: "The 12 Week Year",
      author: "Mohammed Ali",
      price: 20.0,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <Layout title="Cart">
      <Stack w={{ base: "100%", md: 1000, lg: 1200 }} mx="auto">
        <Title>Shopping Cart</Title>
        <Group w="100%" align="start" gap={50}>
          <Stack flex={7}>
            <CartTable items={cartItems} />
          </Stack>
          <CartSummary subtotal={subtotal} total={total} />
        </Group>
      </Stack>
    </Layout>
  );
};

export default CartPage;
