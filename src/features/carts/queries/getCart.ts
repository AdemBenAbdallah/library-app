import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({}, { session: { userId } }) => {
  const cart = await db.cart.findUnique({
    where: { userId },
  });

  if (!cart) return null;

  return await db.cartItem.findMany({
    where: {
      cart: {
        id: cart.id,
      },
    },
    include: {
      product: true,
    },
  });
});
