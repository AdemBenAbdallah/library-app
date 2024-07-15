import { Box, Button, Container, Flex, Image, Stack, Text, Title, rem } from "@mantine/core";

export function FeaturesCards() {
  return (
    <Container size="lg" mt={100}>
      <Flex gap={{ base: 20, md: 50 }} direction={{ base: "column", md: "row" }} align={"center"}>
        <Box flex={1}>
          <Image ml={"auto"} w={"80%"} src={"/images/book-cover1.jpg"} alt="book cover" />
        </Box>

        <Stack flex={1}>
          <Stack gap={0}>
            <Text c={"brandy"}>Complete Series</Text>
            <Title fz={{ base: rem(40), md: rem(40) }} order={2}>
              Smoke And The Heart
            </Title>
          </Stack>
          <Text c={"gray.8"} fz={14}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </Text>
          <Button>READ MORE</Button>
        </Stack>
      </Flex>
    </Container>
  );
}
