import { UserType } from "@/features/auth/schemas";
import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const Input = z.object({
  username: z.string().optional(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ username }, { session: { userId } }) => {
    let user: UserType = null;

    if (!username) user = await db.user.findUnique({ where: { id: userId } });

    if (username) user = await db.user.findUnique({ where: { username } });

    if (!user) throw new NotFoundError();
    return user;
  },
);
