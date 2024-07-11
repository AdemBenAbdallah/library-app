import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { useMutation } from "@blitzjs/rpc";
import markeUserOnboarded from "@/features/users/mutations/markeUserOnboarded";

const OnboardingWizard = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [$markeUserOnboarded, { isLoading }] = useMutation(markeUserOnboarded);

  const isOnFinalStep = active === 3;
  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          loading={isLoading}
          onClick={async () => {
            if (isOnFinalStep) await $markeUserOnboarded({});
            if (!isOnFinalStep) nextStep();
          }}
        >
          {isOnFinalStep ? "Finish" : "Next step"}
        </Button>
      </Group>
    </>
  );
};

export default OnboardingWizard;
