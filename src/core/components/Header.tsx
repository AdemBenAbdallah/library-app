import logout from "@/features/auth/mutations/logout";
import getCartTotalQuatity from "@/features/carts/queries/getCartTotalQuatity";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import classes from "@/styles/module/Header.module.css";
import { useSession } from "@blitzjs/auth";
import { Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Image,
  Indicator,
  ScrollArea,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconShoppingCart, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const currentUser = useCurrentUser();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={Routes.Home()}>
            <Image style={{ borderRadius: theme.radius.md }} src="/images/logo.png" w={90} h={30} />
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href={Routes.Home()} className={classes.link}>
              Accueil
            </Link>
            <Link href={Routes.ProductsPage()} className={classes.link}>
              Products
            </Link>
            <Link href={Routes.CartPage()} className={classes.link}>
              Cart
            </Link>
            <Link href={Routes.OrderPage()} className={classes.link}>
              Order
            </Link>
          </Group>

          <Group>
            {!currentUser && (
              <Group visibleFrom="sm">
                <Button component={Link} href={Routes.CartPage()} variant="default">
                  Connexion
                </Button>
                <Button onClick={() => router.push(Routes.CartPage({ form: "register" }))}>S'inscrire</Button>{" "}
              </Group>
            )}

            {currentUser && <CurrentUserExist router={router} />}
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="sm"
        title={<Image src="/images/logo.png" w={80} h={30} />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href={Routes.Home()} className={classes.link}>
            Accueil
          </Link>

          <Link href={Routes.ProductsPage()} className={classes.link}>
            Products
          </Link>

          <Divider my="sm" />
          {!currentUser && (
            <Group justify="center" grow pb="xl" px="md">
              <Box>
                <Button w={"100%"} variant="default">
                  Connexion
                </Button>
              </Box>
              <Box>
                <Button w={"100%"}>S'inscrire</Button>{" "}
              </Box>
            </Group>
          )}

          {currentUser && (
            <Group justify="center" grow pb="xl" px="md">
              <Box>
                <Button w={"100%"}>Mon compte</Button>
              </Box>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

const CurrentUserExist = ({ router }: { router: NextRouter }) => {
  const [totalQuantity] = useQuery(getCartTotalQuatity, {}, { refetchOnWindowFocus: false });
  const [$logoutMutation] = useMutation(logout);
  const session = useSession();

  return (
    <Group>
      <Link href={Routes.CartPage()} style={{ cursor: "pointer" }}>
        <Indicator
          fw={500}
          label={totalQuantity}
          inline
          size={20}
          offset={7}
          position="bottom-end"
          color="black"
          withBorder
        >
          <IconShoppingCart size={30} />
        </Indicator>
      </Link>
      {session.role === "ADMIN" && (
        <Tooltip label="ADMIN" style={{ cursor: "pointer" }} onClick={() => router.push(Routes.DashboardPage())}>
          <IconUserPlus />
        </Tooltip>
      )}

      <Button
        visibleFrom="sm"
        variant="default"
        leftSection={<IconLogout size={20} />}
        onClick={async () => {
          await $logoutMutation();
          await router.push("/");
        }}
      >
        {" "}
        Se deconnecter
      </Button>
    </Group>
  );
};
