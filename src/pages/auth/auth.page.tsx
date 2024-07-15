import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useStringQueryPram } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";

const AuthPage: BlitzPage = () => {
  const currentUser = useCurrentUser();
  const path = useStringQueryPram("path");
  const formType = useStringQueryPram("form") || "login";
  const router = useRouter();
  const directPath = Array.isArray(path) ? path[0] : path;

  if (currentUser) router.push(directPath || "/");
  return (
    <Stack h={"100%"}>
      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm initialFormType={Array.isArray(formType) ? formType[0] : formType} />
        </Vertical>
      )}
    </Stack>
  );
};

export default AuthPage;
