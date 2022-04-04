import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import Footer from "../components/Navigation/Footers/Footer";
import Navbar from "../components/Navigation/Navbars/navbar";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Polygones | 404</title>
        <meta
          name="description"
          content="Polygones | Quelques infos au sujet de mon site internet..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Stack justifyContent="center" alignItems="center">
        <Typography>CUSTOM 404</Typography>
      </Stack>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
