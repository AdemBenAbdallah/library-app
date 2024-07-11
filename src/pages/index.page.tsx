import {
  FeaturesCards,
  FooterLinks,
  HeroSection,
  InfinityHScroll,
  JoinUs,
  OurBlog,
  OurPost,
  OurPrograms,
  WhyChooseUs,
} from "@/core/components/home";
import HomeLayout from "@/core/layouts/HomeLayout";
import { BlitzPage } from "@blitzjs/next";

const Home: BlitzPage = () => {
  return (
    <HomeLayout title="Home">
      <HeroSection />
      <InfinityHScroll />
      <OurPrograms />
      <WhyChooseUs />
      <OurPost />
      <FeaturesCards />
      <OurBlog />
      <JoinUs />
      <FooterLinks />
    </HomeLayout>
  );
};

export default Home;
