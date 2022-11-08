import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const CssAnimatedStack = styled((props) => (
  <Stack
    sx={{
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      "&:hover": { transform: "scale(1.1)" },
    }}
    {...props}
  />
))(() => ({}))

export default function ScaleUpOnHoverStack(props) {
  return <CssAnimatedStack {...props} />
}
