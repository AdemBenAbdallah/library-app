import getUserById from "@/features/users/queries/getUserById";
import { getAvatarFallbackName, getUploadThingUrl } from "@/utils/image-utils";
import { useSession } from "@blitzjs/auth";
import { useQuery } from "@blitzjs/rpc";
import { Avatar, Badge, Group, Stack, Text, Timeline } from "@mantine/core";
import { IconAt, IconCalendar, IconGitBranch } from "@tabler/icons-react";
import dayjs from "dayjs";

const UserDetails = ({ userId }: { userId: string | null }) => {
  if (!userId) return;
  const [user] = useQuery(getUserById, { userId });
  const session = useSession();

  return (
    <Stack gap={50}>
      {session.role === "ADMIN" && (
        <Group wrap="nowrap">
          <Avatar src={getUploadThingUrl(user?.avatarImageKey)} size={94} radius="md">
            {getAvatarFallbackName(user?.name)}
          </Avatar>
          <div>
            <Text fz="lg" fw={500}>
              {user?.name}
            </Text>

            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" />
              <Text fz="sm">{user?.email}</Text>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
              <IconCalendar stroke={1.5} size="1rem" />
              <Text fz="sm">{dayjs(user?.birthdayDate).format("YYYY-MM-DD")}</Text>
            </Group>
          </div>
        </Group>
      )}

      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {user?.subscriptions.map((subscription, idx) => (
          <Timeline.Item
            key={idx}
            bullet={<IconGitBranch size={12} />}
            title={`${dayjs(subscription.startDate).format("YYYY-MM-DD")} / ${dayjs(subscription.endDate).format("YYYY-MM-DD")}`}
          >
            <SubscriptionBadge subscription={subscription} />
            <Text size="xs" mt={4}>
              {subscription?.subscriptionCost} DT
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );
};

const SubscriptionBadge = ({ subscription }) => {
  const remainingDays = getUserLeftSubscription(subscription.startDate, subscription.endDate);
  const isSubscriptionEnded = new Date(subscription.endDate) < new Date();

  return (
    <Badge
      size="md"
      variant="gradient"
      gradient={isSubscriptionEnded ? { from: "red", to: "pink", deg: 90 } : { from: "blue", to: "green", deg: 90 }}
    >
      {remainingDays}
    </Badge>
  );
};
const getUserLeftSubscription = (startDate: Date, enDate: Date | null) => {
  const currentTime = new Date().getTime();
  const restDate = enDate ? enDate.getTime() - startDate.getTime() : currentTime - startDate.getTime();

  return `${Math.floor(restDate / (1000 * 60 * 60 * 24))} jours`;
};

export default UserDetails;
