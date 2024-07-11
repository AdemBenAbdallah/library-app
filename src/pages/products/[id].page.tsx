import { ImageCard } from "@/core/components/ImageCard";
import Layout from "@/core/layouts/Layout";
import { useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import { Button, Group, Image, NumberInput, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

const ProductDetails: BlitzPage = () => {
  const id = useStringParam("id");

  return (
    <Layout title="Product Details">
      <Stack gap={100} pb={200}>
        <Group w={{ base: "100%", md: 1200 }} mt={20} mx={"auto"} align="start" gap={50} wrap="wrap">
          <Stack flex={1} bg={"red"} style={{ borderRadius: 10 }}>
            <Image
              miw={300}
              src={"https://miro.medium.com/v2/resize:fit:858/1*65CugInou11llUdnq7KBgw.png"}
              w={"100%"}
              h={"100%"}
              style={{ borderRadius: 10 }}
            />
          </Stack>
          <Stack flex={1} justify="space-between" h={{ base: "auto", md: "100%" }}>
            <Stack gap={0}>
              <Title>The 12 week year</Title>
              <Text span c={"brandy"} fz={"sm"}>
                Mouhammed ali
              </Text>
            </Stack>
            <Group gap={6}>
              <Text fw={500}> Description:</Text>
              <Text c={"dimmed"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aut consequatur quos. Voluptatum porro
                ab, molestias animi deserunt reiciendis obcaecati veritatis dolore in.
              </Text>
            </Group>

            <Stack gap={6}>
              <Text fw={500}> Categories:</Text>
              <Group>
                <Button variant={"outline"}>Finiace</Button>
                <Button variant={"outline"}>Productivity</Button>
              </Group>
            </Stack>

            <Stack>
              <Group>
                <Text fw={500}>Prix:</Text>
                <Text span c={"dimmed"} fz={"sm"}>
                  20.000 DT
                </Text>
              </Group>

              <NumberInput w={100} defaultValue={1} min={1} allowNegative={false} />
            </Stack>

            <Button bg={"black"} w={"100%"}>
              Add to cart
            </Button>
          </Stack>
        </Group>
        <Stack px={{ base: 0, md: 20 }}>
          <Text ml={"auto"} td="underline" c={"brandy"} component={Link} href={Routes.ProductsPage()} fw={500}>
            see more
          </Text>
          <SimpleGrid
            cols={{ base: 2, sm: 2, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <ImageCard key={index} />
              ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default ProductDetails;
