import { useEffect, useRef, useState } from "react"
import { Box, Stack } from "@mui/material"
import HeroSection from "../Sections/Homepage/hero-section"
import WelcomeSection from "../Sections/Homepage/welcome-section"
import ServicesSection from "../Sections/Homepage/services-section"
import ReferencesSection from "../Sections/Homepage/references-section"
import { ParallaxProvider } from "react-scroll-parallax"
import YoutubePlayer from "../VideoPlayers/youtube-player"

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

        {/* INTRODUCTION */}
        <WelcomeSection
          scrollTo={scrollTo}
          topRef={refsForScroll.welcome}
          refForScroll={refsForScroll.services}
        />

        <Stack
          sx={{
            width: { xs: "90%", lg: "65%" },
            position: "relative",
            margin: { xs: "8rem auto", md: "10rem auto" },
            boxShadow: (theme) =>
              `0 0 80px 5px ${theme.palette.background.secondary}`,
            borderRadius: "3vw",
            padding: "0.5vw 0",
            overflow: "hidden",
          }}
        >
          {render ? (
            <YoutubePlayer
              disableAutoplay
              videoId={"RrET8DITfKU"}
              bgColor={(theme) => theme.palette.background.main}
            />
          ) : null}
        </Stack>

        {/* SERVICES */}
        <ServicesSection refForScroll={refsForScroll.services} />

        {/* REFERENCES */}
        <ReferencesSection />
      </Stack>
    </ParallaxProvider>
  )
}
