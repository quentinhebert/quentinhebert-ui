import { Stack } from "@mui/material"
import React, { Component } from "react"
import Lottie from "react-lottie"
import animationData from "../../public/medias/animated-logo.json"
import GrainOverlay from "../../styles/GrainOverlay"
import MotionDivFadeInOnMount from "./motion-div-fade-in-on-mount"

class AnimatedLogoLayout extends Component {
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      renderer: "canvas",
    }
    return (
      <Stack
        className="flex flex-center"
        height="100svh"
        width="100vw"
        zIndex={100000000000}
        position="fixed"
        top={0}
        left={0}
        bgcolor="background.black"
      >
        {/* <GrainOverlay /> */}
        <Stack>
          <MotionDivFadeInOnMount>
            <Lottie options={defaultOptions} height={150} width={150} />
          </MotionDivFadeInOnMount>
        </Stack>
      </Stack>
    )
  }
}
export default AnimatedLogoLayout
