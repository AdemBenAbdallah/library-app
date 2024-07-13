import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  cartItemId: z.string(),
  quantity: z.number(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ cartItemId, quantity }) => {
  return await db.cartItem.update({ where: { id: cartItemId }, data: { quantity: { increment: quantity } } });
});
