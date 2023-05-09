import { Box, Stack, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import Lottie from "react-lottie"
import animationData from "../../public/medias/scrollDown.json"
import animatedArrow from "../../public/medias/arrowDown.json"
import MotionDivFadeInOnMount from "./motion-div-fade-in-on-mount"
import { replaceColor } from "lottie-colorify"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"

function AnimatedScrollDownBtn({ refForScroll, scrollTo }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: replaceColor("#000000", "#FFFFFF", animationData),
  }

  const [width, setWidth] = useState("0%")
  useEffect(() => {
    setTimeout(() => setWidth("100%"), 2000)
    setTimeout(() => setWidth("0%"), 5000)
  }, [])

  const { lang } = useContext(AppContext)

  return (
    <Stack
      id="container"
      className="row relative flex-center pointer"
      display="inline"
      sx={{
        "&:hover": {
          "& .MuiBox-root": {
            width: "100% !important",
          },
        },
      }}
      onClick={() => scrollTo(refForScroll)}
    >
      <Stack>
        <MotionDivFadeInOnMount>
          <Lottie
            options={defaultOptions}
            height={30}
            width={30}
            isClickToPauseDisabled
          />
        </MotionDivFadeInOnMount>
      </Stack>
      <Box
        className="row flex"
        overflow="hidden"
        whiteSpace="nowrap"
        sx={{
          alignItems: "center",
          transition: "width .75s ease-in-out",
          width,
        }}
      >
        <AnimatedScrollDownArrow />
        <Typography
          className="cool-button"
          sx={{
            color: "#fff",
            "&:hover": { color: (theme) => theme.palette.secondary.main },
          }}
        >
          {translations.scrollDown[lang]}
        </Typography>
      </Box>
    </Stack>
  )
}

function AnimatedScrollDownArrow() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: replaceColor("#000000", "#FFFFFF", animatedArrow),
  }
  return (
    <Stack id="container" className="row relative flex-center">
      <MotionDivFadeInOnMount>
        <Lottie
          options={defaultOptions}
          height={30}
          width={30}
          isClickToPauseDisabled
        />
      </MotionDivFadeInOnMount>
    </Stack>
  )
}
export default AnimatedScrollDownBtn
