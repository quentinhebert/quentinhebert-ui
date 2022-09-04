import * as React from "react"
import { Box, Button } from "@mui/material"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import theme from "../../config/theme"

export default function HeadBand(props) {
  const {
    bgImg,
    mainText,
    buttonText,
    buttonUrl,
    scrollTo,
    refForScroll,
    bgPositionY,
  } = props

  const [showScrollToTopBtn, setShowScrollToTopBtn] = React.useState(false)
  useScrollPosition(({ prevPos, currPos }) => {
    if (prevPos.y > currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(true)
    } else if (prevPos.y < currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(false)
    }
  })
  const md = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Stack
      height="50vh"
      component="div"
      sx={{
        backgroundImage: bgImg,
        backgroundSize: "cover",
        backgroundPosition: `50% ${bgPositionY ? `${bgPositionY}%` : "70%"}`,
      }}
    >
      <Stack
        component="div"
        width="100%"
        height="50vh"
        backgroundColor="rgb(0,0,0,0.6)"
        position="absolute"
      />
      <Stack
        zIndex={10}
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography
          color="#fff"
          textTransform="uppercase"
          fontFamily="Helmet"
          lineHeight="2rem"
          letterSpacing="2px"
          fontSize={md ? "1.5rem" : "2rem"}
          padding="1rem"
        >
          {mainText}
        </Typography>
        <Button
          onClick={(e) => scrollTo(refForScroll)}
          // href={buttonUrl || "#"}
          sx={{
            padding: ".5rem 1rem",
            margin: "1rem auto",
            backgroundColor: "#fff",
            color: "#000",
            letterSpacing: "1px",
            "&:hover": { color: "#fff", backgroundColor: "rgb(0,0,0,0.6)" },
          }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  )
}
