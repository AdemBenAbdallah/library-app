import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const Input = z.object({
  id: z.string().optional(),
});

export default resolver.pipe(resolver.zod(Input), async ({ id }) => {
  if (!id) throw new NotFoundError();

  return await db.product.findFirst({ where: { id: id } });
});
