import signupAsAdmin from "@/features/auth/mutations/signupAsAdmin";
import { InputSginUp, SignupFormWtithoutTermsType } from "@/features/auth/schemas";
import { useMutation } from "@blitzjs/rpc";
import { Button, Group, Paper, PasswordInput, Radio, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export function LivreurForm({ close }: { close: () => void }) {
  const [$signupAsAdmin, { isLoading }] = useMutation(signupAsAdmin);

  const form = useForm<SignupFormWtithoutTermsType>({
    validate: zodResolver(InputSginUp.omit({ terms: true })),
    validateInputOnBlur: true,
    validateInputOnChange: ["email", "password"],
  });

  return (
    <Stack align="center" justify="center">
      <Paper radius="md" w={"100%"}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            await $signupAsAdmin(values);
            notifications.show({
              title: "Success",
              color: "green",
              message: "Coach created!",
            });
            close();
          })}
        >
          <Stack>
            <TextInput required label="Name" placeholder="Your name" {...form.getInputProps("name")} radius="md" />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <DateInput
              required
              {...form.getInputProps("birthdayDate")}
              clearable
              label="birthday Date"
              placeholder="Date input"
              radius="md"
            />

            <Radio.Group {...form.getInputProps("gender")} label="Gender" withAsterisk>
              <Group mt="xs">
                <Radio value="MALE" label="Male" />
                <Radio value="FEMALE" label="Female" />
              </Group>
            </Radio.Group>

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button ml={"auto"} disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Create
            </Button>
          </Group>
        </form>
      </Paper>
    </Stack>
  );
}
