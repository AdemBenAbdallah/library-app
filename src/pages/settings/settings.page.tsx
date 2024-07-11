import Layout from "@/core/layouts/Layout";
import useResponsive from "@/utils/useResponsive";
import { BlitzPage } from "@blitzjs/next";
import { Tabs, rem } from "@mantine/core";
import { IconUserCog } from "@tabler/icons-react";
import { ChangePassword } from "./components/ChangePassword";
import UserEmailSettings from "./components/UserEmailSettings";

const SettingsPage: BlitzPage = () => {
  const iconStyle = { width: rem(20), height: rem(20) };
  const { isMobile } = useResponsive();

  return (
    <Layout title="Settings">
      <Tabs defaultValue="gallery" orientation={!isMobile ? "vertical" : "horizontal"}>
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<IconUserCog style={iconStyle} />}>
            Account
          </Tabs.Tab>
          {/* <Tabs.Tab value="messages" leftSection={<IconMail style={iconStyle} />}>
            Email
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
            Settings
          </Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel pl={"xs"} value="gallery">
          <ChangePassword />
        </Tabs.Panel>

        <Tabs.Panel pl={"xs"} value="messages">
          <UserEmailSettings />
        </Tabs.Panel>

        <Tabs.Panel pl={"xs"} value="settings">
          manage Settings
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;
