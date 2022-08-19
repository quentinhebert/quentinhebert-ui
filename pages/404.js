import Head from "next/head";
import Custom404Layout from "../components/Layouts/error/Custom404Layout";

export default function Custom404Page() {
  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | 404</title>
        <meta name="description" content="Mathias Mortelmans Films | 404" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Custom404Layout />
    </>
  );
}
