import { useEffect, useRef, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import HeroSection from "../Sections/Homepage/hero-section"
import WelcomeSection from "../Sections/Homepage/welcome-section"
import ServicesSection from "../Sections/Homepage/services-section"
import ReferencesSection from "../Sections/Homepage/references-section"
import { ParallaxProvider } from "react-scroll-parallax"
import YoutubePlayer from "../VideoPlayers/youtube-player"
import Span from "../Text/span"

export default function Index_Main(props) {
  const {} = props

  const welcomeRef = useRef()
  const servicesRef = useRef()
  const refsForScroll = {
    welcome: welcomeRef,
    services: servicesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }
  const [render, setRender] = useState(false)
  useEffect(() => setRender(true), [])

  return (
    <ParallaxProvider>
      <Stack flexGrow={1}>
        {/* HERO */}
        <HeroSection scrollTo={scrollTo} refForScroll={refsForScroll.welcome} />

        <Stack
          sx={{
            width: "100%",
            gap: "2rem",
            margin: "10rem auto",
          }}
        >
          <Typography variant="h2" color="secondary" textAlign="center">
            Une{" "}
            <Span
              color="#FFF"
              sx={{
                textShadow: (theme) =>
                  `0 0 1rem ${theme.palette.secondary.main}`,
              }}
            >
              vidéo
            </Span>{" "}
            vaut mille mots...
          </Typography>

          <Stack
            sx={{
              width: { xs: "90%", lg: "65%" },
              position: "relative",
              margin: "auto",
            }}
          >
            <Stack
              sx={{
                background: "linear-gradient(180deg, #252525 0%, #171615 100%)",
                borderRadius: { xs: "15px", md: "20px" },
                padding: 0.25,
                width: "87%",
                alignSelf: "center",
              }}
            >
              <Stack
                sx={{
                  background: "#000",
                  borderRadius: { xs: "15px", md: "20px" },
                  padding: ".5rem 0rem 1rem",
                  overflow: "hidden",
                  transform: "translateZ(0)",
                }}
              >
                {render ? (
                  <YoutubePlayer
                    disableAutoplay
                    videoId={"wWpM97f-RHg"}
                    bgColor={(theme) => theme.palette.background.main}
                  />
                ) : null}
              </Stack>
            </Stack>
            <Box component="img" src="/medias/macbook-keyboard.png" mt={-0.5} />
          </Stack>
        </Stack>

        {/* INTRODUCTION */}
        <WelcomeSection
          scrollTo={scrollTo}
          topRef={refsForScroll.welcome}
          refForScroll={refsForScroll.services}
        />

        {/* SERVICES */}
        <ServicesSection refForScroll={refsForScroll.services} />

        {/* REFERENCES */}
        <ReferencesSection />
      </Stack>
    </ParallaxProvider>
  )
}
