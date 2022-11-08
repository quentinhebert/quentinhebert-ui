import React, { useRef } from "react"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import HeroSection from "../Sections/Films/Index/hero-section"
import PortfolioSection from "../Sections/Films/Index/Portfolio/portfolio-section"
import FocusSection from "../Sections/Films/Index/focus-section"
import ContactSection from "../Sections/ReusableSections/contact-section"

export default function FilmsIndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const quoteRef = useRef()
  const focusRef = useRef()
  const portfolioRef = useRef()
  const refsForScroll = {
    focus: focusRef,
    quote: quoteRef,
    portfolio: portfolioRef,
  }

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={topRef} />

      {/* HERO */}
      <HeroSection refForScroll={refsForScroll.portfolio} />

      {/* PORTFOLIO */}
      <PortfolioSection refForScroll={refsForScroll.portfolio} />

      {/* INTRO */}
      <FocusSection refsForScroll={refsForScroll} />

      {/* <FilmProjectSteps /> */}

      <ContactSection defaultService="film" />

      {/* ScrollToTop */}
      <ScrollToTopBtn refForScroll={topRef} />
    </>
  )
}
