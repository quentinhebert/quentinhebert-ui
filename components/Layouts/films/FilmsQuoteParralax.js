import { Box, Stack, Typography } from "@mui/material"
import { Parallax } from "react-parallax"
import theme from "../../../config/theme"
import FlashingRedDot from "../../Navigation/FlashingRedDot"
import Timer from "../../sections/timer"

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
        sx={{
          padding: { xs: "3rem 1.5rem", md: "4rem 6rem" },
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
      >
        <Stack
          sx={{
            border: `2px solid ${theme.palette.secondary.main}`,
            backgroundColor: "rgb(0,0,0,0.1)",
            backgroundImage: "url(/medias/white-grid.png)",
            backgroundSize: "100% 100%",
            padding: "1rem",
          }}
        >
          <Stack alignItems="flex-start" flexDirection="row">
            <Stack width="34%" />
            <Stack alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  display: "flex",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgb(0,0,0,0.2)",
                }}
              >
                <Timer />
              </Box>
            </Stack>
            <Stack width="33%">
              <FlashingRedDot />
            </Stack>
          </Stack>
          <Typography
            fontFamily="Ethereal"
            fontWeight="bold"
            lineHeight="3vw"
            textAlign="center"
            sx={{
              color: "#fff",
              margin: { xs: "2rem auto", md: "6rem auto 3rem" },
              padding: "0 1rem",
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
              width: { xs: "100%", md: "90%", lg: "70%" },
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              letterSpacing: { xs: 0.25, sm: 1, md: 2 },
              lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
              margin: { xs: "1rem 0.5rem", md: "0rem auto 2rem" },
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
          // bgImg={"/medias/movement-parallax.jpg"}
          bgImg={"/medias/gif.gif"}
          href={href}
        />
      </Stack>
    </>
  )
}
