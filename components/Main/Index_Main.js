import React, { useRef } from "react"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import HeroSection from "../Sections/Homepage/hero-section"
import WelcomeSection from "../Sections/Homepage/welcome-section"
import ServicesSection from "../Sections/Homepage/services-section"
import ReferencesSection from "../Sections/Homepage/references-section"
import FixedBackground from "../Backgrounds/fixed-background"

export default function Index_Main(props) {
  const {} = props

  const topRef = useRef()
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
    <Stack flexGrow={1}>
      <Stack ref={topRef} />

      {/* Fixed Background for the page */}
      <FixedBackground background="linear-gradient(180deg, #000, rgb(0,0,0,0.5)), url(/medias/lines.jpg)" />

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

      <ScrollToTopBtn refForScroll={topRef} />
    </Stack>
  )
}
