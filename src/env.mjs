import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    RESEND_API_KAY: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },

  client: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KAY: process.env.RESEND_API_KAY,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
});
