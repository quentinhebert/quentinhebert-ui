import { useContext, useRef } from "react"
import HeroSection from "../Sections/Websites/Index/hero-section"
import WhyADevSection from "../Sections/Websites/Index/WhyADev/why-a-dev-section"
import PortfolioSection from "../Sections/Websites/Index/portfolio-section"
import ContactSection from "../Sections/ReusableSections/contact-section"

import { ParallaxProvider } from "react-scroll-parallax"
import CTACard from "../Sections/cta-card"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"

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

  const { lang } = useContext(AppContext)

  return (
    <ParallaxProvider>
      {/* HERO */}
      <HeroSection refsForScroll={refsForScroll} />

      <CTACard
        refsForScroll={refsForScroll}
        src="/medias/mockup.jpg"
        smallText={translations.websites.CTA.topLine[lang]}
        catchPhrase={translations.websites.CTA.title[lang]}
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
