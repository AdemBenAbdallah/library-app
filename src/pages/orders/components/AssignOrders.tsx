import NotFountd from "@/core/components/NotFound";
import getAssignedOrders from "@/features/orders/queries/getAssignedOrders";
import { OrdersType } from "@/features/orders/schema";
import { statusColor, ToggleModal } from "@/pages/admin/orders.page";
import { useQuery } from "@blitzjs/rpc";
import { Badge, Group, Stack, Table, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

const OrderTable = ({ items }: { items: OrdersType }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

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
      <Table.Td>
        <Group
          onClick={() => {
            setSelectedOrderId(item.id);
            open();
          }}
        >
          <IconEdit stroke={1} style={{ cursor: "pointer" }} size={25} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Prix</Table.Th>
            <Table.Th>Quantité</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <ToggleModal opened={opened} close={close} selectedOrderId={selectedOrderId} />
    </>
  );
};

export const AssignOrders = () => {
  const [orders] = useQuery(getAssignedOrders, {});
  const isVide = !orders || orders.length === 0;
  return (
    <Stack w={{ base: "100%", md: 1000, lg: 1200 }} mx="auto">
      <Title mt={"sm"} fz={{ base: "xl", md: "2xl" }}>
        Commandes{" "}
      </Title>
      {isVide && <NotFountd text="Aucune commande" />}
      {!isVide && (
        <Group w="100%" align="start" gap={50}>
          <Stack flex={7}>
            <OrderTable items={orders} />
          </Stack>
        </Group>
      )}
    </Stack>
  );
};
