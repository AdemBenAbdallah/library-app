import { resolver } from "@blitzjs/rpc";
import db from "db";
import { InputAddBlog } from "../schema";

export default resolver.pipe(
  resolver.zod(InputAddBlog),
  resolver.authorize(),
  async ({ title, content, category, blogImageKey }, { session: { userId } }) => {
    return await db.blog.create({
      data: {
        title,
        content,
        category,
        blogImageKey,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },
);
