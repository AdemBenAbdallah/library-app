import { ProductType } from "@/features/products/schema";
import classes from "@/styles/module/ImageCard.module.css";
import { getUploadThingUrl } from "@/utils/image-utils";
import { categoryNameFormat } from "@/utils/utils";
import { Routes } from "@blitzjs/next";
import { Card, Center, Group, Text, rem, useMantineTheme } from "@mantine/core";
import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function ImageCard({ product }: { product: ProductType }) {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      style={{ cursor: "pointer" }}
      onClick={() => router.push(Routes.ProductDetails({ id: product.id }))}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${getUploadThingUrl(product?.productImageKey)})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {product.title}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              {categoryNameFormat(product.category)}
            </Text>

            <Group gap="lg">
              <Center>
                <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  {product.price}
                </Text>
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText} w={100} lineClamp={1}>
                  {product.author}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
