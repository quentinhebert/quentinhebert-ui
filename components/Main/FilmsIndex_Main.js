import React, { useRef } from "react"
import HeroSection from "../Sections/Films/Index/hero-section"
import PortfolioSection from "../Sections/Films/Index/Portfolio/portfolio-section"
import FocusSection from "../Sections/Films/Index/focus-section"
import ContactSection from "../Sections/ReusableSections/contact-section"
import ContactCTA from "../Sections/contact-cta"

export default function FilmsIndexLayout(props) {
  const {} = props

  const quoteRef = useRef()
  const focusRef = useRef()
  const portfolioRef = useRef()
  const contactRef = useRef()
  const ctaRef = useRef()
  const refsForScroll = {
    focus: focusRef,
    // quote: quoteRef,
    cta: ctaRef,
    portfolio: portfolioRef,
    contact: contactRef,
  }

  return (
    <>
      {/* HERO */}
      <HeroSection refForScroll={refsForScroll.cta} />

      <ContactCTA
        refsForScroll={refsForScroll}
        src="/medias/sunset.png"
        catchPhrase="Ensemble, donnons vie à vos projets."
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
