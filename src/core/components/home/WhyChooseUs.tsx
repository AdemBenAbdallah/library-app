import { Horizontal, Vertical } from "@/core/components/MantineLayout";
import { CheckIcon, ColorSwatch, Container, Flex, Image, Text, Title, rem } from "@mantine/core";

const WhyChooseUs = () => {
  const reasons = [
    "1 programme gratuit pour les nouveaux",
    "Installations à la pointe de la technologie",
    "Entraînez-vous plus intelligemment",
    "Plans d'entraînement personnalisés",
    "Plus de 25+ coachs experts",
    "Communauté solidaire",
    "Partenaires fiables",
    "Horaires flexibles",
  ];

  return (
    <Container size="md" mt={{ base: 100, md: 200 }}>
      <Flex align="flex-start" gap="xl" direction={{ base: "column", md: "row" }}>
        <Image
          display={{ base: "none", md: "block" }}
          flex={1}
          fit="cover"
          radius={12}
          src={"/images/why_choose_us.webp"}
          alt="Pourquoi nous choisir"
          w={300}
          h={600}
        />
        <Vertical flex={1} gap="xl">
          <Vertical gap={5}>
            <Vertical gap={0}>
              <Text c="lime.6" fw={600}>
                À propos
              </Text>
              <Title order={1} fz={{ base: rem(35), md: rem(40) }}>
                Pourquoi nous choisir
              </Title>
            </Vertical>
            <Text c={"gray"}>
              Choisissez votre classe préférée et commencez maintenant. Rappelez-vous, le seul mauvais entraînement est
              celui que vous n'avez pas fait.
            </Text>
          </Vertical>
          <Vertical gap="sm">
            {reasons.map((reason, index) => (
              <Horizontal key={index} gap="lg" align="center">
                <ColorSwatch component="button" color="var(--mantine-color-lime-6)" style={{ color: "#fff" }}>
                  <CheckIcon style={{ width: rem(12), height: rem(12) }} />
                </ColorSwatch>
                <Text fz={{ base: rem(15), md: rem(17) }} fw={600}>
                  {reason}
                </Text>
              </Horizontal>
            ))}
          </Vertical>
        </Vertical>
      </Flex>
    </Container>
  );
};

export default WhyChooseUs;
