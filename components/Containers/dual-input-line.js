import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const TwoInputLine = styled(({ gap, ...props }) => (
  <Stack
    sx={{
      width: "100%",
      gap: gap || { xs: 1, md: 2 },
      flexDirection: props.direction || { xs: "column", sm: "row" },
    }}
    {...props}
  />
))(() => ({}))

export default function DualInputLine(props) {
  return <TwoInputLine {...props} />
}
