import setUserSettings from "@/features/users/mutations/setUserSettings";
import { useMutation } from "@blitzjs/rpc";
import { Checkbox } from "@mantine/core";

const ToggleUserSettings = ({ settingKey, value, label }: { settingKey: string; value: boolean; label: string }) => {
  const [$setUserSettings] = useMutation(setUserSettings);

  return (
    <Checkbox
      onClick={async () =>
        await $setUserSettings({
          key: settingKey,
          value,
        })
      }
      label={label}
      defaultChecked={value}
    />
  );
};

export default ToggleUserSettings;
