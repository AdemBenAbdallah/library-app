import { resolver } from "@blitzjs/rpc";
import db from "db";
import { InputUpdateUser } from "../schemas";

export default resolver.pipe(
  resolver.zod(InputUpdateUser),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    if (!input.name && !input.username && !input.bio) return;
    return await db.user.update({ where: { id: userId }, data: input });
  }
);
