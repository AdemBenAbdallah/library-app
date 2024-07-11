import { Routes } from "@blitzjs/next";
import { Button, Center, Group } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="home-page">
      <div className="video-container">
        <video autoPlay loop muted className="video">
          <source
            src={"https://res.cloudinary.com/dfc7p5apq/video/upload/v1720351402/nc7jejirxkqazliva2fn.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="content">
          <h1>TRAVAILLEZ AVEC DES PROFESSIONNELS</h1>
          <h2>
            Nous sommes le plus grand réseau d'experts en fitness, santé et bien-être en Tunisie. Prêts à vous aider à
            atteindre vos objectifs de fitness et à transformer votre vie.
          </h2>
          <Center>
            <Group>
              <Button fw={400} radius={"md"} component={Link} href={Routes.ContactPage()}>
                COMMENCER
              </Button>
              <Button
                component={Link}
                href={Routes.ProductsPage()}
                fw={400}
                bg={"white"}
                c={"black"}
                rightSection={<IconArrowUpRight width={20} />}
              >
                SAVOIR PLUS
              </Button>
            </Group>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
