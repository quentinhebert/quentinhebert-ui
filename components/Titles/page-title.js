import { Stack, Typography } from "@mui/material"
import MotionDivOnMount from "../Animation/motion-div-on-mount"
import { fadeVariant } from "../Animation/variants"

export default function PageTitle(props) {
  const { text, fontFamily, textAlign } = props

  return (
    <MotionDivOnMount visible={fadeVariant.visible} hidden={fadeVariant.hidden}>
      <Stack textAlign={textAlign || "left"}>
        <Typography
          variant="h1"
          component="span"
          className="true-baseline-align" // Fixes fontface vertical align issue
          fontFamily={fontFamily || "POPFINE"}
          // fontWeight="bold"
          color="secondary"
          {...props}
        >
          {text}
        </Typography>
      </Stack>
    </MotionDivOnMount>
  )
}
