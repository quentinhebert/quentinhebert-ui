import * as React from "react"
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { Parallax } from "react-parallax"
import theme from "../../../config/theme"

const Container = ({ btnColor, bgImg, href }) => {
  return (
    <Parallax
      bgImage={bgImg}
      bgImageAlt="Portrait en noir et blanc de Quentin."
      strength={200}
      style={{
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
        minHeight="300px"
        zIndex={3}
        sx={{ padding: { xs: "3rem 1.5rem", md: "4rem 10rem" } }}
      >
        <Stack
          sx={{
            border: `3px solid ${theme.palette.secondary.main}`,
            backgroundColor: "rgb(0,0,0,0.1)",
            padding: "1rem",
          }}
        >
          <Typography
            fontFamily="Ethereal"
            fontWeight="bold"
            lineHeight="3vw"
            textAlign="center"
            margin="2rem auto"
            sx={{
              color: "#fff",
              fontSize: { xs: "1rem", md: "1.5rem" },
              lineHeight: { xs: "1.5rem", md: 1.5 },
              letterSpacing: { xs: 1, md: 2 },
            }}
          >
            Depuis que le mouvement a rencontré la photographie, la vidéo n'a
            cessé d'envahir nos vies. C'est naturellement qu'elle s'est imposée
            comme medium le plus convaincant.
          </Typography>

          <Typography
            fontFamily="Arial"
            color="secondary"
            sx={{
              width: { xs: "100%", md: "70%" },
              fontSize: { xs: "1rem", md: "1.5rem" },
              lineHeight: { xs: "1.5rem", md: "1.75rem" },
              letterSpacing: { xs: 1, md: 2 },
              margin: { xs: "1rem 0.5rem", md: "2rem auto" },
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <em>"Une image vaut mieux que mille mots"</em>.
            </Box>
            <b>– Alors que dire de vingt-cinq images par secondes ?</b>
          </Typography>
        </Stack>
      </Stack>
    </Parallax>
  )
}

export default function FilmsQuoteParallax(props) {
  const { refForScroll, btnColor, href } = props
  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
      >
        <Container
          btnColor={btnColor}
          bgImg={"/medias/movement-parallax.jpg"}
          href={href}
        />
      </Stack>
    </>
  )
}
