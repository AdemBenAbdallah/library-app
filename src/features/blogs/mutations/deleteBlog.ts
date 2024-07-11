import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  id: z.string().uuid(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ id }) => {
  const blog = await db.blog.delete({ where: { id: id } });
});
