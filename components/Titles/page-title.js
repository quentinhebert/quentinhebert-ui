import { Typography } from "@mui/material"
import MotionDivOnMount from "../Animation/motion-div-on-mount"
import { fadeVariant } from "../Animation/variants"

export default function PageTitle(props) {
  const { text, fontFamily, textAlign } = props

  return (
    <MotionDivOnMount visible={fadeVariant.visible} hidden={fadeVariant.hidden}>
      <Typography
        variant="h1"
        fontFamily={fontFamily || "POPFINE"}
        fontWeight="bold"
        textAlign={textAlign || "left"}
        color="secondary"
        {...props}
      >
        {text}
      </Typography>
    </MotionDivOnMount>
  )
}
