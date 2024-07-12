import { ImageCard } from "@/core/components/ImageCard";
import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import Layout from "@/core/layouts/Layout";
import getProducts from "@/features/products/queries/getProducts";
import { categoryNameFormat } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useInfiniteQuery } from "@blitzjs/rpc";
import { Button, Group, Modal, Radio, RangeSlider, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { BookCategory } from "@prisma/client";
import { IconAdjustmentsAlt } from "@tabler/icons-react";
import React, { useState } from "react";

const ProductsPage: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState<[number, number]>();
  const [opened, { open, close }] = useDisclosure();

  const [productPage, { isFetchingNextPage, fetchNextPage, hasNextPage }] = useInfiniteQuery(
    getProducts,
    (page = { take: 10, skip: 0 }) => ({
      ...page,
      where: {
        title: { contains: search, mode: "insensitive" },
        category: categoryFilter ? { equals: categoryFilter } : undefined,
        price: priceFilter ? { gte: priceFilter[0], lte: priceFilter[1] } : undefined,
      },
    }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );
  const hasBlogs = productPage.some((page) => page.products.length > 0);

  return (
    <Layout title="Products">
      <Group align="start" mt={30} gap={40}>
        <Stack visibleFrom="sm" flex={2} mih={300} gap={20}>
          <ProdutcsFilter
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />
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
          {hasBlogs && (
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 5 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              {productPage.map((page, i) => (
                <React.Fragment key={i}>
                  {page.products.map((product) => (
                    <ImageCard key={product.id} product={product} />
                  ))}
                </React.Fragment>
              ))}
            </SimpleGrid>
          )}
          {!hasBlogs && <NotFound text="Aucun blog trouvé." />}
          {hasNextPage && (
            <Stack>
              <div>
                <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || !!isFetchingNextPage}>
                  {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
                </Button>
              </div>
            </Stack>
          )}
        </Stack>
      </Group>
      <Modal opened={opened} onClose={close} centered size={"sm"}>
        <ProdutcsFilter
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />
      </Modal>
    </Layout>
  );
};

const ProdutcsFilter = ({
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
}: {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  priceFilter: [number, number] | undefined;
  setPriceFilter: (value: [number, number] | undefined) => void;
}) => {
  return (
    <Stack gap={30} pb={20}>
      <Stack>
        <Text fw={500}>Prix des produits</Text>
        <RangeSlider
          value={priceFilter}
          onChange={setPriceFilter}
          minRange={10}
          min={0}
          max={1000}
          step={5}
          defaultValue={[10, 50]}
        />
      </Stack>
      <Stack>
        <Text fw={500}>Catégories</Text>
        <Radio.Group
          withAsterisk
          value={categoryFilter}
          onChange={(value) => {
            setCategoryFilter(value);
            close();
          }}
        >
          <Group mt="xs">
            <Radio value={""} label={"All"} />
            {Object.keys(BookCategory).map((item) => (
              <Radio key={item} value={item} label={categoryNameFormat(item)} />
            ))}
          </Group>
        </Radio.Group>
      </Stack>
      <Text
        ml={"auto"}
        onClick={() => {
          setPriceFilter(undefined);
          setCategoryFilter("");
        }}
        c={"brandy"}
        td={"underline"}
        style={{ cursor: "pointer" }}
      >
        Reset Filter
      </Text>
    </Stack>
  );
};
export default ProductsPage;
