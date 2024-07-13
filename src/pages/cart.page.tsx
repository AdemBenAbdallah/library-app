import Layout from "@/core/layouts/Layout";
import deleteCartItem from "@/features/carts/mutations/deleteCartItem";
import getCart from "@/features/carts/queries/getCart";
import { CartItemsType } from "@/features/carts/schema";
import DeleteModal from "@/modals/components/DeleteModal";
import { getUploadThingUrl } from "@/utils/image-utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Avatar, Button, Group, NumberInput, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { CartItem } from "@prisma/client";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

const CartTable = ({ items }: { items: CartItemsType }) => {
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectCartItem, setSelectCartItem] = useState<CartItem | null>(null);
  const [$deleteCartItem, { isLoading }] = useMutation(deleteCartItem, {});

  const rows = items?.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group>
          <Avatar src={getUploadThingUrl(item.product.productImageKey)} size={50} radius="md" />
          <Text visibleFrom="sm">{item.product.title}</Text>
        </Group>
      </Table.Td>
      <Table.Td visibleFrom="sm">{item.product.author}</Table.Td>
      <Table.Td>{item.product.price} DT</Table.Td>
      <Table.Td>
        <NumberInput w={100} defaultValue={item.quantity} min={1} />
      </Table.Td>
      <Table.Td style={{ cursor: "pointer" }}>
        <IconTrash
          onClick={() => {
            setSelectCartItem(item);
            openDelete();
          }}
          size={20}
          stroke={1}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
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
      <DeleteModal
        text="Voulez-vous vraiment supprimer ce produit ?"
        opened={openedDelete}
        close={closeDelete}
        loading={isLoading}
        onDelete={async () => {
          await $deleteCartItem({ cartItemId: selectCartItem!.id });
          showNotification({
            title: "Success",
            message: "Produit supprime avec succes",
            color: "green",
            icon: <IconTrash size={16} />,
          });
          closeDelete();
        }}
      />
    </>
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
  const [cartItems] = useQuery(getCart, {});

  const subtotal = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
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
