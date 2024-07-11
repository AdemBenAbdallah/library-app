import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : `http://localhost:3000`;

type Props = {
  props: { name?: string | null; ResetPasswordLink: string };
};

export const ResetPasswordEamil = ({
  props = { name: "Test User", ResetPasswordLink: "Text Link" },
}: Props) => {
  const { name, ResetPasswordLink } = props;
  const welcomMsg = name ? `Hello, ${name}` : "Hello";

  return (
    <Html>
      <Head />
      <Preview>Reset your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/images/logo.png`}
              width="49"
              height="21"
              alt="hajem"
            />
            <Hr style={hr} />
            <Text style={paragraph}>{welcomMsg} welcome to our platform</Text>
            <Text style={paragraph}>You can verify your email here:</Text>
            <Button style={button} href={ResetPasswordLink}>
              Click here to verify your account
            </Button>
            <Hr style={hr} />
            <Text style={paragraph}>— The Hajem team</Text>
            <Hr style={hr} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEamil;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
