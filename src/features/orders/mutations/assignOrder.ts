import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  orderId: z.string(),
  livreurId: z.string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async ({ orderId, livreurId }) => {
  await db.order.update({
    where: { id: orderId },
    data: { livreurId: livreurId },
  });
});
