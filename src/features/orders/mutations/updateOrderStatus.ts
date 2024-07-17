import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db, { OrderStatus } from "~/db";

const Input = z.object({
  id: z.string(),
  status: z.nativeEnum(OrderStatus),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ id, status }, ctx) => {
  if (ctx.session.role === "ADMIN") {
    return await db.order.update({ where: { id }, data: { status: status } });
  }

  if (ctx.session.role === "LIVREUR") {
    const isAssigned = await db.order.findUnique({ where: { id, livreurId: ctx.session.userId } });
    if (!isAssigned) throw new Error("You are not assigned to this order");

    return await db.order.update({ where: { id }, data: { status: status } });
  }

  throw new Error("You are not authorized to perform this action");
});
