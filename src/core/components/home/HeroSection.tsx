import classes from "@/styles/module/HeroContentLeft.module.css";
import { Routes } from "@blitzjs/next";
import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up-stagger > div");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("show");
      }, index * 150);
    });
  }, []);

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <div className="fade-up-stagger">
          <div className="hidden">
            <Title className={`${classes.title}`}>Une pièce sans livres est comme un corps sans âme.</Title>
          </div>
          <div className="hidden">
            <Text className={` ${classes.description}`} size="xl" mt="xl">
              Découvrez notre vaste collection de livres de différents genres et auteurs. Commencez votre voyage
              littéraire avec nous dès aujourd'hui !
            </Text>
          </div>

          <div className="hidden">
            <Button
              variant="gradient"
              gradient={{ from: "rgba(171, 93, 10, 1)", to: "rgba(196, 159, 118, 1)", deg: 90 }}
              size="xl"
              radius="xl"
              className={classes.control}
              component={Link}
              href={Routes.ProductsPage()}
            >
              Commencer
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
