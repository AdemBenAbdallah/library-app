import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { ErrorBoundary, Routes } from "@blitzjs/next";
import { Anchor, AppShell, Image, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import { Suspense } from "react";
import { ReactFC } from "~/types";
import FullPageLoader from "../components/FulllPageLoader";
import UserHeaderMenu from "../components/Header/UserHeaderMenu";
import UserProfileProgress from "../components/Header/UserProfileProgress";
import { Horizontal, Vertical } from "../components/MantineLayout";
import { RootErrorFallback } from "../components/RootErrorFallback";

type Props = { title?: string };

export const dynamic = "force-dynamic";

const Layout: ReactFC<Props> = ({ title, children }) => {
  const currentUser = useCurrentUser();
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>{title || "Gym"}</title>
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <AppShell header={{ height: 60 }} padding="md" h={"100%"}>
        <AppShell.Header>
          <Horizontal fullH align="center" justify="space-between" p={"md"}>
            <Anchor component={Link} underline="never" href={Routes.Home()}>
              <Text fz={"h3"} fw={500}>
                <Image style={{ borderRadius: theme.radius.md }} src="/images/logo.svg" w={50} />
              </Text>
            </Anchor>
            <Horizontal>
              {currentUser && (
                <Horizontal gap={15} align="center">
                  <UserHeaderMenu />

                  <UserProfileProgress />

                  {currentUser.role === "ADMIN" && (
                    <Tooltip label="ADMIN">
                      <IconUserPlus />
                    </Tooltip>
                  )}
                </Horizontal>
              )}
            </Horizontal>
          </Horizontal>
        </AppShell.Header>

        <AppShell.Main h={"100%"}>
          <Vertical fullH fullW>
            <ErrorBoundary resetKeys={[currentUser]} FallbackComponent={RootErrorFallback}>
              <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
            </ErrorBoundary>
          </Vertical>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Layout;
