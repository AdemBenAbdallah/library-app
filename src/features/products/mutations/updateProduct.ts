import { resolver } from "@blitzjs/rpc";
import db from "db";
import { InputUpdateProduct } from "../schema";

export default resolver.pipe(resolver.zod(InputUpdateProduct), async ({ id, ...data }) => {
  const blog = await db.product.update({
    where: { id },
    data,
  });
  return blog;
});
