import { useRef } from "react"
import FixedBackground from "../Backgrounds/fixed-background"
import HeroSection from "../Sections/Websites/Index/hero-section"
import WhyADevSection from "../Sections/Websites/Index/WhyADev/why-a-dev-section"
import PortfolioSection from "../Sections/Websites/Index/portfolio-section"
import ContactSection from "../Sections/ReusableSections/contact-section"

import { ParallaxProvider } from "react-scroll-parallax"
import ContactCTA from "../Sections/contact-cta"

export default function WebsitesIndexLayout(props) {
  const {} = props

  const whyADevRef = useRef()
  const focusRef = useRef()
  const portfolioRef = useRef()
  const contactRef = useRef()
  const refsForScroll = {
    whyADev: whyADevRef,
    focus: focusRef,
    portfolio: portfolioRef,
    contact: contactRef,
  }

  return (
    <ParallaxProvider>
      {/* HERO */}
      <HeroSection refsForScroll={refsForScroll} />

      <ContactCTA
        refsForScroll={refsForScroll}
        src="https://resourceboy.com/wp-content/uploads/2021/10/two-notebook-devices-in-the-dark-mockup.jpg"
        catchPhrase="Créons votre site web professionnel sur-mesure."
        background="#0a0a0a"
      />

      {/* PORTFOLIO */}
      <PortfolioSection topRef={refsForScroll.portfolio} />

      {/* <WebsiteFocusPart refsForScroll={refsForScroll} /> */}

      {/* WHY A DEV */}
      <WhyADevSection topRef={refsForScroll.whyADev} />

      <ContactSection defaultService="website" topRef={refsForScroll.contact} />
    </ParallaxProvider>
  )
}
