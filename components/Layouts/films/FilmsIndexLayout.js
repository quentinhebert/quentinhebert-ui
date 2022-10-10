import React, { useRef } from "react"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import FilmsIndexHero from "./FilmsIndexHero"
import FilmsFocusPart from "./FilmsFocusPart"
import FilmsPortfolioPart from "./FilmsPortfolioPart"
import ContactSection from "../../Sections/contact-section"
import FilmProjectSteps from "./FilmProjectSteps"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"

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

      <FilmProjectSteps />

      <ContactSection defaultService="film" />

      {/* ScrollToTop */}
      <ScrollToTopBtn refForScroll={topRef} />
    </>
  )
}
