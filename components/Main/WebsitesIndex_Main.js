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
  const ctaRef = useRef()
  const refsForScroll = {
    cta: ctaRef,
    focus: focusRef,
    portfolio: portfolioRef,
    whyADev: whyADevRef,
    contact: contactRef,
  }

  return (
    <ParallaxProvider>
      {/* HERO */}
      <HeroSection refsForScroll={refsForScroll} />

      <ContactCTA
        refsForScroll={refsForScroll}
        src="/medias/mockup.jpg"
        smallText="Créons"
        catchPhrase="votre site web professionnel sur-mesure."
        background="#151210"
        BtnProps={{
          sx: {
            background: (theme) =>
              `linear-gradient(-78deg, ${theme.palette.secondary.main}, ${theme.palette.tersary.main})`,
          },
        }}
        CatchPhraseProps={{
          sx: {
            background: (theme) =>
              `-webkit-linear-gradient(-180deg, ${theme.palette.secondary.main} 0%, ${theme.palette.tersary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: ".5rem 1rem",
          },
        }}
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
