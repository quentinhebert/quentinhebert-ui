import { useRef } from "react"
import { Stack } from "@mui/material"
import HeroSection from "../Sections/Homepage/hero-section"
import WelcomeSection from "../Sections/Homepage/welcome-section"
import ServicesSection from "../Sections/Homepage/services-section"
import ReferencesSection from "../Sections/Homepage/references-section"
import { ParallaxProvider } from "react-scroll-parallax"
import IntroductionVideoSection from "../Sections/Homepage/introduction-video-section"
import QandALandingCTA from "../Sections/QandA/landing-CTA"

export default function Index_Main(props) {
  const {} = props

  const welcomeRef = useRef()
  const videoRef = useRef()
  const servicesRef = useRef()
  const refsForScroll = {
    video: videoRef,
    welcome: welcomeRef,
    services: servicesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <ParallaxProvider>
      <Stack flexGrow={1}>
        {/* HERO */}
        <HeroSection scrollTo={scrollTo} refForScroll={refsForScroll.video} />

        {/* INTRODUCTION VIDEO  */}
        <IntroductionVideoSection topRef={refsForScroll.video} />

        {/* WELCOME SECTION */}
        <WelcomeSection
          scrollTo={scrollTo}
          topRef={refsForScroll.welcome}
          refForScroll={refsForScroll.services}
        />

        {/* SERVICES */}
        <ServicesSection refForScroll={refsForScroll.services} />

        {/* LANDING CTA QUESTIONS AND ANSWERS */}
        <QandALandingCTA />

        {/* REFERENCES */}
        <ReferencesSection />
      </Stack>
    </ParallaxProvider>
  )
}
