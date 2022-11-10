import React, { useRef } from "react"
import HeroSection from "../Sections/Films/Index/hero-section"
import PortfolioSection from "../Sections/Films/Index/Portfolio/portfolio-section"
import FocusSection from "../Sections/Films/Index/focus-section"
import ContactSection from "../Sections/ReusableSections/contact-section"

export default function FilmsIndexLayout(props) {
  const {} = props

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
      {/* HERO */}
      <HeroSection refForScroll={refsForScroll.portfolio} />

      {/* PORTFOLIO */}
      <PortfolioSection refForScroll={refsForScroll.portfolio} />

      {/* INTRO */}
      <FocusSection refsForScroll={refsForScroll} />

      {/* <FilmProjectSteps /> */}

      <ContactSection defaultService="film" />
    </>
  )
}
