import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({}, { session: { userId } }) => {
  const result = await db.cartItem.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      cart: {
        userId,
      },
    },
  });

  return result._sum?.quantity || 0;
});
