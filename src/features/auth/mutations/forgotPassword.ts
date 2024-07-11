import { regenrateToken } from "@/blitz-utils";
import { URL_ORIGIN } from "@/config";
import { resolver } from "@blitzjs/rpc";
import db, { TokenType } from "db";
import React from "react";
import ResetPasswordEamil from "~/email/react-email/emails/ResetPasswordEamil";
import sendEmail from "~/email/sendEmail";
import { ForgotPassword } from "../schemas";

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;

export default resolver.pipe(
  resolver.zod(ForgotPassword),
  async ({ email }) => {
    const user = await db.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      await new Promise((resolver) => setTimeout(resolver, 750));
      return;
    }

    const token = await regenrateToken({
      tokenType: TokenType.RESET_PASSWORD,
      userId: user.id,
      userEmail: user.email,
    });

    const ResetPasswordLink = `${URL_ORIGIN}/auth/reset-password?token=${token}`;
    console.log("Reset Pass Url", ResetPasswordLink);

    await sendEmail({
      to: user.email,
      subject: "Welcome to hajem",
      react: React.createElement(ResetPasswordEamil, {
        props: { ResetPasswordLink },
      }),
    }).catch((err) => {
      throw new Error(err);
    });
  },
);
