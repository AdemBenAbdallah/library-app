import {
  FooterLinks,
  HeroSection,
  InfinityHScroll,
  Section1,
  Section2,
  Section3,
  Section4,
} from "@/core/components/home";
import HomeLayout from "@/core/layouts/HomeLayout";
import { BlitzPage } from "@blitzjs/next";

const Home: BlitzPage = () => {
  return (
    <HomeLayout title="Home">
      <HeroSection />
      <InfinityHScroll />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <FooterLinks />
    </HomeLayout>
  );
};

export default Home;
