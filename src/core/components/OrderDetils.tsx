import getOrderById from "@/features/orders/queries/getOrderById";
import { getUploadThingUrl } from "@/utils/image-utils";
import { useQuery } from "@blitzjs/rpc";
import { Avatar, Divider, Group, Stack, Text } from "@mantine/core";

const OrderDetails = ({ orderId }: { orderId: string | null }) => {
  if (!orderId) return null;
  const [order] = useQuery(getOrderById, { orderId });

  return (
    <Stack>
      {order?.items?.map((item) => (
        <Stack key={item.id}>
          <Group justify="space-between">
            <Group>
              <Avatar src={getUploadThingUrl(item.product.productImageKey)} size={50} radius="md" />
              {item.product.title}
            </Group>
            <Text c="gray.7">{item.product.price} DT</Text>
          </Group>
        </Stack>
      ))}
      <Divider />
      <Group justify="space-between">
        <Text fw={500} fz={18}>
          Total Price
        </Text>
        <Text>{order?.totalPrice} DT</Text>
      </Group>
    </Stack>
  );
};

export default OrderDetails;
