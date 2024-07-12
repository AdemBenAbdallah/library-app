import { Center, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

const NotFountd = ({ text }: { text: string }) => {
  const theme = useMantineTheme();
  return (
    <Center style={{ height: "calc(100vh - 17rem)" }}>
      <Stack align="center" gap={0}>
        <IconFile size={100} stroke={0.7} color={theme.colors.gray[6]} />
        <Text c="gray">{text}</Text>
      </Stack>
    </Center>
  );
};

export default NotFountd;
