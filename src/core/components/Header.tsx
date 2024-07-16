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
import router, { useRouter } from "next/router";

const NavLink = ({ href, children }) => (
  <Link href={href} className={classes.link}>
    {children}
  </Link>
);

const UserButtons = ({ currentUser, router }) => {
  if (!currentUser) {
    return (
      <Group visibleFrom="sm">
        <Button component={Link} href={Routes.CartPage()} variant="default">
          Connexion
        </Button>
        <Button onClick={() => router.push(Routes.CartPage({ form: "register" }))}>S'inscrire</Button>
      </Group>
    );
  }
  return <CurrentUserExist router={router} />;
};

const DrawerContent = ({ currentUser }) => {
  const [$logoutMutation] = useMutation(logout);

  return (
    <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
      <Divider my="sm" />
      <NavLink href={Routes.Home()}>Accueil</NavLink>
      <NavLink href={Routes.ProductsPage()}>Products</NavLink>
      <NavLink href={Routes.CartPage()}>Cart</NavLink>
      <NavLink href={Routes.OrderPage()}>Order</NavLink>
      <Divider my="sm" />
      {!currentUser ? (
        <Group justify="center" grow pb="xl" px="md">
          <Button component={Link} href={Routes.AuthPage({ path: "/products/products" })} fullWidth variant="default">
            Connexion
          </Button>
          <Button component={Link} href={Routes.AuthPage({ path: "/products/products", form: "register" })} fullWidth>
            S'inscrire
          </Button>
        </Group>
      ) : (
        <Group pr={20}>
          <Button
            ml="auto"
            display="block"
            leftSection={<IconLogout size={20} />}
            onClick={async () => {
              await $logoutMutation();
              await router.push("/");
            }}
          >
            Se déconnecter
          </Button>
        </Group>
      )}
    </ScrollArea>
  );
};

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
            <NavLink href={Routes.Home()}>Accueil</NavLink>
            <NavLink href={Routes.ProductsPage()}>Livres</NavLink>
            <NavLink href={Routes.CartPage()}>Panier</NavLink>
            <NavLink href={Routes.OrderPage()}>Commande</NavLink>
          </Group>
          <Group>
            <UserButtons currentUser={currentUser} router={router} />
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
        <DrawerContent currentUser={currentUser} />
      </Drawer>
    </Box>
  );
}

const CurrentUserExist = ({ router }) => {
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
        Se déconnecter
      </Button>
    </Group>
  );
};
