import React, { useEffect, useRef, useState } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import CommercialBand from "../sections/commercial-band"
import Categories from "./categories.js"
import { Stack } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import theme from "../../config/theme"
import References from "./references/references"
import IndexHeadBandVideo from "../sections/index-head-band-video"

export default function FilmmakingIndexLayout(props) {
  const {} = props

  const topRef = useRef()
  const categoriesRef = useRef()
  const refsForScroll = {
    portfolio: categoriesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <>
      <Stack ref={topRef} />
      <Navbar />
      <IndexHeadBandVideo
        videoId={"709683417"}
        bgPositionY={19}
        buttonUrl="#"
        scrollTo={scrollTo}
        refForScroll={refsForScroll.portfolio}
      />
      {/* CATEGORIES */}
      <Stack ref={categoriesRef} sx={{ scrollMarginTop: "50px" }} />
      <Categories />

      {/* COMMERCIAL CTA */}
      <CommercialBand
        btnColor={theme.palette.background.secondary}
        bgImg="/medias/home-parallax.jpg"
        href="/contact"
      />

      {/* REFERENCES */}
      <References />

      <ScrollToTopBtn refForScroll={topRef} />

      <Footer />
    </>
  )
}
