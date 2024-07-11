import { Vertical } from "@/core/components/MantineLayout";
import changePassword from "@/features/auth/mutations/changePassword";
import {
  ChangePasswordInput,
  ChangePasswordInputType,
} from "@/features/auth/schemas";
import { useMutation } from "@blitzjs/rpc";
import { Button, Card, PasswordInput, Text, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

export const ChangePassword = () => {
  const [$ChangePassword, { isSuccess, isLoading }] =
    useMutation(changePassword);

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newConfirmPassword: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordInput),
  });

  const handleSubmit = async (values: ChangePasswordInputType) => {
    await $ChangePassword(values);
  };

  return (
    <Card w={{ base: "100%", md: 500 }}>
      {isSuccess && (
        <Text>Your current password has been successfully updated! 🎉</Text>
      )}
      {!isSuccess && (
        <Vertical>
          <Title fz={{ base: 24, md: 28 }}>Change Password</Title>
          <Vertical>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Vertical>
                <PasswordInput
                  required
                  label="Current password"
                  placeholder="Current password"
                  {...form.getInputProps("currentPassword")}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="New Password"
                  placeholder="New Password"
                  {...form.getInputProps("newPassword")}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="New confirm password"
                  placeholder="New confirm password"
                  {...form.getInputProps("newConfirmPassword")}
                  radius="md"
                />

                <Button type="submit" loading={isLoading} ml={"auto"}>
                  Submit
                </Button>
              </Vertical>
            </form>
          </Vertical>
        </Vertical>
      )}
    </Card>
  );
};
