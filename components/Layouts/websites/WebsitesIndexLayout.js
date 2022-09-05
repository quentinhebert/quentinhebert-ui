import { useRef } from "react"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import { useMediaQuery } from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import theme from "../../../config/theme"
import WebsitesIndexHero from "./WebsitesIndexHero"
import WebsiteFocusPart from "./WebsiteFocusPart"
import ContactSection from "../../Sections/contact-section"

export default function WebsitesIndexLayout(props) {
  const { refForScroll } = props

  const topRef = useRef()
  const focusRef = useRef()
  const refsForScroll = {
    top: topRef,
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

      <WebsitesIndexHero refForScroll={refsForScroll.focus} />

      <WebsiteFocusPart refsForScroll={refsForScroll} />

      <ContactSection defaultService="website" />

      <ScrollToTopBtn refForScroll={refsForScroll.top} />

      <Footer />
    </>
  )
}
