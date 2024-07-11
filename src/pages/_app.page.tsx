import FullPageLoader from "@/core/components/FulllPageLoader";
import { globalModals } from "@/modals";
import { theme } from "@/styles/mantine-theme";
import { AppProps, ErrorBoundary } from "@blitzjs/next";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import "src/styles/globals.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <ModalsProvider modals={globalModals}>
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <Suspense fallback={<FullPageLoader />}>
            <Component {...pageProps} />
          </Suspense>
        </ErrorBoundary>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
