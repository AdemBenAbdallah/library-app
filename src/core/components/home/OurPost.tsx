import { Avatar, Button, Container, Flex, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";

const OurPost: React.FC = () => {
  return (
    <React.Fragment>
      <Stack bg={"custom"} mt={100}>
        <Container size={"xl"} my="md" py={200}>
          <Flex gap={50} direction={{ base: "column", md: "row" }} align={"center"}>
            <Stack flex={1}>
              <Stack gap={0}>
                <Title fz={40} order={2}>
                  What Readers Are Saying{" "}
                </Title>
              </Stack>
              <Text c={"gray.8"} fz={14}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accu santium doloremque lauda ntium.
              </Text>
              <Button>Read All</Button>
            </Stack>
            <Group flex={2}>
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <Stack key={idx} w={400} bg={"white"} p={30} style={{ borderRadius: "10px" }}>
                    <Text>
                      Justo vestibulum risus imperdiet conse ctetur conse ctetur pretium urna augue etiam risus acc um
                      san volutpat urna, eusem per enim, est aliquam laoet urna fringilla viverra.
                    </Text>
                    <Group>
                      <Avatar size={50} src="/images/user.png" />
                      <Stack gap={0}>
                        <Text>John Doe</Text>
                        <Text c={"gray.7"}>Reviw Book1</Text>
                      </Stack>
                    </Group>
                  </Stack>
                ))}
            </Group>
          </Flex>
        </Container>
      </Stack>
    </React.Fragment>
  );
};

export default OurPost;
