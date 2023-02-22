import { Stack, Typography } from "@mui/material"
import MotionDivOnMount from "../Animation/motion-div-on-mount"
import { fadeVariant, zoomInVariant } from "../Animation/variants"

export default function MediumTitle({ preventTransitionOut, ...props }) {
  const motionDivStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <MotionDivOnMount
      visible={fadeVariant.visible}
      hidden={fadeVariant.hidden}
      style={motionDivStyle}
    >
      <Typography
        variant="h2"
        color="secondary"
        zIndex={1}
        letterSpacing={1}
        sx={{
          fontSize: { xs: "12vw", sm: "9vw", md: "7vw" },
          lineHeight: props.lineHeight || {
            xs: "12vw",
            sm: "9w",
            md: "7vw",
          },
          padding: "0 .5rem",
        }}
        {...props}
      />
    </MotionDivOnMount>
  )
}
