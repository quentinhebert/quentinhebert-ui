import Head from "next/head";
import Navbar from "../components/Navigation/Navbars/navbar";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../config/theme";
import photo1 from "../public/medias/home-photo1.jpg";
import photo2 from "../public/medias/home-photo2.jpg";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import Footer from "../components/Navigation/Footers/Footer";
import BicolorTitleBand from "../components/sections/bicolor-title-band";
import ImgTextBand from "../components/sections/img-text-band";

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
        <title>Polygones | À propos du site</title>
        <meta
          name="description"
          content="Polygones | Quelques infos au sujet de mon site internet..."
        />
        <link href="http://fonts.cdnfonts.com/css/xhers" rel="stylesheet" />
        <link href="http://fonts.cdnfonts.com/css/luxerie" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <BicolorTitleBand
        mainText="le site polygones.com"
        mainColor="#87181f"
        secondaryText="Tout savoir sur"
        secondaryColor="#fff"
        bgColor={(theme) => theme.palette.background.main}
      />

      <Stack justifyContent="center" alignItems="center">
        <ImgTextBand
          img="/medias/about-website/nodejs-logo.png"
          title="Quel environnement ?"
          titleColor="#61b448"
          text="Ce site internet est un projet Node.js qui a été développé par Quentin HEBERT."
          reverse
        />
        <ImgTextBand
          img="/medias/about-website/javascript-logo.png"
          title="Quel language ?"
          titleColor="#f7e018"
          text="Le langage majoritairement utilisé dans le projet est le JavaScript."
        />
        <ImgTextBand
          img="/medias/about-website/libraries.png"
          title="Quelles librairies ?"
          titleColor="#0080ff"
          text="Le projet est un projet ReactJS, avec son framework Next.js. Nous
          utilisons également la librairie MUI (anciennement MaterialUI) pour
          les éléments d'interface facilement personalisables. Son utilisation a
          permi d'accélérer la phase de développement du site en front-end."
          reverse
        />
        <ImgTextBand
          img="/medias/about-website/stripe-logo.png"
          title="Quel service de paiement en ligne ?"
          titleColor="#6772e5"
          text="Le projet est un projet ReactJS, avec son framework Next.js. Nous
          utilisons également la librairie MUI (anciennement MaterialUI) pour
          les éléments d'interface facilement personalisables. Son utilisation a
          permi d'accélérer la phase de développement du site en front-end."
        />
        <ImgTextBand
          img="/medias/about-website/google-logo.png"
          title="Quel service de paiement en ligne ?"
          titleColor="#fff"
          text="Le site est hébergé sur [à définir]."
          reverse
        />
      </Stack>

      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
