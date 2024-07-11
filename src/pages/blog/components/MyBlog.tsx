import { BlogCard } from "@/core/components/BlogCard";
import { InputWithButton } from "@/core/components/InputWithButton";
import NotFound from "@/core/components/NotFound";
import getBlogs from "@/features/blogs/queries/getBlogs";
import { BlogType } from "@/features/blogs/schema";
import { useSession } from "@blitzjs/auth";
import { useInfiniteQuery } from "@blitzjs/rpc";
import { Button, Group, Modal, SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsAlt, IconPlus } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import AddBlog, { blogCategory } from "./AddBlog";
import { BlogCategorySelector } from "./AllBlog";

const MyBlog = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedFilter, { open: openFilter, close: closeFilter }] = useDisclosure(false);

  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
  const session = useSession();
  const [blogPages, { isFetchingNextPage, fetchNextPage, hasNextPage }] = useInfiniteQuery(
    getBlogs,
    (page = { take: 10, skip: 0 }) => ({
      ...page,
      where: {
        authorId: session.userId,
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
      <Group justify="space-between">
        <Group>
          <InputWithButton
            w={{ base: 250, md: 300 }}
            defaultValue={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Group>
            <ThemeIcon
              onClick={openFilter}
              variant="gradient"
              size="lg"
              style={{ cursor: "pointer" }}
              gradient={{ from: "lime", to: "teal", deg: 90 }}
            >
              <IconAdjustmentsAlt />
            </ThemeIcon>
            <ThemeIcon
              onClick={open}
              variant="gradient"
              size="lg"
              style={{ cursor: "pointer" }}
              gradient={{ from: "lime", to: "teal", deg: 90 }}
            >
              <IconPlus />
            </ThemeIcon>
          </Group>
        </Group>
        <Button visibleFrom="sm" onClick={open} radius={"md"} c={"white"}>
          Add Blog
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
        {blogPages.map((page, i) => (
          <Fragment key={i}>
            {page.blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} setSelectedBlog={setSelectedBlog} updateModalOpen={open} isEdit />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Stack>
          <div>
            <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || !!isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
            </Button>
          </div>
        </Stack>
      )}
      {!hasBlogs && <NotFound text="Aucun blog trouvé." />}
      <Modal opened={opened} onClose={close} fullScreen>
        <AddBlog close={close} blog={selectedBlog} />
      </Modal>
      <Modal opened={openedFilter} onClose={closeFilter} title="Blog Categories" centered size={"sm"}>
        <BlogCategorySelector
          blogCategories={blogCategory}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          close={closeFilter}
        />
      </Modal>
    </Stack>
  );
};

export default MyBlog;
