import logout from "@/features/auth/mutations/logout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useSession } from "@blitzjs/auth";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Box, Indicator, Menu, Tooltip, rem } from "@mantine/core";
import {
  IconBrandProducthunt,
  IconHome,
  IconLogout,
  IconSettings,
  IconStretching,
  IconUserCircle,
  IconUserShield,
  IconUsers,
} from "@tabler/icons-react";
import { RouteUrlObject } from "blitz";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Conditional from "../Conditional";
import UserAvatar from "../UserAvatar";

const UserHeaderMenu = () => {
  const currentUser = useCurrentUser();
  const session = useSession();
  const [$logoutMutation] = useMutation(logout);
  const router = useRouter();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div style={{ cursor: "pointer" }}>
          <Conditional
            condition={currentUser?.role === "ADMIN"}
            wrap={(children) => (
              <Indicator
                color="none"
                position="bottom-end"
                label={
                  <Tooltip label="Admin" color="dark">
                    <Box>
                      <IconUserShield size={13} />
                    </Box>
                  </Tooltip>
                }
              >
                {children}
              </Indicator>
            )}
          >
            <UserAvatar user={currentUser} />
          </Conditional>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <MenuItemLink text="Accueil" href={Routes.Home()} Icon={IconHome} />
        <MenuItemLink text="Profil" href={Routes.Profile()} Icon={IconUserCircle} />

        {session.role === "ADMIN" && <MenuItemLink text="Utilisateurs" href={Routes.UsersPage()} Icon={IconUsers} />}
        {session.role === "ADMIN" && (
          <MenuItemLink text="Coachs" href={Routes.CoachsPage()} Icon={IconBrandProducthunt} />
        )}
        <MenuItemLink text="Products" href={Routes.ProductsPage()} Icon={IconStretching} />

        <MenuItemLink text="Paramètres" href={Routes.SettingsPage()} Icon={IconSettings} />

        <Menu.Divider />

        <Menu.Label>Zone dangereuse</Menu.Label>

        <Menu.Item
          color="red"
          onClick={async () => {
            await $logoutMutation();
            await router.push("/");
          }}
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Déconnexion
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type MenuItemLinkProps = {
  text: string;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  href: RouteUrlObject;
};

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ text, Icon, href }) => {
  return (
    <Link href={href}>
      <Menu.Item leftSection={<Icon style={{ width: rem(14), height: rem(14) }} />}>{text}</Menu.Item>
    </Link>
  );
};
export default UserHeaderMenu;
