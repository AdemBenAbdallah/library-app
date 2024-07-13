import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  orderProducts: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  totalPrice: z.number(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ orderProducts, totalPrice }, { session: { userId } }) => {
    const newOrder = await db.order.create({
      data: {
        user: { connect: { id: userId } },
        totalPrice: totalPrice,
        status: "CREATED",
      },
    });

    await db.orderItem.createMany({
      data: orderProducts.map((orderProduct) => ({
        orderId: newOrder.id,
        productId: orderProduct.id,
        quantity: orderProduct.quantity,
        price: orderProduct.price,
      })),
    });

    await db.cartItem.deleteMany({});
  },
);
