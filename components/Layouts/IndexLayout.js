import React, { useRef } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import CommercialBand from "../sections/commercial-band"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import theme from "../../config/theme"
import IndexHeroScreen from "../sections/index-hero-screen"
import PortfolioOptions from "./portfolio-options"
import ContactSection from "../sections/contact-section"

export default function IndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const categoriesRef = useRef()
  const refsForScroll = {
    portfolio: categoriesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <>
      <Stack ref={topRef} />
      <Navbar bgColor="transparent" />
      <IndexHeroScreen
        scrollTo={scrollTo}
        refForScroll={refsForScroll.portfolio}
      />
      {/* CATEGORIES */}
      <Stack ref={categoriesRef} sx={{ scrollMarginTop: "90px" }} />
      {/* <Stack ref={categoriesRef} /> */}
      <PortfolioOptions />

      {/* REFERENCES */}
      {/* <References /> */}

      {/* COMMERCIAL CTA */}
      <CommercialBand
        btnColor={theme.palette.background.secondary}
        bgImg="/medias/testing.jpg"
        href="/about"
      />

      <ContactSection />

      <ScrollToTopBtn refForScroll={topRef} />

      <Footer />
    </>
  )
}
