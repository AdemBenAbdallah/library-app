import Head from "next/head";
import { ReactFC } from "~/types";
import { Header } from "../components/Header";

type Props = { title?: string };

export const dynamic = "force-dynamic";

const HomeLayout: ReactFC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "barber"}</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <>
        <Header />
        {children}
      </>
    </>
  );
};

export default HomeLayout;
