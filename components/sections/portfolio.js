import * as React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";
import { Parallax } from "react-parallax";
import img from "../../public/medias/film-home-parallax.jpg";
import TwoRowSquareGallery from "./two-row-square-gallery";
import photo1 from "../../public/medias/home-photo1.jpg";
import photo2 from "../../public/medias/home-photo2.jpg";
import BicolorTitleBand from "./bicolor-title-band";

const images = [
  {
    image: photo1,
    domain: "Clips",
    jobs: "Réalisateur Cadreur Monteur",
    url: "/film",
    alt: "",
    // icon: <VideocamIcon />,
  },
  {
    image: photo2,
    domain: "Mode",
    jobs: ["Développeur Full-Stack Front/Back JS"],
    url: "/dev",
    alt: "",
    // icon: <PersonalVideoIcon />,
  },
  {
    image: photo2,
    domain: "Courts-métrages",
    jobs: ["Développeur Full-Stack Front/Back JS"],
    url: "/dev",
    alt: "",
    // icon: <PersonalVideoIcon />,
  },
  {
    image: photo2,
    domain: "Évènements",
    jobs: ["Développeur Full-Stack Front/Back JS"],
    url: "/dev",
    alt: "",
    // icon: <PersonalVideoIcon />,
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
