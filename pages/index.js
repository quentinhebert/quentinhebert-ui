import Head from "next/head";
import Navbar from "../components/Navigation/Navbars/navbar";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../config/theme";
import photo1 from "../public/medias/home-photo1.jpg";
import photo2 from "../public/medias/home-photo2.jpg";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import Footer from "../components/Navigation/Footers/Footer";
import TwoRowSquareGallery from "../components/sections/two-row-square-gallery";

const images = [
  {
    image: photo1,
    domain: "Filmmaker",
    jobs: "Réalisateur Cadreur Monteur",
    url: "/film",
    alt: "Tournage d'un court-métrage à Nanterre avec la narco prod. On peut voir le retour caméra sur le moniteur externe du cadreur.",
    icon: <VideocamIcon />,
  },
  {
    image: photo2,
    domain: "Developper",
    jobs: ["Développeur Full-Stack Front/Back JS"],
    url: "/dev",
    alt: "Lignes de code sur l'écran d'un ordinateur.",
    icon: <PersonalVideoIcon />,
  },
];

export default function Home() {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>Polygones</title>
        <meta
          name="description"
          content="Société de développeurs et filmmakers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Stack
        justifyContent="center"
        alignItems="center"
        marginTop={md ? "4rem" : "8rem"}
      >
        <Typography
          component="H1"
          fontFamily="Arial, sans-serif"
          textTransform="uppercase"
          sx={{ fontSize: { md: "2rem", sm: "1.5rem" } }}
        >
          Que cherchez-vous ?
        </Typography>
      </Stack>

      <TwoRowSquareGallery images={images} />

      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
