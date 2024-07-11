import { ImageCard } from "@/core/components/ImageCard";
import { InputWithButton } from "@/core/components/InputWithButton";
import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Group, Modal, Radio, RangeSlider, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsAlt } from "@tabler/icons-react";

const ProductsPage: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [opened, { open, close }] = useDisclosure();

  return (
    <Layout title="Products">
      <Group align="start" mt={30} gap={40}>
        <Stack visibleFrom="sm" flex={2} mih={300} gap={20}>
          <ProdutcsFilter />
        </Stack>
        <Stack flex={8} mih={300} pb={100}>
          <Group>
            <InputWithButton
              defaultValue={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              w={{ base: 300, sm: 400 }}
            />
            <ThemeIcon
              onClick={open}
              variant="gradient"
              size="lg"
              style={{ cursor: "pointer" }}
              gradient={{ from: "#957049", to: "rgba(79, 60, 40, 1)", deg: 90 }}
            >
              <IconAdjustmentsAlt />
            </ThemeIcon>
          </Group>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 5 }}
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
      </Group>
      <Modal opened={opened} onClose={close} centered size={"sm"}>
        <ProdutcsFilter />
      </Modal>
    </Layout>
  );
};

const ProdutcsFilter = () => {
  return (
    <>
      <Stack>
        <Text fw={500}>Prix des produits</Text>
        <RangeSlider minRange={0.2} min={0} max={1} step={0.0005} defaultValue={[0.1245, 0.5535]} />
      </Stack>
      <Stack>
        <Text fw={500}>Catégories</Text>
        <Radio.Group withAsterisk>
          <Group mt="xs">
            <Radio value="react" label="React" />
            <Radio value="svelte" label="Svelte" />
            <Radio value="ng" label="Angular" />
            <Radio value="vue" label="Vue" />
            <Radio value="vue" label="Vue" />
            <Radio value="vue" label="Vue" />
          </Group>
        </Radio.Group>
      </Stack>
    </>
  );
};
export default ProductsPage;
