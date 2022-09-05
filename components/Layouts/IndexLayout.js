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
    <Stack>
      <Stack ref={topRef} />
      <Navbar />

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
        refForScroll={refsForScroll.portfolio}
      />

      {/* SERVICES */}
      <ServicesSection refForScroll={refsForScroll.portfolio} />

      <DotSeparator />

      {/* CONTACT Section */}
      <ContactSection />

      <ScrollToTopBtn refForScroll={topRef} />

      <Footer />
    </Stack>
  )
}
