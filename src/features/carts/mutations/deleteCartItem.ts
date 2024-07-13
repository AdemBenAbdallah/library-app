import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  cartItemId: z.string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ cartItemId }) => {
  await db.cartItem.delete({ where: { id: cartItemId } });
});
