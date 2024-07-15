import { Routes } from "@blitzjs/next";
import { Button, Center, Container, Divider, Flex, Group, Image, Stack, Text, Title, rem } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Section1 = () => {
  return (
    <React.Fragment>
      <Container size={"lg"} my="md" pt={100} mb={80}>
        <Flex gap={50} direction={{ base: "column", md: "row" }}>
          <Image src={"/images/about-image.png"} alt="about" />
          <Center>
            <Stack>
              <Title fz={{ base: rem(40), md: rem(40) }} order={2}>
                Découvrez Votre Prochaine Grande Lecture
              </Title>
              <Text c={"gray.8"} fz={14}>
                Bienvenue dans notre librairie, où chaque livre est une nouvelle aventure à explorer. Que vous soyez fan
                de fiction, de non-fiction ou de tout ce qui se trouve entre les deux, nous avons une vaste collection
                pour satisfaire vos envies littéraires. Plongez dans le monde des mots et laissez votre imagination
                s'envoler.
              </Text>
              <Button component={Link} href={Routes.ProductsPage()}>
                DÉCOUVRIR MAINTENANT
              </Button>
              <Divider c={"brandy"} />
              <Stack>
                <Text fw={500} fz={18}>
                  Kathryn Moris
                </Text>
                <Text c={"gray.7"}>Entrepreneure, Écrivaine et Conférencière.</Text>
                <Group>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandFacebook size={20} color="white" />
                  </Center>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandInstagram size={20} color="white" />
                  </Center>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandLinkedin size={20} color="white" />
                  </Center>
                </Group>
              </Stack>
            </Stack>
          </Center>
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default Section1;
