import Head from "next/head";
import { ReactFC } from "~/types";
import { HomeHeader } from "../components/Header/HomeHeader";

type Props = { title?: string };

export const dynamic = "force-dynamic";

const HomeLayout: ReactFC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "barber"}</title>
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <>
        <HomeHeader />
        {children}
      </>
    </>
  );
};

export default HomeLayout;
