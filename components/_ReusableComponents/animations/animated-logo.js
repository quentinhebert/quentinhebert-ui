import { Stack } from "@mui/material"
import React, { Component } from "react"
import Lottie from "react-lottie"
import animationData from "../../../public/medias/animated-logo.json"
import MotionDivFadeInOnMount from "./motion-div-fade-in-on-mount"

class AnimatedLogoLayout extends Component {
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      renderer: "svg",
    }
    return (
      <Stack className="flex flex-center" height="100vh">
        <Stack>
          <MotionDivFadeInOnMount>
            <Lottie options={defaultOptions} height={200} width={200} />
          </MotionDivFadeInOnMount>
        </Stack>
      </Stack>
    )
  }
}
export default AnimatedLogoLayout
