import { useRef } from "react"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import WebsitesIndexHero from "./WebsitesIndexHero"
import ContactSection from "../../Sections/contact-section"
import WebsitesWhyADevPart from "./WebsitesWhyADevPart"
import WebsitesPortfolio from "./WebsitesPortfolio"

export default function WebsitesIndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const whyADevRef = useRef()
  const focusRef = useRef()
  const refsForScroll = {
    top: topRef,
    whyADev: whyADevRef,
    focus: focusRef,
  }

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refsForScroll.top} />

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

      <WebsitesIndexHero refForScroll={refsForScroll.whyADev} />

      <WebsitesWhyADevPart topRef={refsForScroll.whyADev} />

      <WebsitesPortfolio />

      {/* <WebsiteFocusPart refsForScroll={refsForScroll} /> */}

      <ContactSection defaultService="website" />

      <ScrollToTopBtn refForScroll={refsForScroll.top} />
    </>
  )
}
