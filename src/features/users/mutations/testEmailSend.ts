import { resolver } from "@blitzjs/rpc";
import React from "react";
import { z } from "zod";
import EmailTemplateWelcome from "~/email/react-email/emails/welcome";
import sendEmail from "~/email/sendEmail";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    await sendEmail({
      to: "adem123azertyuiop@gmail.com",
      subject: "Welcome to hajem",
      react: React.createElement(EmailTemplateWelcome, {
        props: { name: "adem" },
      }),
    });
  }
);
