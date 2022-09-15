import React, { useRef } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import IndexHeroScreen from "../Sections/index-hero-screen"
import ContactSection from "../Sections/contact-section"
import ServicesSection from "../Sections/services-section"
import DotSeparator from "../Other/dot-separator"
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
    <Stack>
      <Stack ref={topRef} />

      {/* Fixed Background for the page */}
      <Stack
        position="fixed"
        width="100%"
        height="100vh"
        zIndex={0}
        sx={{
          backgroundImage: "url(/medias/lines.jpg)",
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
