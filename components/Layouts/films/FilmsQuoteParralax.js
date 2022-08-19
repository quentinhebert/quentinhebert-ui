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
        padding="4rem 10rem"
        sx={
          {
            // background: "linear-gradient(290deg, #111a23 10%, transparent 100%)",
          }
        }
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
            letterSpacing={2}
            fontSize="2vw"
            lineHeight="3vw"
            textAlign="center"
            margin="2rem auto"
            sx={{ color: "#fff" }}
          >
            Depuis que le mouvement a rencontré la photographie, la vidéo n'a
            cessé d'envahir nos vies. C'est naturellement qu'elle s'est imposée
            comme medium le plus convaincant.
          </Typography>

          <Typography
            fontFamily="Arial"
            letterSpacing={2}
            fontSize="1.5vw"
            lineHeight="2vw"
            margin="2rem auto"
            color="secondary"
            sx={{
              width: "70%",
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
