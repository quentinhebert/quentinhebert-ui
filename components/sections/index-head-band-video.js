import * as React from "react"
import { Box, Stack, useMediaQuery } from "@mui/material"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import theme from "../../config/theme"
import BouncingArrow from "../Navigation/BouncingArrow"

export default function IndexHeadBandVideo(props) {
  const { videoId, scrollTo, refForScroll } = props

  const [showScrollToTopBtn, setShowScrollToTopBtn] = React.useState(false)

  // SCROLL TO TOP
  useScrollPosition(({ prevPos, currPos }) => {
    if (prevPos.y > currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(true)
    } else if (prevPos.y < currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(false)
    }
  })

  // STYLE
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const landscape = useMediaQuery("@media (min-aspect-ratio: 16/9)")
  const portrait = useMediaQuery("@media (max-aspect-ratio: 16/9)")

  return (
    <Stack
      component="div"
      sx={{
        position: "relative",
        overflow: "hidden",
        objectFit: "cover",
        width: "100%",
        height: landscape ? "83vh" : "75vh",
        backgroundColor: "#000",
      }}
    >
      <Box
        sx={{
          background: 'url("../medias/layer.png") repeat scroll left top',
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 2,
        }}
      />
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0&muted=1&background=1`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay ; fullscreen"
        allowFullScreen
        style={{
          position: "absolute",
          width: portrait ? "250.78vh" : "100vw",
          height: landscape ? "56.25vw" : "120vh",
          zIndex: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(110%, 110%)",
          boxSizing: "border-box",
        }}
      />

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        height={landscape ? "83vh" : "75vh"}
      >
        <BouncingArrow
          text="See more"
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )
}
