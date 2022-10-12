import React, { useRef } from "react"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import IndexHeroScreen from "../Sections/index-hero-screen"
import ServicesSection from "../Sections/services-section"
import WelcomeSection from "../Sections/welcome-section"

export default function IndexLayout(props) {
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
      <Stack
        position="fixed"
        width="100%"
        height="100vh"
        zIndex={0}
        sx={{
          background:
            "linear-gradient(180deg, #000, rgb(0,0,0,0.5)), url(/medias/lines.jpg)",
          backgroundPosition: "25% 50%",
          backgroundSize: "cover",
        }}
      />

      {/* HERO */}
      <IndexHeroScreen
        scrollTo={scrollTo}
        refForScroll={refsForScroll.welcome}
      />

      <WelcomeSection
        scrollTo={scrollTo}
        topRef={refsForScroll.welcome}
        refForScroll={refsForScroll.services}
      />

      {/* SERVICES */}
      <ServicesSection refForScroll={refsForScroll.services} />

      {/* <DotSeparator /> */}

      {/* CONTACT Section */}
      {/* <ContactSection /> */}

      <ScrollToTopBtn refForScroll={topRef} />
    </Stack>
  )
}
