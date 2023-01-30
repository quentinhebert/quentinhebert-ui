import React, { useRef } from "react"
import { Stack } from "@mui/material"
import HeroSection from "../Sections/Homepage/hero-section"
import WelcomeSection from "../Sections/Homepage/welcome-section"
import ServicesSection from "../Sections/Homepage/services-section"
import ReferencesSection from "../Sections/Homepage/references-section"
import { ParallaxProvider } from "react-scroll-parallax"

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

        {/* SERVICES */}
        <ServicesSection refForScroll={refsForScroll.services} />

        {/* REFERENCES */}
        <ReferencesSection />
      </Stack>
    </ParallaxProvider>
  )
}
