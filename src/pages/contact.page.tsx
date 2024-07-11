import bg from "@/assets/bg.svg";
import HomeLayout from "@/core/layouts/HomeLayout";
import classes from "@/styles/module/ContactIcons.module.css";
import clss from "@/styles/module/GetInTouch.module.css";
import { BlitzPage } from "@blitzjs/next";
import { Box, Button, Container, Group, Paper, rem, SimpleGrid, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";

const ContactPage: BlitzPage = () => {
  return (
    <HomeLayout title="Accueil">
      <Container mt={{ base: 30, md: 200 }}>
        <GetInTouch />
      </Container>
    </HomeLayout>
  );
};

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "hello@gym.com", icon: IconAt },
  { title: "Téléphone", description: "+216 (800) 335 35 35", icon: IconPhone },
  { title: "Adresse", description: "844 avenue Morris Park", icon: IconMapPin },
  { title: "Heures d'ouverture", description: "8h - 23h", icon: IconSun },
];

function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}

function GetInTouch() {
  return (
    <Paper shadow="md" radius="lg">
      <div className={clss.wrapper}>
        <div className={clss.contacts} style={{ backgroundImage: `url(${bg.src})` }}>
          <Text fz="lg" fw={700} className={clss.title} c="#fff">
            Informations de contact
          </Text>

          <ContactIconsList />
        </div>

        <form className={clss.form} onSubmit={(event) => event.preventDefault()}>
          <Text fz="lg" fw={700} className={clss.title}>
            Contactez-nous
          </Text>

          <div className={clss.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Votre nom" placeholder="Votre nom" />
              <TextInput label="Votre email" placeholder="hello@mantine.dev" required />
            </SimpleGrid>

            <TextInput mt="md" label="Sujet" placeholder="Sujet" required />

            <Textarea
              mt="md"
              label="Votre message"
              placeholder="Veuillez inclure toutes les informations pertinentes"
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={clss.control}>
                Envoyer le message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}

export default ContactPage;
