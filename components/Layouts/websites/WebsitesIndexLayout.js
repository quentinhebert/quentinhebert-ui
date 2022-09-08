import { useRef } from "react"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import { Stack, useMediaQuery } from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import theme from "../../../config/theme"
import WebsitesIndexHero from "./WebsitesIndexHero"
import WebsiteFocusPart from "./WebsiteFocusPart"
import ContactSection from "../../Sections/contact-section"
import WebsitesWhyADevPart from "./WebsitesWhyADevPart"
import WebsitesPortfolio from "./WebsitesPortfolio"

export default function WebsitesIndexLayout(props) {
  const { refForScroll } = props

  const topRef = useRef()
  const whyADevRef = useRef()
  const focusRef = useRef()
  const refsForScroll = {
    top: topRef,
    whyADev: whyADevRef,
    focus: focusRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const md = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Navbar bgColor="transparent" />

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

      <Footer />
    </>
  )
}
