import React, { useRef } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import ParallaxLanding from "../Sections/parallax-landing"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import IndexHeroScreen from "../Sections/index-hero-screen"
import PortfolioOptions from "./portfolio-options"
import ContactSection from "../Sections/contact-section"
import ServicesSection from "../Sections/services-section"
import DotSeparator from "../Other/dot-separator"
import theme from "../../config/theme"

export default function IndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const portfolioRef = useRef()
  const refsForScroll = {
    portfolio: portfolioRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Stack
      sx={{
        background: (theme) =>
          `linear-gradient(-60deg, #000 20%, #080c11 100%)`,
      }}
    >
      <Stack ref={topRef} />
      <Navbar />

      {/* HERO */}
      <IndexHeroScreen
        scrollTo={scrollTo}
        refForScroll={refsForScroll.portfolio}
      />

      {/* DUAL PORTFOLIO – Landing Section */}
      {/* <PortfolioOptions refForScroll={refsForScroll.portfolio} /> */}
      <ServicesSection refForScroll={refsForScroll.portfolio} />

      {/* ABOUT ME – Landing Section */}
      {/* <ParallaxLanding
        btnColor={theme.palette.background.secondary}
        bgImg="/medias/homepage-background.jpg"
        href="/about"
      /> */}

      <DotSeparator />

      {/* CONTACT Section */}
      <ContactSection />

      <ScrollToTopBtn refForScroll={topRef} />

      <Footer />
    </Stack>
  )
}
