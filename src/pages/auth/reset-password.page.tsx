import { Vertical } from "@/core/components/MantineLayout";
import { ResetPasswordInput, resetPasswordType } from "@/features/auth/schemas";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, PasswordInput, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import resetPassword from "src/features/auth/mutations/resetPassword";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [$resetPasswordMutation, { isLoading, isSuccess }] =
    useMutation(resetPassword);

  const form = useForm<resetPasswordType>({
    initialValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: zodResolver(ResetPasswordInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values) => {
    await $resetPasswordMutation({ ...values, token });
    return null;
  };

  return (
    <Layout title="Reset Your Password">
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Vertical w={rem(300)}>
            <PasswordInput
              withAsterisk
              label="Password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              label="Confirm Password"
              {...form.getInputProps("passwordConfirmation")}
            />

            <Button
              loading={isLoading}
              disabled={!form.isValid()}
              type="submit"
            >
              Submit
            </Button>
          </Vertical>
        </form>
      )}
    </Layout>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";

export default ResetPasswordPage;
