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
          backgroundImage: "url(/medias/focus-film-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 10%",
          height: { xs: "600px", sm: "700px", md: "600px" },
        }}
      >
        <Slide direction="left" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="end">
            <Stack
              sx={{
                padding: { xs: "8rem 1rem 0 0", md: "2rem 4rem" },
                width: { xs: "70%", sm: "80%", md: "80%" },
              }}
            >
              <Typography
                variant="h1"
                fontFamily="Ethereal"
                fontWeight="bold"
                textAlign="right"
                color="secondary"
                sx={{
                  color: theme.palette.text.primaryLight,
                  fontSize: {
                    xs: "4rem",
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
                fontFamily="Ethereal"
                letterSpacing={2}
                textAlign="center"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                  lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                  alignSelf: "end",
                  color: theme.palette.text.primary,
                  marginTop: { xs: "3rem", md: 0 },
                  width: { xs: "100%", sm: "80%", md: "70%" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.text.primaryLight,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  }}
                >
                  <b>
                    <em>Passionné</em>
                  </b>
                </Box>{" "}
                depuis {expNbYears} années, j'ai fait de la vidéo mon métier car
                c'est grâce au son et à l'image que je parviens à m'exprimer
                avec le plus de{" "}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.text.primaryLight,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  }}
                >
                  <b>
                    <em>sincérité</em>
                  </b>
                </Box>
                .
                <p />
                J'ai appris en{" "}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.text.primaryLight,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  }}
                >
                  <b>
                    <em>autodidacte</em>
                  </b>
                </Box>
                , poussé par l'envie de créer.
              </Typography>

              <Stack
                sx={{
                  width: { xs: "100%", sm: "80%", md: "70%" },
                  alignSelf: "end",
                  marginTop: "2rem",
                }}
              >
                <Box sx={{ alignSelf: "center" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
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

        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Box
            sx={{
              backgroundImage: "url(/medias/filmmaker-shadow-alpha.png)",
              backgroundImage: "url(/medias/back-profile.png)",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              position: "absolute",
              width: { xs: "35%", md: "50%" },
              height: { xs: "600px", sm: "700px", md: "600px" },
              mixBlendMode: "multiply",
            }}
          />
        </Slide>
      </Stack>
    </>
  )
}
