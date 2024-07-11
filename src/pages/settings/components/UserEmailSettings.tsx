import { Vertical } from "@/core/components/MantineLayout";
import ToggleUserSettings from "@/core/components/ToogleUserSettings";
import getUserEmailSettings from "@/features/users/queries/getUserEmailSettings";
import { useQuery } from "@blitzjs/rpc";

const UserEmailSettings = () => {
  const [settings] = useQuery(getUserEmailSettings, {});

  return (
    <Vertical>
      <ToggleUserSettings
        settingKey="settingsEmailMarketing"
        value={settings?.settingsEmailMarketing || false}
        label="Marketing emails"
      />
      <ToggleUserSettings
        settingKey="settingsEmailProduct"
        value={settings?.settingsEmailProduct || false}
        label="MarketiProductng emails"
      />
    </Vertical>
  );
};

export default UserEmailSettings;
