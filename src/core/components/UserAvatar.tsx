import { UserType } from "@/features/auth/schemas";
import { getUploadThingUrl } from "@/utils/image-utils";
import { Avatar, AvatarProps } from "@mantine/core";

type Props = Partial<AvatarProps> & {
  user: UserType;
};
const UserAvatar = ({ user, ...res }: Props) => {
  return (
    <Avatar
      src={getUploadThingUrl(user?.avatarImageKey)}
      key={user?.name}
      name={user?.name || ""}
      color="initials"
      {...res}
    />
  );
};

export default UserAvatar;
