import { GenderType } from "@prisma/client";
import { PromiseReturnType } from "blitz";
import { date, z } from "zod";
import getCurrentUser from "../users/queries/getCurrentUser";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim());

export const InputLogin = z.object({
  email,
  password: z.string(),
});

export type LoginFormType = z.infer<typeof InputLogin>;

export const InputSginUp = z.object({
  email,
  password,
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  terms: z.boolean().refine((val) => val === true),
  birthdayDate: date(),
  gender: z.nativeEnum(GenderType),
});

export type SignupFormType = z.infer<typeof InputSginUp>;
export type SignupFormWtithoutTermsType = Omit<SignupFormType, "terms">;

export const ForgotPassword = z.object({
  email,
});

export const ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const ChangePasswordInput = z
  .object({
    currentPassword: z.string(),
    newPassword: password,
    newConfirmPassword: password,
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export type UserType = PromiseReturnType<typeof getCurrentUser>;
export type ChangePasswordInputType = z.infer<typeof ChangePasswordInput>;
export type forgotPasswordInput = z.infer<typeof ForgotPassword>;
export type resetPasswordType = z.infer<typeof ResetPasswordInput>;
