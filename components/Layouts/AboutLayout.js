import React, { useRef } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import theme from "../../config/theme"
import BicolorTitle from "../ReusableComponents/titles/bicolor-title"
import VimeoPlayer from "../Sections/vimeo-player"
import References from "../Layouts/references/references"
import { Parallax } from "react-parallax"
import BouncingArrow from "../Navigation/BouncingArrow"

const presentation = `
  I am Mathias, self-taught filmmaker. At the age of 15 I picked up my first camera. Sports teacher by education, filmmaker out of passion.

  A job in which I can use all my creativity and visualize my different view on the world. That unique view, is something you will certainly recognize in my footage. My work is filled with lots of sentiment, sensational, and fast moving images, while keeping a panoramic overview using drone shots.

  In the meantime I have followed an extra training as "fulltime filmmaker" from well-known and top videographer Parker Wellbeck.
  I am mainly involved in Events/Nightlife, Commercials, Weddings, Sports and Real Estate. But I won't go aside for another challenge.
`

export default function AboutLayout(props) {
  const {} = props

  const topRef = useRef()
  const VideoRef = useRef()
  const introVideoRef = useRef()
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  return (
    <>
      <Stack ref={topRef} />
      <Navbar />

      <Stack ref={introVideoRef} />
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
      >
        <Parallax
          bgImage={
            !isMobileOrTablet
              ? "medias/bnw-face.png"
              : "medias/bnw-face-mobile.png"
          }
          bgImageAlt="Portrait."
          strength={200}
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            zIndex={3}
            textAlign="center"
            padding={5}
          >
            <Typography
              variant="h4"
              color={"#fff"}
              sx={{ fontStyle: "italic" }}
            >
              Nice to meet you,
            </Typography>
            <Typography
              color={"#fff"}
              fontFamily="Arial"
              letterSpacing="2px"
              textAlign="center"
              sx={{
                whiteSpace: "pre-line",
                maxWidth: "600px",
                lineHeight: "2rem",
              }}
            >
              {presentation}
            </Typography>
          </Stack>
          <BouncingArrow
            text="See more"
            scrollTo={scrollTo}
            refForScroll={VideoRef}
          />
        </Parallax>
        <Stack ref={VideoRef} />
      </Stack>
      <BicolorTitle
        secondaryText="Watch one of"
        secondaryColor="#000"
        mainText="my first videos"
        mainColor={theme.palette.text.light}
        bgColor={theme.palette.secondary.main}
        padding="2rem"
      />
      <Stack
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}
        padding="0 0 4rem 0"
      >
        <Stack width="70%">
          <VimeoPlayer
            videoId={"712068421"}
            bgColor={theme.palette.secondary.main}
          />
        </Stack>
      </Stack>

      <References />

      <ScrollToTopBtn refForScroll={topRef} />
      <Footer />
    </>
  )
}
