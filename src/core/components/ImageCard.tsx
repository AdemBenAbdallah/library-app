import classes from "@/styles/module/ImageCard.module.css";
import { Routes } from "@blitzjs/next";
import { Card, Center, Group, Text, rem, useMantineTheme } from "@mantine/core";
import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function ImageCard() {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      onClick={() => router.push(Routes.ProductDetails({ id: 1 }))}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: "url(https://miro.medium.com/v2/resize:fit:858/1*65CugInou11llUdnq7KBgw.png)",
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            Journey to Swiss Alps
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              Robert Gluesticker
            </Text>

            <Group gap="lg">
              <Center>
                <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  7847
                </Text>
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  5
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
