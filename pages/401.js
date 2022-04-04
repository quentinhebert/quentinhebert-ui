import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import Footer from "../components/Navigation/Footers/Footer";
import Navbar from "../components/Navigation/Navbars/navbar";

export default function Custom401() {
  return (
    <>
      <Head>
        <title>Polygones | Accès non autorisé</title>
        <meta name="description" content="Polygones | 401" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Stack justifyContent="center" alignItems="center">
        <Typography>CUSTOM 401</Typography>
      </Stack>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
