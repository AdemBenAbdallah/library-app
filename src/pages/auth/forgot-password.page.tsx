import { Vertical } from "@/core/components/MantineLayout";
import forgotPassword from "@/features/auth/mutations/forgotPassword";
import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import Layout from "src/core/layouts/Layout";

const ForgotPasswordPage: BlitzPage = () => {
  const [$forgotPasswordMutation, { isLoading, isSuccess }] =
    useMutation(forgotPassword);

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async (values) => {
    await $forgotPasswordMutation(values);
  };

  return (
    <Layout title="Forgot Your Password?">
      <h1>Forgot your password?</h1>
      {isSuccess && (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to
            reset your password shortly.
          </p>
        </div>
      )}
      {!isSuccess && (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Vertical w={rem(300)}>
            <TextInput
              w={"100%"}
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
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

export default ForgotPasswordPage;
