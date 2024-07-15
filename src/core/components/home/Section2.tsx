import { Routes } from "@blitzjs/next";
import { Box, Button, Container, Flex, Image, Stack, Text, Title, rem } from "@mantine/core";
import Link from "next/link";

const Section2 = () => {
  return (
    <Container size="lg" mt={100}>
      <Flex gap={{ base: 20, md: 50 }} direction={{ base: "column", md: "row" }} align={"center"}>
        <Stack flex={1}>
          <Stack gap={0}>
            <Text c={"brandy"}>George Samuel Clason</Text>
            <Title fz={{ base: rem(40), md: rem(40) }} order={2}>
              The Richest Man in Babylon
            </Title>
          </Stack>
          <Text c={"gray.8"} fz={14}>
            Money is the medium by which earthly success is measured. Money makes possible the enjoyment of the best the
            earth affords. Money is plentiful for those who understand the simple laws which govern its acquisition.
            Money is governed today by the same laws which controlled it when prosperous men thronged the streets of
            Babylon, six thousand years ago.
          </Text>
          <Button component={Link} href={Routes.ProductsPage()}>
            READ MORE
          </Button>
        </Stack>
        <Box flex={1}>
          <Image m={"auto"} w={"80%"} src={"/images/book-section1.jpg"} alt="book cover" />
        </Box>
      </Flex>
    </Container>
  );
};

export default Section2;
