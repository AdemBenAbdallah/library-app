import { NotFoundError, AuthenticationError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import { SecurePassword } from "@blitzjs/auth/secure-password";
import db from "db";
import { ChangePasswordInput } from "../schemas";
import { authenticateUser } from "@/utils/auth-utils";

export default resolver.pipe(
  resolver.zod(ChangePasswordInput),
  resolver.authorize(),
  async ({ currentPassword, newPassword, newConfirmPassword }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } });
    if (!user) throw new NotFoundError();

    if (newPassword !== newConfirmPassword)
      throw new Error("Password not match");

    try {
      await authenticateUser(user.email, currentPassword);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password");
      }
      throw error;
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim());
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    });

    return true;
  }
);
