import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import Layout from "@/core/layouts/Layout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import useResponsive from "@/utils/useResponsive";
import { BlitzPage } from "@blitzjs/next";
import { Tabs, rem } from "@mantine/core";
import { IconTruckDelivery, IconTruckLoading } from "@tabler/icons-react";
import { AssignOrders } from "./components/AssignOrders";
import { UserOrders } from "./components/UserOrders";

const OrderPage: BlitzPage = () => {
  const currentUser = useCurrentUser();

  const iconStyle = { width: rem(20), height: rem(20) };
  const { isMobile } = useResponsive();

  const isLivreur = currentUser?.role === "LIVREUR";
  return (
    <Layout title="Order">
      {currentUser && (
        <Tabs defaultValue="gallery" orientation={!isMobile ? "vertical" : "horizontal"}>
          {isLivreur && (
            <Tabs.List>
              <Tabs.Tab value="gallery" leftSection={<IconTruckLoading style={iconStyle} />}>
                Commandes
              </Tabs.Tab>
              <Tabs.Tab value="messages" leftSection={<IconTruckDelivery style={iconStyle} />}>
                Livraison en cours
              </Tabs.Tab>
            </Tabs.List>
          )}

          <Tabs.Panel pl={"xs"} value="gallery">
            <UserOrders />
          </Tabs.Panel>
          {isLivreur && (
            <Tabs.Panel pl={"xs"} value="messages">
              <AssignOrders />
            </Tabs.Panel>
          )}

          <Tabs.Panel pl={"xs"} value="settings">
            manage Settings
          </Tabs.Panel>
        </Tabs>
      )}

      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

export default OrderPage;
