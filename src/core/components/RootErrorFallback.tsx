import { ErrorFallbackProps } from "@blitzjs/next";
import { AuthenticationError, AuthorizationError } from "blitz";
import { AuthenticationForm } from "./MainAuthForm";
import { Vertical } from "./MantineLayout";
import { Text, Title, rem } from "@mantine/core";

export const ErrorComponent = ({ statusCode, title }) => {
  return (
    <Vertical align="center" fullH fullW>
      <Vertical align="center" p={rem(80)}>
        <Title>{statusCode} ❌</Title>
        <Text>{title} 😔</Text>
      </Vertical>
    </Vertical>
  );
};

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}
