import useResponsive from "@/utils/useResponsive";
import { Box, Button, Center, Text, Title, rem } from "@mantine/core";

const JoinUs = () => {
  const { isMobile } = useResponsive();
  return (
    <Center mb={70}>
      <Center
        w={"90%"}
        bg={"lime"}
        mt={rem(120)}
        c={"white"}
        px={{ base: rem(20), sm: rem(20) }}
        style={{ borderRadius: isMobile ? 25 : 48 }}
      >
        <Box>
          <Title fw={800} fz={{ base: rem(30), sm: rem(36), md: rem(57) }} mt={{ base: rem(50), sm: rem(100) }}>
            COMMENCEZ VOTRE PARCOURS DE FITNESS
          </Title>
          <p className="text">
            Rejoignez notre communauté de salle de sport. Vous avez des questions ?{" "}
            <Text span fw={600}>
              Lisez nos 270+ avis ici.
            </Text>
          </p>
          <Button
            bg={"white"}
            c={"black"}
            mx={"auto"}
            fw={600}
            radius={"md"}
            mb={rem(70)}
            mt={{ base: rem(12), sm: rem(58) }}
            w={{ base: "100%", sm: rem(326) }}
            h={{ base: rem(50), sm: rem(40) }}
            style={{ display: "block" }}
          >
            Rejoignez Notre Communauté
          </Button>
        </Box>
      </Center>
    </Center>
  );
};

export default JoinUs;
