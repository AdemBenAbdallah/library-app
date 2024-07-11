import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import Layout from "@/core/layouts/Layout";
import getBlogById from "@/features/blogs/queries/getBlogById";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { getUploadThingUrl } from "@/utils/image-utils";
import { useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Button, Container, Image, Stack, Text, Title, TypographyStylesProvider } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const BlogDetails: BlitzPage = () => {
  const currentUser = useCurrentUser();
  return (
    <Layout title="Blog Details">
      {currentUser && <BlogContent />}

      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

const BlogContent = () => {
  const id = useStringParam("id");
  const [blogDetails] = useQuery(getBlogById, { id });

  return (
    <Container pb={80}>
      <Stack>
        <Button
          variant="default"
          style={{ border: "none" }}
          leftSection={<IconArrowNarrowLeft size={25} />}
          component={Link}
          href={Routes.BlogPage()}
          size="md"
        >
          Back to blogs
        </Button>
        <Stack gap={0}>
          <Title order={1}>{blogDetails?.title}</Title>
          <Text c={"gray"}>{blogDetails?.category}</Text>
        </Stack>
        <Stack gap={30}>
          <Image w={"100%"} src={getUploadThingUrl(blogDetails?.blogImageKey)} alt="blog image" />
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: blogDetails?.content || "" }} />
          </TypographyStylesProvider>
        </Stack>
      </Stack>
    </Container>
  );
};
export default BlogDetails;
