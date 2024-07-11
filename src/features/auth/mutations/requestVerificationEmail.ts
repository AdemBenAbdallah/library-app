import { getEmailVerifyLink } from "@/blitz-utils";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import React from "react";
import { z } from "zod";
import EmailTemplateVerifyEmail from "~/email/react-email/emails/EmailTemplateVerifyEmail";
import sendEmail from "~/email/sendEmail";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findFirst({ where: { id: userId } });

    if (!user) throw new Error("User not Found");

    const EmailVerifyLink = await getEmailVerifyLink({
      userId,
      userEmail: user?.email,
    }).catch((err) => {
      throw new Error(err);
    });

    await sendEmail({
      to: user.email,
      subject: "Welcome to hajem",
      react: React.createElement(EmailTemplateVerifyEmail, {
        props: { EmailVerifyLink },
      }),
    }).catch((err) => {
      throw new Error(err);
    });
  },
);
