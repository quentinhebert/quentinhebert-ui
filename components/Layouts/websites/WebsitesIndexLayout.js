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
      <Stack
        position="fixed"
        width="100%"
        height="100vh"
        zIndex={0}
        sx={{
          // background: (theme) => theme.palette.background.secondary,
          background: (theme) =>
            `url(/medias/code.svg), radial-gradient(#101419 10%, #000 60%)`,
          // backgroundImage: "url(/medias/lines.jpg)",
          backgroundSize: "cover",
        }}
      />

      <WebsitesIndexHero refsForScroll={refsForScroll} />

      <WebsitesWhyADevPart topRef={refsForScroll.whyADev} />

      <WebsitesPortfolio topRef={refsForScroll.portfolio} />

      {/* <WebsiteFocusPart refsForScroll={refsForScroll} /> */}

      <ContactSection defaultService="website" />

      <ScrollToTopBtn refForScroll={refsForScroll.top} />
    </>
  )
}
