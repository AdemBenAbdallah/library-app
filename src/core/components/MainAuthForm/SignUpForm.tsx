import signup from "@/features/auth/mutations/signup";
import { InputSginUp, SignupFormType } from "@/features/auth/schemas";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Radio,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import dayjs from "dayjs";
import { Vertical } from "../MantineLayout";

export const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key);
  return {
    checked: form.values[key],
    ...inputProps,
  };
};

export function SignUpForm(props: { toggle: () => void }) {
  const [$signup, { isLoading }] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate: zodResolver(InputSginUp),
    validateInputOnBlur: true,
    validateInputOnChange: ["email", "password", "terms"],
  });

  return (
    <Vertical fullW fullH align="center" justify="center">
      <Paper radius="md" p={{ base: "lg", md: "xl" }} withBorder>
        <Text size="lg" fw={500} fz={{ base: rem(14), md: rem(19) }}>
          Bienvenue sur l'application Ketabi
        </Text>

        <Divider label="Inscrivez-vous avec votre email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(async (values) => await $signup(values))}>
          <Stack>
            <TextInput required label="Nom" placeholder="Votre nom" {...form.getInputProps("name")} radius="md" />

            <TextInput
              required
              label="Email"
              placeholder="bonjour@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <DateInput
              required
              {...form.getInputProps("birthdayDate")}
              clearable
              defaultDate={dayjs().subtract(18, "year").toDate()}
              label="Date de naissance"
              placeholder="Entrée de la date"
              radius="md"
            />

            <TextInput
              required
              {...form.getInputProps("address")}
              label="Adresse"
              placeholder="Entrée de l'adresse"
              radius="md"
            />

            <TextInput
              required
              {...form.getInputProps("phoneNumber")}
              label="Telephone"
              placeholder="Entrée du telephone"
              radius="md"
            />

            <Radio.Group {...form.getInputProps("gender")} label="Genre" withAsterisk>
              <Group mt="xs">
                <Radio value="MALE" label="Homme" />
                <Radio value="FEMALE" label="Femme" />
              </Group>
            </Radio.Group>

            <PasswordInput
              required
              label="Mot de passe"
              placeholder="Votre mot de passe"
              {...form.getInputProps("password")}
              radius="md"
            />

            <Checkbox label="J'accepte les termes et conditions" {...bindCheckboxToForm(form, "terms")} />
          </Stack>

          <Flex justify="space-between" mt="xl" gap={10}>
            <Anchor
              style={{ textAlign: "start" }}
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={props.toggle}
            >
              Vous avez déjà un compte ? Connectez-vous
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              S'inscrire{" "}
            </Button>
          </Flex>
        </form>
      </Paper>
    </Vertical>
  );
}
