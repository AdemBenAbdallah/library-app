import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { Routes } from "@blitzjs/next";
import { RingProgress, Tooltip } from "@mantine/core";
import Link from "next/link";

const UserProfileProgress = () => {
  const user = useCurrentUser();
  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "avatarImageKey",
      label: "AvatarImageKey",
    },
    {
      key: "coverImageKey",
      label: "CoverImageKey",
    },
  ];

  if (!user) return;
  const existingKeys = keys.filter(({ key }) => user[key]);
  const complitionPercentage = Math.round((existingKeys.length / keys.length) * 100);

  return (
    <>
      {complitionPercentage !== 100 && (
        <Link href={Routes.EditProfilePage()}>
          <Tooltip label={`Profile progress ${complitionPercentage}%`}>
            <RingProgress
              size={25}
              thickness={4}
              roundCaps
              sections={[
                {
                  value: complitionPercentage,
                  color: "red",
                },
              ]}
            />
          </Tooltip>
        </Link>
      )}
    </>
  );
};

export default UserProfileProgress;
