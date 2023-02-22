import React, { useRef } from "react"
import HeroSection from "../Sections/Films/Index/hero-section"
import PortfolioSection from "../Sections/Films/Index/Portfolio/portfolio-section"
import FocusSection from "../Sections/Films/Index/focus-section"
import ContactSection from "../Sections/ReusableSections/contact-section"
import ParallaxGaleryCTA from "../Sections/parallax-galery-cta"

export default function FilmsIndexLayout(props) {
  const {} = props

  const focusRef = useRef()
  const portfolioRef = useRef()
  const contactRef = useRef()
  const ctaRef = useRef()
  const refsForScroll = {
    focus: focusRef,
    cta: ctaRef,
    portfolio: portfolioRef,
    contact: contactRef,
  }

  return (
    <>
      {/* HERO */}
      <HeroSection refForScroll={refsForScroll.cta} />

      <ParallaxGaleryCTA
        topRef={refsForScroll.cta}
        refForScroll={refsForScroll.contact}
      />

      {/* PORTFOLIO */}
      <PortfolioSection refForScroll={refsForScroll.portfolio} />

      {/* INTRO */}
      <FocusSection refsForScroll={refsForScroll} />

      {/* <FilmProjectSteps /> */}

      <ContactSection topRef={refsForScroll.contact} defaultService="film" />
    </>
  )
}
