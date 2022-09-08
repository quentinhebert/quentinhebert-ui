import { useRef } from "react"
import { Box, Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"

export default function WebsitesIndexHero(props) {
  const { refForScroll } = props

  const topRef = useRef()
  const categoriesRef = useRef()
  const refsForScroll = {
    portfolio: categoriesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const md = useMediaQuery((theme) => theme.breakpoints.down("md"))

  return (
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        backgroundImage: "url(/medias/folds-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "400px",
        height: { xs: "50vh", md: "100vh" },
        maxHeight: "900px",
        alignItems: "end",
      }}
    >
      <Slide direction="left" {...{ timeout: 1000 }} in>
        <Typography
          variant="h1"
          color="secondary"
          fontFamily="Zacbel X"
          sx={{
            textAlign: "right",
            fontSize: {
              xs: "3rem",
              sm: "5.5rem",
              md: "8.5rem",
              lg: "10.5rem",
              xl: "15rem",
            },
            lineHeight: {
              xs: "3.5rem",
              sm: "6rem",
              md: "7rem",
              lg: "10rem",
              xl: "13rem",
            },
            position: "absolute",
            zIndex: 0,
            padding: {
              xs: "7rem 1.5rem 0 1rem",
              sm: "7rem 1.5rem 0 1rem",
              md: "7rem 1.5rem 0 5rem",
            },
          }}
        >
          Developpeur
          <br />
          Freelance
        </Typography>
      </Slide>

      <Slide
        direction="right"
        {...(true ? { timeout: 1000 } : {})}
        in
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            backgroundImage: "url(/medias/developper-alpha.png)",
            backgroundSize: {
              xs: "200%",
              sm: "150%",
              md: "200%",
              lg: "150%",
            },
            backgroundPosition: {
              xs: "30% -45%",
              sm: "30% 20% ",
              md: "30% 20%",
              lg: "30% 30%",
              xl: "0% 0%",
            },
            backgroundRepeat: "no-repeat",
            width: "100%",
            minHeight: "400px",
            height: { xs: "50vh", md: "100vh" },
            maxHeight: "900px",
            zIndex: 1,
          }}
        />
      </Slide>

      {!md ? (
        <Stack
          zIndex={10}
          justifyContent="end"
          alignItems="center"
          sx={{
            width: "100%",
            minHeight: "400px",
            height: { xs: "50vh", md: "100vh" },
          }}
        >
          <BouncingArrow
            text=""
            scrollTo={scrollTo}
            refForScroll={refForScroll}
          />
        </Stack>
      ) : null}
    </Stack>
  )
}
