// import { render } from "@react-email/render";
import { Resend } from "resend";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KAY);

const sendEmail = async ({ to, subject, react }) => {
  const message = { from: "onboarding@resend.dev", to, subject };

  // if (isDev) {
  //   const html = render(react);
  //   return nodmailerLocalAppTransport.sendMail({ ...message, html: html });
  // }

  await resend.emails.send({
    ...message,
    react,
  });
};
export default sendEmail;
