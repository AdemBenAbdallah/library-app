import { Vertical } from "@/core/components/MantineLayout";
import classes from "@/styles/module/FeaturesCards.module.css";
import { Card, Container, SimpleGrid, Text, Title, rem, useMantineTheme } from "@mantine/core";
import { IconCookie, IconGauge, IconWeight } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Cours collectifs variés",
    description:
      "Participez à une variété de cours collectifs pour tous les niveaux, y compris le yoga, le pilates, le spinning et plus encore, pour une expérience de remise en forme diversifiée.",
    icon: IconGauge,
  },
  {
    title: "Équipement de pointe",
    description:
      "Accédez à un équipement de fitness de haute qualité pour vous aider à atteindre vos objectifs, y compris des machines cardio, des poids libres, et des équipements de musculation.",
    icon: IconWeight,
  },
  {
    title: "Programmes d'entraînement personnalisés",
    description:
      "Bénéficiez de programmes d'entraînement personnalisés élaborés par nos entraîneurs certifiés, adaptés à vos besoins et objectifs spécifiques.",
    icon: IconCookie,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={2} color={theme.colors.lime[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>

      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" mt={{ base: 100, md: 200 }}>
      <Vertical gap={0}>
        <Text> Services</Text>
        <Title fz={{ base: rem(35), md: rem(50) }}>Nos Services</Title>
      </Vertical>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={{ base: 10, md: 50 }}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
