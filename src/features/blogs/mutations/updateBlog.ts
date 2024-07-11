import { resolver } from "@blitzjs/rpc";
import db from "db";
import { InputUpdateBlog } from "../schema";

export default resolver.pipe(resolver.zod(InputUpdateBlog), async ({ id, ...data }) => {
  const blog = await db.blog.update({
    where: { id },
    data,
  });
  return blog;
});
