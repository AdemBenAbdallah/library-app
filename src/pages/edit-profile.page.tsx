import Layout from "@/core/layouts/Layout";
import EditProfileForm from "@/features/users/form/EditProfileForm";
import updateUser from "@/features/users/mutations/updateUser";
import getUserForProfile from "@/features/users/queries/getUserForProfile";
import { InputUpdateUser, InputUpdateUserType } from "@/features/users/schemas";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Stack, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

const EditProfilePage: BlitzPage = () => {
  const [user] = useQuery(getUserForProfile, {});
  const [$updateUser, { isLoading }] = useMutation(updateUser, {});

  const router = useRouter();
  const form = useForm<InputUpdateUserType>({
    initialValues: {
      name: user?.name || "",
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || "",
    },
    validate: zodResolver(InputUpdateUser),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: InputUpdateUserType) => {
    await $updateUser(values);
    showNotification({
      color: "green",
      title: "Updated",
      message: "profile info updated successfully",
    });
    router.push(Routes.Profile());
    close();
  };

  return (
    <Layout>
      <Stack w={{ base: "100%", md: rem(500) }} mx="auto">
        <EditProfileForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </Stack>
    </Layout>
  );
};

export default EditProfilePage;
