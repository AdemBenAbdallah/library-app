import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import { z } from "zod";
import db from "~/db";

const Input = z.object({
  id: z.string().optional(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ id }) => {
  if (!id) throw new NotFoundError();
  return await db.blog.findFirst({ where: { id } });
});
