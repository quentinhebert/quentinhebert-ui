import React, { useEffect, useRef, useState } from "react"
import { Box, Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import BouncingArrow from "../../Navigation/BouncingArrow"

export default function FilmsIndexHero(props) {
  const { refForScroll } = props

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }
  const md = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Stack
      sx={{
        backgroundImage: "url(/medias/circular-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "400px",
        height: { xs: "50vh", md: "100vh" },
      }}
    >
      <Slide
        direction="right"
        {...(true ? { timeout: 1000 } : {})}
        in
        mountOnEnter
        unmountOnExit
      >
        <Typography
          variant="h1"
          color="secondary"
          fontFamily="Ethereal"
          sx={{
            fontSize: {
              xs: "4.5rem",
              sm: "8rem",
              md: "11.5rem",
              lg: "15rem",
              xl: "19rem",
            },
            lineHeight: {
              xs: "4rem",
              sm: "8rem",
              md: "10rem",
              lg: "13rem",
              xl: "17rem",
            },
            position: "absolute",
            zIndex: 0,
            padding: {
              xs: "7rem 0 0 1rem",
              sm: "7rem 0 0 1rem",
              md: "7rem 0 0 5rem",
            },
          }}
        >
          Vidéaste
          <br />
          Freelance
        </Typography>
      </Slide>

      <Slide
        direction="left"
        {...(true ? { timeout: 1000 } : {})}
        in
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            backgroundImage: "url(/medias/filmmaker-alpha.png)",
            backgroundSize: { xs: "70%", sm: "50%", md: "70%", lg: "50%" },
            backgroundPosition: "100% 100%",
            backgroundRepeat: "no-repeat",
            width: "100%",
            minHeight: "400px",
            height: { xs: "50vh", md: "100vh" },
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
            minHeight: "400px",
            height: { xs: "50vh", md: "100vh" },
          }}
        >
          <BouncingArrow
            text="Découvrez mon univers"
            scrollTo={scrollTo}
            refForScroll={refForScroll}
          />
        </Stack>
      ) : null}
    </Stack>
  )
}
