import { InputLogin } from "@/features/auth/schemas";
import { SecurePassword } from "@blitzjs/auth/secure-password";
import db from "db";

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const { email, password } = InputLogin.parse({
    email: rawEmail,
    password: rawPassword,
  });
  const user = await db.user.findFirst({ where: { email } });
  if (!user) throw new Error("Email ou mot de passe incorrect");

  const result = await SecurePassword.verify(user.hashedPassword, password);

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password);
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword: improvedHash },
    });
  }

  const { hashedPassword, ...rest } = user;
  return rest;
};
