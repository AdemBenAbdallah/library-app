import { Horizontal, Vertical } from "@/core/components/MantineLayout";
import addSubscription from "@/features/subscriptions/mutations/addSubscription";
import { InputSubscription, InputSubscriptionType } from "@/features/subscriptions/schemas";
import { useMutation } from "@blitzjs/rpc";
import { Button, Group, NumberInput, Select, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { ReactFC } from "~/types";

const InputSubscriptionWithoutUserId = InputSubscription.omit({ userId: true });
type InnerProps = {
  userId: string;
};

const AddUserSubsctiption: ReactFC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  let closeModal = () => context.closeModal(id);
  const [$addSubscription, { isLoading }] = useMutation(addSubscription);

  const { userId } = innerProps;

  const form = useForm<InputSubscriptionType>({
    validate: zodResolver(InputSubscriptionWithoutUserId),
    validateInputOnBlur: true,
    validateInputOnChange: ["endDate", "startDate"],
  });

  const calculateEndDate = (startDate: Date, duration: string): Date | undefined => {
    const durationMap = {
      "1 Month": 1,
      "3 Months": 3,
      "6 Months": 6,
      "1 Year": 12,
    };
    const monthsToAdd = durationMap[duration];
    if (monthsToAdd) {
      return dayjs(startDate).add(monthsToAdd, "month").toDate();
    }
  };

  const handleDurationChange = (value: string) => {
    form.setFieldValue("subscriptionDuration", value);
    const startDate = form.values.startDate;
    const endDate = calculateEndDate(startDate, value);
    if (endDate) form.setFieldValue("endDate", endDate);
  };

  return (
    <Vertical fullW gap={15}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $addSubscription({
            startDate: values.startDate,
            endDate: values.endDate,
            subscriptionCost: values.subscriptionCost,
            userId,
          });
          notifications.show({
            color: "green",
            title: "Abonnement créé",
            message: "Vous avez ajouté un abonnement pour l'utilisateur avec succès.",
          });
          closeModal();
        })}
      >
        <Stack>
          <Group align="center">
            <DateInput
              required
              label="Date de début d'abonnement"
              flex={2}
              {...form.getInputProps("startDate")}
              clearable
              placeholder="July 11, 2024"
            />
            <Select
              flex={1}
              label="Durée"
              placeholder="Pick value"
              data={["1 Month", "3 Months", "6 Months", "1 Year"]}
              onChange={handleDurationChange}
            />
          </Group>
          <DateInput
            required
            {...form.getInputProps("endDate")}
            clearable
            label="Date de fin d'abonnement"
            placeholder="July 11, 2024"
          />
          <NumberInput
            required
            placeholder="120dt"
            label="Abonnement Prix"
            {...form.getInputProps("subscriptionCost")}
          />
          <Horizontal ml={"auto"}>
            <Button bg={"black"} c={"white"} onClick={closeModal}>
              Cancel
            </Button>
            <Button loading={isLoading} disabled={!form.isValid()} type="submit">
              Submit
            </Button>
          </Horizontal>
        </Stack>
      </form>
    </Vertical>
  );
};

export default AddUserSubsctiption;
