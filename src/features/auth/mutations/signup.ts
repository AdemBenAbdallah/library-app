import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import React from "react";
import { Role } from "types";
import EmailTemplateWelcome from "~/email/react-email/emails/welcome";
import sendEmail from "~/email/sendEmail";
import { InputSginUp } from "../schemas";

export default resolver.pipe(
  resolver.zod(InputSginUp),
  async ({ name, email, password, gender, birthdayDate }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim());
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        hashedPassword,
        gender,
        birthdayDate,
        role: "USER",
        onboarded: false,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    await sendEmail({
      to: user.email,
      subject: "Welcome to hajem",
      react: React.createElement(EmailTemplateWelcome, {
        props: { name: user.name },
      }),
    });

    await ctx.session.$create({ userId: user.id, role: user.role as Role });
    return user;
  },
);
