import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db, { OrderStatus } from "~/db";

const Input = z.object({
  id: z.string(),
  status: z.nativeEnum(OrderStatus),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async ({ id, status }) => {
  return await db.order.update({ where: { id }, data: { status: status } });
});
