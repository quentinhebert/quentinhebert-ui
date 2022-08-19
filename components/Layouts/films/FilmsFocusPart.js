import React, { useRef } from "react"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import {
  Box,
  Button,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import theme from "../../../config/theme"
import FilmsIndexHero from "./FilmsIndexHero"

export default function FilmsFocusPart(props) {
  const { refsForScroll } = props

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const expNbYears = new Date().getFullYear() - 2011 // J'ai réalisé mes premiers clips de musique en 5ème (collège) à l'âge de 13 ans

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refsForScroll.focus} />
      <Stack
        sx={{
          // backgroundImage: "url(/medias/fade-background.png)",
          //   backgroundImage: "url(/medias/test.svg)",
          backgroundImage: "url(/medias/1111.svg)",
          // backgroundImage: "url(/medias/4444.svg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 10%",
          height: "600px",
        }}
      >
        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="end">
            <Stack padding="4rem" width="80%">
              <Typography
                variant="h1"
                fontFamily="Ethereal"
                fontWeight="bold"
                textAlign="right"
                color="secondary"
                sx={{
                  color: "#2b5b8a",
                  fontSize: {
                    xs: "4.5rem",
                    sm: "13vw",
                  },
                  lineHeight: {
                    xs: "4rem",
                    sm: "8rem",
                    md: "10rem",
                    lg: "13rem",
                    xl: "17rem",
                  },
                  zIndex: 0,
                  padding: {
                    xs: "1.5rem 0 0 1rem",
                    sm: "1.5rem 0 0 1rem",
                    md: "1.5rem 0 0 5rem",
                  },
                }}
              >
                Focus .
              </Typography>
              <Typography
                fontFamily="Arial"
                letterSpacing={2}
                fontSize="1.25rem"
                lineHeight="1.75rem"
                // color="secondary"
                textAlign="center"
                sx={{
                  alignSelf: "end",
                  color: "#1B3957",
                  //   color: "#2b5b8a",
                  // color: "#FFF",
                  width: "70%",
                }}
              >
                <span
                  style={{
                    color: "#2b5b8a",
                    fontSize: "1.5rem",
                  }}
                >
                  <b>
                    <em>Passionné</em>
                  </b>
                </span>{" "}
                depuis {expNbYears} années, j'ai fait de la vidéo mon métier car
                c'est grâce au son et à l'image que je parviens à m'exprimer
                avec le plus de{" "}
                <span
                  style={{
                    color: "#2b5b8a",
                    fontSize: "1.5rem",
                  }}
                >
                  <b>
                    <em>sincérité</em>
                  </b>
                </span>
                .
                <p />
                J'ai appris en{" "}
                <span
                  style={{
                    color: "#2b5b8a",
                    fontSize: "1.5rem",
                  }}
                >
                  <b>
                    <em>autodidacte</em>
                  </b>
                </span>
                , poussé par l'envie de créer.
              </Typography>

              <Stack sx={{ width: "70%", alignSelf: "end", marginTop: "2rem" }}>
                <Box sx={{ alignSelf: "center" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      // textTransform: "initial",
                      fontSize: { xs: "1rem", md: "1.5vw" },
                      fontFamily: "Ethereal",
                      fontWeight: "bold",
                      letterSpacing: "1.5px",
                      border: `1px solid ${theme.palette.secondary.main}`,
                    }}
                    onClick={(e) => scrollTo(refsForScroll.portfolio)}
                  >
                    Voir mes réalisations
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Slide>

        <Box
          sx={{
            backgroundImage: "url(/medias/filmmaker-shadow-alpha.png)",
            backgroundImage: "url(/medias/back-profile.png)",
            backgroundSize: "cover",
            backgroundPosition: "0% 50%",
            position: "absolute",
            width: "50%",
            height: "600px",
            mixBlendMode: "multiply",
          }}
        />
      </Stack>
    </>
  )
}
