import logout from "@/features/auth/mutations/logout";
import classes from "@/styles/module/Navbar.module.css";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Group, Image, useMantineTheme } from "@mantine/core";
import { IconBook2, IconGauge, IconLogout, IconMenuOrder, IconTruckDelivery, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const data = [
  { link: Routes.DashboardPage(), value: "Dashboard", label: "Dashboard", icon: IconGauge },
  { link: Routes.AdminProducts(), value: "Products", label: "Books", icon: IconBook2 },
  { link: Routes.UsersPage(), value: "Users", label: "Users", icon: IconUsers },
  { link: Routes.AdminOrders(), value: "Orders", label: "Orders", icon: IconMenuOrder },
  { link: Routes.LivreursPage(), value: "Livreurs", label: "Livreur", icon: IconTruckDelivery },
];

export function Navbar() {
  const theme = useMantineTheme();
  const router = useRouter();
  const [$logoutMutation] = useMutation(logout);
  const active = router.pathname.split("/")[2]
    ? `${router.pathname.split("/")[2]?.[0]?.toUpperCase()}${router.pathname.split("/")[2]?.slice(1)}`
    : "Dashboard";

  const links = data.map((item) => (
    <Link className={classes.link} data-active={item.value === active || undefined} href={item.link} key={item.label}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Image
            onClick={() => router.push("/")}
            style={{ cursor: "pointer", borderRadius: theme.radius.md }}
            src="/images/logo.png"
            w={100}
            h={50}
          />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          className={classes.link}
          onClick={async (event) => {
            event.preventDefault();
            await $logoutMutation();
            await router.push("/");
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
