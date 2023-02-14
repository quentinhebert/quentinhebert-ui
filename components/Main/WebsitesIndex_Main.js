import { useRef } from "react"
import FixedBackground from "../Backgrounds/fixed-background"
import HeroSection from "../Sections/Websites/Index/hero-section"
import WhyADevSection from "../Sections/Websites/Index/WhyADev/why-a-dev-section"
import PortfolioSection from "../Sections/Websites/Index/portfolio-section"
import ContactSection from "../Sections/ReusableSections/contact-section"

import { ParallaxProvider } from "react-scroll-parallax"

export default function WebsitesIndexLayout(props) {
  const {} = props

  const whyADevRef = useRef()
  const focusRef = useRef()
  const portfolioRef = useRef()
  const refsForScroll = {
    whyADev: whyADevRef,
    focus: focusRef,
    portfolio: portfolioRef,
  }

  return (
    <ParallaxProvider>
      {/* HERO */}
      <HeroSection refsForScroll={refsForScroll} />

      {/* PORTFOLIO */}
      <PortfolioSection topRef={refsForScroll.portfolio} />

      {/* <WebsiteFocusPart refsForScroll={refsForScroll} /> */}

      {/* WHY A DEV */}
      <WhyADevSection topRef={refsForScroll.whyADev} />

      <ContactSection defaultService="website" />
    </ParallaxProvider>
  )
}
