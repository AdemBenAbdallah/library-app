import { BlogCard } from "@/core/components/BlogCard";
import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import getBlogs from "@/features/blogs/queries/getBlogs";
import { BlogType } from "@/features/blogs/schema";
import { useInfiniteQuery } from "@blitzjs/rpc";
import { Button, Group, Modal, Radio, SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsAlt } from "@tabler/icons-react";
import React, { useState } from "react";
import AddBlog, { blogCategory } from "./AddBlog";

const AllBlog = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedUpdate, { open: openUpdate, close: closeUpdate }] = useDisclosure(false);

  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  const [blogPages, { isFetchingNextPage, fetchNextPage, hasNextPage }] = useInfiniteQuery(
    getBlogs,
    (page = { take: 10, skip: 0 }) => ({
      ...page,
      where: {
        title: { contains: search, mode: "insensitive" },
        category: { contains: categoryFilter === "All" ? "" : categoryFilter },
      },
    }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );
  const hasBlogs = blogPages.some((page) => page.blogs.length > 0);

  return (
    <Stack px={{ base: 0, md: 20 }} pt={20} pb={80}>
      <Group>
        <InputWithButton
          defaultValue={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          w={{ base: 250, md: 300 }}
        />
        <ThemeIcon
          onClick={open}
          variant="gradient"
          size="lg"
          style={{ cursor: "pointer" }}
          gradient={{ from: "lime", to: "teal", deg: 90 }}
        >
          <IconAdjustmentsAlt />
        </ThemeIcon>
      </Group>
      {hasBlogs && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
          {blogPages.map((page, i) => (
            <React.Fragment key={i}>
              {page.blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} setSelectedBlog={setSelectedBlog} updateModalOpen={openUpdate} />
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
      <Modal opened={openedUpdate} onClose={closeUpdate} fullScreen>
        <AddBlog close={closeUpdate} blog={selectedBlog} />
      </Modal>
      <Modal opened={opened} onClose={close} title="Blog Categories" centered size={"sm"}>
        <BlogCategorySelector
          blogCategories={blogCategory}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          close={close}
        />
      </Modal>
    </Stack>
  );
};

const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

export const BlogCategorySelector = ({
  blogCategories,
  categoryFilter,
  setCategoryFilter,
  close,
}: {
  blogCategories: string[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  close: () => void;
}) => {
  const categoriesInColumns = chunkArray(blogCategories, 6);

  return (
    <Radio.Group
      mb={40}
      value={categoryFilter}
      onChange={(value) => {
        setCategoryFilter(value);
        close();
      }}
    >
      <Group mt="xs">
        {categoriesInColumns.map((column, columnIndex) => (
          <Stack key={columnIndex}>
            {column.map((category) => (
              <Radio value={category} label={category} key={category} />
            ))}
          </Stack>
        ))}
      </Group>
    </Radio.Group>
  );
};

export default AllBlog;
