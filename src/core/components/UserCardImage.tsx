import { UserType } from "@/features/auth/schemas";
import { getUploadThingUrl } from "@/utils/image-utils";
import { Routes } from "@blitzjs/next";
import { Avatar, Button, Card, Text } from "@mantine/core";
import Link from "next/link";

export function UserCardImage({ user }: { user: UserType }) {
  return (
    <Card withBorder padding="xl" radius="md">
      <Card.Section
        h={140}
        style={{
          backgroundImage: `url(${getUploadThingUrl(user?.coverImageKey)})`,
        }}
      />
      <Avatar
        src={getUploadThingUrl(user?.avatarImageKey)}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        style={{ border: "5px solid white" }}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.email}
      </Text>

      <Button
        component={Link}
        href={Routes.EditProfilePage()}
        w={"100%"}
        radius="md"
        mt="xl"
        size="md"
        variant="default"
      >
        Edit Profile
      </Button>
    </Card>
  );
}
