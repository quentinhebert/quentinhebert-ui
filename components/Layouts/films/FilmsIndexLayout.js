import React, { useRef } from "react"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import { Box, Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import theme from "../../../config/theme"
import FilmsIndexHero from "./FilmsIndexHero"
import FilmsFocusPart from "./FilmsFocusPart"
import FilmsExperiencePart from "./FilmsExperiencePart"
import FilmsQuoteParallax from "./FilmsQuoteParallax"
import FilmsPortfolioPart from "./FilmsPortfolioPart"
import ContactSection from "../../Sections/contact-section"

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

  const expNbYears = new Date().getFullYear() - 2011 // J'ai réalisé mes premiers clips de musique en 5ème (collège) à l'âge de 13 ans

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={topRef} />

      {/* NAVBAR */}
      <Navbar bgColor="transparent" />

      {/* HERO screen */}
      <FilmsIndexHero refForScroll={refsForScroll.focus} />

      {/* INTRO */}
      <FilmsFocusPart refsForScroll={refsForScroll} />

      <FilmsPortfolioPart refForScroll={refsForScroll.portfolio} />

      {/* Self QUOTE */}
      <FilmsQuoteParallax refForScroll={refsForScroll.quote} />

      {/* EXPERIENCE */}
      <FilmsExperiencePart />

      <ContactSection />

      {/* ScrollToTop */}
      <ScrollToTopBtn refForScroll={topRef} />

      {/* Footer */}
      <Footer />
    </>
  )
}
