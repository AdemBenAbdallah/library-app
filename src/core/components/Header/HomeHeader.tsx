import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import classes from "@/styles/module/HomeHeader.module.css";
import { Routes } from "@blitzjs/next";
import { Box, Burger, Button, Divider, Drawer, Group, Image, ScrollArea, rem, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

export function HomeHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const currentUser = useCurrentUser();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={Routes.Home()}>
            <Image style={{ borderRadius: theme.radius.md }} src="/images/logo.svg" w={50} />
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href={Routes.Home()} className={classes.link}>
              Accueil
            </Link>

            <Link href={Routes.ContactPage()} className={classes.link}>
              Contact
            </Link>
            <Link href={Routes.BlogPage()} className={classes.link}>
              Blog
            </Link>
          </Group>

          {!currentUser && (
            <Group visibleFrom="sm">
              <Button component={Link} href={Routes.BlogPage()} variant="default">
                Connexion
              </Button>
              <Button onClick={() => router.push(Routes.BlogPage({ form: "register" }))}>S'inscrire</Button>{" "}
            </Group>
          )}

          {currentUser && (
            <Button visibleFrom="sm" onClick={() => router.push(Routes.BlogPage({ form: "update" }))}>
              Mon compte
            </Button>
          )}
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="sm"
        title={<Image src="/images/logo.svg" w={50} />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href={Routes.Home()} className={classes.link}>
            Accueil
          </Link>

          <Link href={Routes.ContactPage()} className={classes.link}>
            Contact
          </Link>

          <Link href={Routes.BlogPage()} className={classes.link}>
            Blog
          </Link>

          <Divider my="sm" />
          {!currentUser && (
            <Group justify="center" grow pb="xl" px="md">
              <Box>
                <Button w={"100%"} component={Link} href={Routes.BlogPage()} variant="default">
                  Connexion
                </Button>
              </Box>
              <Box>
                <Button w={"100%"} onClick={() => router.push(Routes.BlogPage({ form: "register" }))}>
                  S'inscrire
                </Button>{" "}
              </Box>
            </Group>
          )}

          {currentUser && (
            <Group justify="center" grow pb="xl" px="md">
              <Box>
                <Button w={"100%"} onClick={() => router.push(Routes.BlogPage({ form: "update" }))}>
                  Mon compte
                </Button>
              </Box>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
