import { useRef } from "react"
import { Stack } from "@mui/material"
import FixedBackground from "../Backgrounds/fixed-background"
import HeroSection from "../Sections/Websites/Index/hero-section"
import WhyADevSection from "../Sections/Websites/Index/WhyADev/why-a-dev-section"
import PortfolioSection from "../Sections/Websites/Index/portfolio-section"
import ContactSection from "../Sections/ReusableSections/contact-section"
import ScrollToTopBtn from "../Navigation/scroll-to-top"

export default function WebsitesIndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const whyADevRef = useRef()
  const focusRef = useRef()
  const portfolioRef = useRef()
  const refsForScroll = {
    top: topRef,
    whyADev: whyADevRef,
    focus: focusRef,
    portfolio: portfolioRef,
  }

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refsForScroll.top} />

      {/* Fixed Background for the page */}
      <FixedBackground
        background={(theme) =>
          `url(/medias/code.svg), radial-gradient(${theme.palette.background.main} 0%, #000 50%)`
        }
      />

      {/* HERO */}
      <HeroSection refsForScroll={refsForScroll} />

      {/* WHY A DEV */}
      <WhyADevSection topRef={refsForScroll.whyADev} />

      {/* PORTFOLIO */}
      <PortfolioSection topRef={refsForScroll.portfolio} />

      {/* <WebsiteFocusPart refsForScroll={refsForScroll} /> */}

      <ContactSection defaultService="website" />

      <ScrollToTopBtn refForScroll={refsForScroll.top} />
    </>
  )
}
