import { Vertical } from "@/core/components/MantineLayout";
import Layout from "@/core/layouts/Layout";
import requestVerificationEmail from "@/features/auth/mutations/requestVerificationEmail";
import EditProfileForm from "@/features/users/form/EditProfileForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import updateUser from "@/features/users/mutations/updateUser";
import getUserForProfile from "@/features/users/queries/getUserForProfile";
import { InputUpdateUserType } from "@/features/users/schemas";
import { getUploadThingUrl } from "@/utils/image-utils";
import { useStringParam } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/auth";
import { Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Alert, Button, Image, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications, showNotification } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";

const ProfilePage: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const currentUser = useCurrentUser();
  const username = useStringParam("username");
  const [user] = useQuery(getUserForProfile, { username });
  const [$updateUser, { isLoading }] = useMutation(updateUser, {});
  const [$requestVerificationEmail, { isLoading: loading }] = useMutation(requestVerificationEmail);

  const router = useRouter();
  const form = useForm<InputUpdateUserType>({
    initialValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || "",
    },
  });

  const onSubmit = async (values: InputUpdateUserType) => {
    await $updateUser(values);
    const { username } = values;
    if (user.username !== username) {
      if (!username) return;
      await router.push(Routes.ProfilePage({ username }));
    }
    showNotification({
      color: "green",
      title: "Updated",
      message: "profile info updated successfully",
    });
    close();
  };

  const isOwner = currentUser?.id === user.id;
  return (
    <Layout>
      ProfilePage
      <Vertical>
        {isOwner && !currentUser.emailVerification && (
          <Alert icon={<IconAlertCircle size={"1rem"} />} variant="outline" title="Warning!" color="red" maw={"30rem"}>
            <Vertical>
              <Text fz={14}>
                Your email has not been verified yet. Verifying your email ensures account security and enables access
                to all features. Please verify your email to fully experience our platform.
              </Text>
              <Button
                onClick={async () => {
                  await $requestVerificationEmail({});
                  notifications.show({
                    color: "green",
                    title: "Email sended",
                    message: "Go to your Email",
                  });
                }}
                w={"fit-content"}
                size="xs"
                color="red"
                variant="light"
                loading={loading}
              >
                Resend Email
              </Button>
            </Vertical>
          </Alert>
        )}
        {isOwner && (
          <Button onClick={open} w={"fit-content"}>
            Edit Profile
          </Button>
        )}
        <Text>{user.username}</Text>
        <Text>{user.name}</Text>
        <Text>{user.bio}</Text>
        {user?.coverImageKey && <Image w={300} src={getUploadThingUrl(user.coverImageKey)} alt="cover picture" />}
      </Vertical>
      <Modal opened={opened} onClose={close} title="Authentication">
        <EditProfileForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
