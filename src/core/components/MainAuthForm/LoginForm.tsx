import login from "@/features/auth/mutations/login";
import { InputLogin, LoginFormType } from "@/features/auth/schemas";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Anchor, Button, Divider, Flex, Paper, PasswordInput, Stack, Text, TextInput, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { Vertical } from "../MantineLayout";

export function LoginForm(props: { toggle: () => void }) {
  const [$login, { isLoading }] = useMutation(login);

  const form = useForm<LoginFormType>({
    initialValues: { email: "", password: "" },
    validate: zodResolver(InputLogin),
    validateInputOnBlur: true,
    validateInputOnChange: ["email", "password"],
  });

  return (
    <Vertical align="center" justify="center">
      <Paper radius="md" p={{ base: "lg", md: "xl" }} maw={400} withBorder>
        <Text size="lg" fw={500} fz={{ base: rem(14), md: rem(19) }}>
          Bienvenue sur l'application Ketabi{" "}
        </Text>

        <Divider label="Connectez-vous avec votre email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            await $login(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <Vertical gap={"xs"}>
              <PasswordInput
                required
                label="Mot de passe"
                placeholder="Votre mot de passe"
                {...form.getInputProps("password")}
                radius="md"
              />
              <Text
                fz={"xs"}
                c={"dimed"}
                style={{ alignSelf: "flex-end" }}
                component={Link}
                href={Routes.ForgotPasswordPage()}
              >
                Mot de passe oublié ?
              </Text>
            </Vertical>
          </Stack>

          <Flex justify="space-between" mt="xl" gap={10}>
            <Anchor
              style={{ textAlign: "start" }}
              component="button"
              type="button"
              c="gray.7"
              size="xs"
              onClick={props.toggle}
            >
              Vous n'avez pas de compte ? Inscrivez-vous
            </Anchor>
            <Button size="sm" disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Connexion
            </Button>
          </Flex>
        </form>
      </Paper>
    </Vertical>
  );
}
