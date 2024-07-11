import { AuthenticationForm } from "@/core/components/MainAuthForm";
import { Vertical } from "@/core/components/MantineLayout";
import Layout from "@/core/layouts/Layout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useStringQueryPram } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { Tabs, rem } from "@mantine/core";
import { IconBrandBooking, IconTablePlus } from "@tabler/icons-react";
import AllBlog from "./components/AllBlog";
import MyBlog from "./components/MyBlog";

const BlogPage: BlitzPage = () => {
  const currentUser = useCurrentUser();
  const iconStyle = { width: rem(20), height: rem(20) };
  const formType = useStringQueryPram("form") || "login";

  return (
    <Layout title="Blog">
      {currentUser && (
        <Tabs defaultValue="gallery">
          {currentUser.role === "COACH" && (
            <Tabs.List w={"fit-content"}>
              <Tabs.Tab value="gallery" leftSection={<IconBrandBooking style={iconStyle} />}>
                Tous les blogs
              </Tabs.Tab>
              <Tabs.Tab value="messages" leftSection={<IconTablePlus style={iconStyle} />}>
                Mes contributions
              </Tabs.Tab>
            </Tabs.List>
          )}

          <Tabs.Panel value="gallery">
            <AllBlog />
          </Tabs.Panel>

          <Tabs.Panel value="messages">
            <MyBlog />
          </Tabs.Panel>
        </Tabs>
      )}

      {!currentUser && (
        <Vertical fullH align="center" justify="center">
          <AuthenticationForm initialFormType={Array.isArray(formType) ? formType[0] : formType} />
        </Vertical>
      )}
    </Layout>
  );
};

export default BlogPage;
