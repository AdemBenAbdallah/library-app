import { Routes } from "@blitzjs/next";
import { Box, Button, Container, Flex, Image, Stack, Text, Title, rem } from "@mantine/core";
import Link from "next/link";

export default function Section4() {
  return (
    <Container size="lg" mt={100} pb={100}>
      <Flex gap={{ base: 20, md: 50 }} direction={{ base: "column", md: "row" }} align={"center"}>
        <Box flex={1}>
          <Image m={"auto"} w={"60%"} src={"/images/book-section2.jpg"} alt="book cover" />
        </Box>

        <Stack flex={1}>
          <Stack gap={0}>
            <Text c={"brandy"}>Sun Tzu</Text>
            <Title fz={{ base: rem(40), md: rem(40) }} order={2}>
              The Art of War
            </Title>
          </Stack>
          <Text c={"gray.8"} fz={14}>
            The Art of War is an ancient Chinese military treatise attributed to Sun Tzu, a military strategist and
            philosopher. This timeless classic is composed of 13 chapters, each dedicated to a different aspect of
            warfare, and offers invaluable insights into strategy, tactics, and leadership that are still relevant in
            modern times.
          </Text>
          <Button component={Link} href={Routes.ProductsPage()}>
            READ MORE
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
