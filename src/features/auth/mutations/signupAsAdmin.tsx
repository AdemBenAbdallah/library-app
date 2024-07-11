import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import React from "react";
import EmailTemplateWelcome from "~/email/react-email/emails/welcome";
import sendEmail from "~/email/sendEmail";
import { InputSginUp } from "../schemas";

export default resolver.pipe(
  resolver.zod(InputSginUp.omit({ terms: true })),
  resolver.authorize("ADMIN"),
  async ({ name, email, password, gender, birthdayDate }) => {
    const hashedPassword = await SecurePassword.hash(password.trim());

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        hashedPassword,
        gender,
        birthdayDate,
        role: "COACH",
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
  },
);
