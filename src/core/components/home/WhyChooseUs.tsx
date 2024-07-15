import { Button, Container, Flex, Group, Image, Stack, Text, Title, rem } from "@mantine/core";

const WhyChooseUs = () => {
  return (
    <Container size="xl" mt={{ base: 100, md: 200 }}>
      <Flex gap={{ base: 20, md: 100 }} direction={{ base: "column", md: "row" }} align={"center"}>
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
        <Group flex={1}>
          <Image w={{ base: 70, md: 250 }} src={"/images/book-cover1.jpg"} alt="book cover" />
          <Image w={{ base: 70, md: 250 }} src={"/images/book-cover2.jpg"} alt="book cover" />
          <Image w={{ base: 70, md: 250 }} src={"/images/book-cover3.jpg"} alt="book cover" />
          <Image w={{ base: 70, md: 250 }} src={"/images/book-cover4.jpg"} alt="book cover" />
        </Group>
      </Flex>
    </Container>
  );
};

export default WhyChooseUs;
