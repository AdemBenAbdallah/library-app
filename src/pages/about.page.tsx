import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";

const AboutPage: BlitzPage = () => {
  return <Layout>AboutPage</Layout>;
};

AboutPage.authenticate = true;

export default AboutPage;
