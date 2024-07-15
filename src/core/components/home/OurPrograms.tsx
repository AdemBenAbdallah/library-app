import { Button, Center, Container, Divider, Flex, Group, Image, Stack, Text, Title, rem } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from "@tabler/icons-react";
import React from "react";

const OurPrograms = () => {
  return (
    <React.Fragment>
      <Container size={"lg"} my="md" pt={200} mb={80}>
        <Flex gap={50} direction={{ base: "column", md: "row" }}>
          <Image src={"/images/about-image.png"} alt="about" />
          <Center>
            <Stack>
              <Title fz={{ base: rem(40), md: rem(40) }} order={2}>
                A Word From The Author
              </Title>
              <Text c={"gray.8"} fz={14}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
                et dolore magnam aliquam quaerat voluptatem.
              </Text>
              <Button>READ MORE</Button>
              <Divider c={"brandy"} />
              <Stack>
                <Text fw={500} fz={18}>
                  Kathryn Moris
                </Text>
                <Text c={"gray.7"}>Entrepreneur, Writer and Speaker.</Text>
                <Group>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandFacebook size={20} color="white" />
                  </Center>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandTwitter size={20} color="white" />
                  </Center>
                  <Center w={40} h={40} bg={"brandy"} style={{ cursor: "pointer", borderRadius: "50%" }}>
                    <IconBrandInstagram size={20} color="white" />
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

export default OurPrograms;
