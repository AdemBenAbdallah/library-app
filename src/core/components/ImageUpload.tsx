import { getUploadThingUrl } from "@/utils/image-utils";
import { ActionIcon, Center, FileInput, Image, Indicator, Loader, Text, Tooltip } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconImageInPicture, IconPhoto, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Horizontal, Vertical } from "./MantineLayout";
import { useUploadThing } from "./Uploadthing";

type Props = {
  form: UseFormReturnType<any>;
  label: string;
  name: string;
};

const ImagesUpload = ({ form, label, name }: Props) => {
  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setLoading(false);
      const fileKey = res?.[0]?.key;
      notifications.show({
        color: "green",
        title: "Succes",
        message: "File uploaded!",
      });
      form.setFieldValue(name, fileKey);
    },
    onUploadError: (error) => {
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Error",
        message: error.message,
      });
    },
  });

  const existingAvatarImgKey = form.values[name];
  return (
    <Vertical>
      <Horizontal>
        <Text>{label}</Text>
        {loading && <Loader size="xs" />}
      </Horizontal>
      {existingAvatarImgKey && (
        <Indicator
          w={"fit-content"}
          color="none"
          label={
            <Tooltip color="dark" label="Clear image">
              <ActionIcon onClick={() => form.setFieldValue(name, "")} size="xs" variant="gradient">
                <IconX size={16} color="#fff" />
              </ActionIcon>
            </Tooltip>
          }
        >
          <Image w={"100%"} radius={"sm"} src={getUploadThingUrl(existingAvatarImgKey)} alt="avatar" />
        </Indicator>
      )}
      <Center bd={"1px solid blue"} w={300} h={300}>
        <IconImageInPicture size={25} stroke={0.8} />
      </Center>
      {!existingAvatarImgKey && (
        <FileInput
          maw={300}
          disabled={loading}
          clearable={true}
          w={"fit-content"}
          onChange={async (file) => {
            if (file) {
              setLoading(true);
              await startUpload([file]);
            }
          }}
          placeholder={label}
          leftSection={<IconPhoto size={16} />}
        />
      )}
    </Vertical>
  );
};

export default ImagesUpload;
