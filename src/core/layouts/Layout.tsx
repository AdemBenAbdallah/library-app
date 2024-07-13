import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { ErrorBoundary } from "@blitzjs/next";
import { AppShell, Stack } from "@mantine/core";
import Head from "next/head";
import { Suspense } from "react";
import { ReactFC } from "~/types";
import FullPageLoader from "../components/FulllPageLoader";
import { Header } from "../components/Header";
import { RootErrorFallback } from "../components/RootErrorFallback";

type Props = { title?: string };

export const dynamic = "force-dynamic";

const Layout: ReactFC<Props> = ({ title, children }) => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Head>
        <title>{"ketabi | " + title || "Ketabi"}</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <AppShell header={{ height: 60 }} padding="md" h={"100%"}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main h={"100%"}>
          <Stack h={"100%"}>
            <ErrorBoundary resetKeys={[currentUser]} FallbackComponent={RootErrorFallback}>
              <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
            </ErrorBoundary>
          </Stack>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Layout;
