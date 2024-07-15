import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import NotFountd from "@/core/components/NotFound";
import Layout from "@/core/layouts/Layout";
import deleteCartItem from "@/features/carts/mutations/deleteCartItem";
import getCart from "@/features/carts/queries/getCart";
import { CartItemsType } from "@/features/carts/schema";
import addOrder from "@/features/orders/mutations/addOrder";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import DeleteModal from "@/modals/components/DeleteModal";
import { getUploadThingUrl } from "@/utils/image-utils";
import { useStringQueryPram } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Avatar, Button, Group, NumberInput, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { CartItem } from "@prisma/client";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

type OrderProductType = { id: string; title: string; price: number; quantity: number };
const CartTable = ({
  items,
  setOrderProducts,
}: {
  items: CartItemsType;
  setOrderProducts: (value: React.SetStateAction<OrderProductType[] | null>) => void;
}) => {
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectCartItem, setSelectCartItem] = useState<CartItem | null>(null);
  const [$deleteCartItem, { isLoading }] = useMutation(deleteCartItem, {});

  const updateQuantity = (value: number | string, id: string, price: number) => {
    setOrderProducts((prev) => {
      if (!prev) return null;
      return prev.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: Number(value), price: price * Number(value) };
        }
        return cartItem;
      });
    });
  };
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
        <NumberInput
          onChange={(value) => updateQuantity(value, item.product.id, item.product.price)}
          defaultValue={item.quantity}
          w={100}
          min={1}
        />
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

const CartSummary = ({ orderProducts }: { orderProducts: OrderProductType[] | null }) => {
  const total = useMemo(() => orderProducts?.reduce((acc, item) => acc + item.price, 0), [orderProducts]);
  const [$addOrder] = useMutation(addOrder, {});
  return (
    <Stack c="white" p={20} flex={2} bg="black" style={{ borderRadius: 8 }}>
      <Text fw={500}>Shopping Cart</Text>
      <Stack gap={50}>
        <Stack>
          {orderProducts?.map((item) => (
            <Group key={item.id} justify="space-between">
              <Text>{item.title}</Text>
              <Text>{item.price} DT</Text>
            </Group>
          ))}
        </Stack>
        <Stack>
          <Group justify="space-between">
            <Text fw={500}>Total</Text>
            <Text fw={500} span>
              {total} DT
            </Text>
          </Group>
          <Button
            onClick={async () => {
              if (!orderProducts || !total) return;
              await $addOrder({ orderProducts, totalPrice: total });
              showNotification({
                title: "Success",
                message: "Commande effectue avec succes",
                color: "green",
                icon: <IconCheck size={16} />,
              });
            }}
            size="sm"
            w="100%"
            bg="white"
            c="black"
          >
            Checkout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const CartPage: BlitzPage = () => {
  const currentUser = useCurrentUser();
  const formType = useStringQueryPram("form") || "login";

  return (
    <Layout title="Cart">
      {currentUser && <CartDetails />}

      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm initialFormType={Array.isArray(formType) ? formType[0] : formType} />
        </Vertical>
      )}
    </Layout>
  );
};

const CartDetails = () => {
  const [cartItems] = useQuery(getCart, {});
  const [orderProducts, setOrderProducts] = useState<OrderProductType[] | null>(null);

  useEffect(() => {
    if (cartItems && cartItems?.length !== 0) {
      const newOrderProducts = cartItems?.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price * item.quantity,
        quantity: item.quantity,
      }));
      setOrderProducts(newOrderProducts);
    }
  }, [cartItems]);

  const isVide = !cartItems || cartItems?.length === 0;
  return (
    <Stack w={{ base: "100%", md: 1000, lg: 1200 }} mx="auto">
      <Title>Shopping Cart</Title>
      {isVide && <NotFountd text="Votre panier est vide" />}
      {!isVide && (
        <Group w="100%" align="start" gap={50}>
          <Stack flex={7}>
            <CartTable items={cartItems} setOrderProducts={setOrderProducts} />
          </Stack>
          <CartSummary orderProducts={orderProducts} />
        </Group>
      )}
    </Stack>
  );
};

export default CartPage;
