import { Vertical } from "@/core/components/MantineLayout";
import getThreeBlog from "@/features/blogs/queries/getThreeBlog";
import { useQuery } from "@blitzjs/rpc";
import { Container, SimpleGrid, Text, Title, rem } from "@mantine/core";
import { BlogCard } from "../BlogCard";

const OurBlog = () => {
  const [blogPages] = useQuery(getThreeBlog, {});

  return (
    <Container size="lg" mt={{ base: 100, md: 200 }}>
      <Vertical gap={0}>
        <Text> Blog</Text>
        <Title fz={{ base: rem(35), md: rem(50) }}>Articale from tasking</Title>
      </Vertical>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={{ base: 30, md: 50 }}>
        {blogPages.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default OurBlog;
