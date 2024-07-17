import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("LIVREUR"),
  async ({}, { session: { userId } }) => {
    const orders = await db.order.findMany({
      where: {
        livreurId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      take: 10,
    });

    const ordersWithTotalQuantities = orders.map((order) => {
      const totalQuantities = order.items.reduce((acc, item) => acc + item.quantity, 0);

      return {
        ...order,
        totalQuantities,
      };
    });

    return ordersWithTotalQuantities;
  },
);
