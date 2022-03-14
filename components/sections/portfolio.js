import * as React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";
import { Parallax } from "react-parallax";
import img from "../../public/medias/film-home-parallax.jpg";
import TwoRowSquareGallery from "./two-row-square-gallery";
import photo1 from "../../public/medias/portfolio-covers/clip.png";
import photo2 from "../../public/medias/portfolio-covers/mode.png";
import photo3 from "../../public/medias/portfolio-covers/court-metrage.png";
import photo4 from "../../public/medias/portfolio-covers/event.png";
import photo5 from "../../public/medias/portfolio-covers/company.png";
import photo6 from "../../public/medias/portfolio-covers/association.png";
import BicolorTitleBand from "./bicolor-title-band";

const images = [
  {
    image: photo1,
    domain: "Clips",
    jobs: "Clips musicaux - Aftermovies",
    url: "/film",
    alt: "",
  },
  {
    image: photo2,
    domain: "Mode",
    jobs: ["Défilés - Shootings - Cérémonies - Backstages"],
    url: "/dev",
    alt: "",
  },
  {
    image: photo4,
    domain: "Évènements",
    jobs: ["Mariages - Baptêmes - EVG & EVJF – Couverture"],
    url: "/dev",
    alt: "",
  },
  {
    image: photo3,
    domain: "Courts-métrages",
    jobs: ["Fiction - Sensibilisation - Parodies "],
    url: "/dev",
    alt: "",
  },
  {
    image: photo5,
    domain: "Entreprises",
    jobs: [
      "Publicités - Films d'entreprise - Formations - Interviews - Immobilier ",
    ],
    url: "/dev",
    alt: "",
  },
  {
    image: photo6,
    domain: "Associations",
    jobs: ["Films d'étudiants - Formations - Couverture "],
    url: "/dev",
    alt: "",
  },
];

export default function Portfolio(props) {
  const {} = props;
  return (
    <>
      <BicolorTitleBand
        mainText="mes réalisations"
        mainColor="#87181f"
        secondaryText="Découvrez"
        secondaryColor="#000"
        bgColor="#fff"
      />
      <TwoRowSquareGallery images={images} />
    </>
  );
}
