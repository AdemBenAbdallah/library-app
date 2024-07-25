import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  orderId: z.string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ orderId }) => {
  return await db.order.findUnique({ where: { id: orderId }, include: { items: { include: { product: true } } } });
});
