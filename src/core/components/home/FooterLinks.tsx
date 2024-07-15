import classes from "@/styles/module/FooterLinks.module.css";
import { Routes } from "@blitzjs/next";
import { ActionIcon, Container, Group, Image, Text, rem, useMantineTheme } from "@mantine/core";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import Link from "next/link";

const data = [
  {
    title: "About",
    links: [
      { label: "Contact", link: Routes.ContactPage() },
      { label: "Products", link: Routes.ProductsPage() },
      { label: "Support", link: Routes.ContactPage() },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Facebook", link: "#" },
      { label: "Follow on Instagram", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
    ],
  },
];

export function FooterLinks() {
  const theme = useMantineTheme();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image style={{ borderRadius: theme.radius.md }} src="/images/logo.png" w={50} />

          <Text size="xs" c="dimmed" className={classes.description}>
            Développez rapidement un corps musclé et performant avec notre programme d'entraînement intensif.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} gym.com. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
