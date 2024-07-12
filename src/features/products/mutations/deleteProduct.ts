import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  id: z.string().uuid(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async ({ id }) => {
  await db.product.delete({ where: { id: id } });
});
