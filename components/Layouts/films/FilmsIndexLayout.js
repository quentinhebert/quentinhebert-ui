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
import FilmProjectSteps from "./FilmProjectSteps"

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

      {/* HERO screen */}
      <FilmsIndexHero refForScroll={refsForScroll.portfolio} />

      {/* PORTFOLIO */}
      <FilmsPortfolioPart refForScroll={refsForScroll.portfolio} />

      {/* INTRO */}
      <FilmsFocusPart refsForScroll={refsForScroll} />

      {/* EXPERIENCE */}
      {/* <FilmsExperiencePart /> */}

      {/* Self QUOTE */}
      {/* <FilmsQuoteParallax refForScroll={refsForScroll.quote} /> */}

      <FilmProjectSteps />

      <ContactSection defaultService="film" />

      {/* ScrollToTop */}
      <ScrollToTopBtn refForScroll={topRef} />

      {/* Footer */}
      <Footer />
    </>
  )
}
