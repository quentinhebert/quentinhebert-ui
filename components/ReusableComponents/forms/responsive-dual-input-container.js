import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const TwoInputLine = styled((props) => (
  <Stack
    sx={{
      width: "100%",
      gap: "1rem",
      flexDirection: { xs: "column", sm: "row" },
    }}
    {...props}
  />
))()

export default function CustomFilledTextArea(props) {
  return <TwoInputLine {...props} />
}
