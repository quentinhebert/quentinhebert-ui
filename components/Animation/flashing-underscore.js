import { Box } from "@mui/material"
import flashingStyles from "../../styles/FlashingRedDot.module.css"

export default function FlashingUnderscore(props) {
  return (
    <Box
      className={flashingStyles.flash}
      sx={{
        color: props.color || ((theme) => theme.palette.text.secondary),
        marginLeft: ".25rem",
      }}
    >
      _
    </Box>
  )
}
