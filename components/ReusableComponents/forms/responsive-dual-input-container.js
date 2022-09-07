import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const TwoInputLine = styled((props) => (
  <Stack
    sx={{
      width: "100%",
      gap: { xs: 1, md: 2 },
      flexDirection: props.direction || { xs: "column", sm: "row" },
    }}
    {...props}
  />
))(() => ({}))

export default function CustomFilledTextArea(props) {
  return <TwoInputLine {...props} />
}
