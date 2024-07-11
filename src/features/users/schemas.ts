import { z } from "zod";

export const InputUpdateUser = z.object({
  name: z.string().min(3).optional(),
  username: z.string().min(4).optional(),
  bio: z.string().optional(),
  avatarImageKey: z.string().optional(),
  coverImageKey: z.string().optional(),
});

export type InputUpdateUserType = z.infer<typeof InputUpdateUser>;
