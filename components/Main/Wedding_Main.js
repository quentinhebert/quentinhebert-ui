import React, { useRef } from "react"
import ContactSection from "../Sections/ReusableSections/contact-section"
import HeroSection from "../Sections/Wedding/hero-section"
import PortfolioSection from "../Sections/Wedding/Portfolio/portfolio-section"
import PricingSection from "../Sections/Wedding/Pricing/pricing-section"

export default function WeddingIndexLayout(props) {
  const {} = props

  const pricingRef = useRef()
  const portfolioRef = useRef()
  const contactRef = useRef()
  const refsForScroll = {
    pricing: pricingRef,
    portfolio: portfolioRef,
    contact: contactRef,
  }

  return (
    <>
      {/* HERO */}
      <HeroSection refForScroll={refsForScroll.portfolio} />

      {/* PORTFOLIO */}
      <PortfolioSection refForScroll={refsForScroll.portfolio} />

      {/* PRICING */}
      <PricingSection refForScroll={refsForScroll.pricing} />

      <ContactSection
        topRef={refsForScroll.contact}
        defaultService="film"
        showServicesBoxes={false}
      />
    </>
  )
}
