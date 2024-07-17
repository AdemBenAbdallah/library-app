import { authenticateUser } from "@/utils/auth-utils";
import { resolver } from "@blitzjs/rpc";
import { RoleType } from "@prisma/client";
import { InputLogin } from "../schemas";

export default resolver.pipe(resolver.zod(InputLogin), async ({ email, password }, ctx) => {
  const user = await authenticateUser(email, password);
  await ctx.session.$create({ userId: user.id, role: user.role as RoleType });

  return user;
});
