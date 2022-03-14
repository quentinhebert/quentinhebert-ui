import * as React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";
import { Parallax } from "react-parallax";
import img from "../../public/medias/film-home-parallax.jpg";

const Container = ({ btnColor, bgImg }) => {
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={bgImg}
      bgImageAlt="Quentin sur un tournage, au cadrage."
      bgImageSize={100}
      strength={400}
      style={{ width: "100%", padding: 0, margin: 0 }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="400px"
        zIndex={3}
        textAlign="center"
      >
        <Box
          component="div"
          height="100%"
          width="100%"
          position="absolute"
          backgroundColor="rgb(0,0,0,0.5)"
          zIndex={1}
        />
        <Typography
          color="#fff"
          fontSize="2rem"
          textTransform="uppercase"
          letterSpacing="5px"
          margin="1rem auto"
          zIndex={4}
        >
          Besoin de discuter de votre projet ?
        </Typography>
        <Button
          sx={{
            backgroundColor: btnColor,
            color: "#fff",
            padding: ".5rem 1.5rem",
            zIndex: 4,
            "&:hover": { color: "#fff", backgroundColor: "rgb(0,0,0,0.5)" },
          }}
        >
          <Typography
            color="#fff"
            fontSize="0.875rem"
            textTransform="uppercase"
            letterSpacing="3px"
          >
            Contactez-moi
          </Typography>
        </Button>
      </Stack>
    </Parallax>
  );
};

export default function GearBand(props) {
  const { btnColor, bgImg } = props;
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
    >
      <Container btnColor={btnColor} bgImg={bgImg} />
    </Stack>
  );
}
