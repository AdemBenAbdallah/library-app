import { Vertical } from "@/core/components/MantineLayout";
import Layout from "@/core/layouts/Layout";
import VerifyEmailToken from "@/features/auth/queries/VerifyEmailToken";
import { useStringQueryPram } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Text } from "@mantine/core";

const VerifyEmail: BlitzPage = () => {
  const token = useStringQueryPram("token");
  const [result, { isSuccess, error }] = useQuery(
    VerifyEmailToken,
    { token: token as string },
    { enabled: !!token }
  );
  return (
    <Layout>
      <Vertical>
        <>
          {result && isSuccess && <Text>Email verified</Text>}
          {error && <Text>Invalid Token</Text>}
        </>
      </Vertical>
    </Layout>
  );
};

export default VerifyEmail;
