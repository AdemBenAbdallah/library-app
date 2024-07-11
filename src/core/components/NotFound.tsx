import { Center, Stack, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

const NotFountd = ({ text }: { text: string }) => {
  return (
    <Center style={{ height: "calc(100vh - 17rem)" }}>
      <Stack align="center" gap={0}>
        <IconFile size={100} stroke={0.7} color="lime" />
        <Text c="gray">{text}</Text>
      </Stack>
    </Center>
  );
};

export default NotFountd;
