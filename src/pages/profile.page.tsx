import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import { UserCardImage } from "@/core/components/UserCardImage";
import UserDetails from "@/core/components/UserDetails";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { BlitzPage } from "@blitzjs/next";
import { Stack } from "@mantine/core";
import Layout from "src/core/layouts/Layout";

const Profile: BlitzPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Layout title="Profile">
      {currentUser && (
        <Stack w={{ base: "100%", md: "40%" }} mx={"auto"}>
          <UserCardImage user={currentUser} />
          <UserDetails userId={currentUser?.id} />
        </Stack>
      )}

      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

export default Profile;
