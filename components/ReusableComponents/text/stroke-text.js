import { Box } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled((props) => (
  <Box
    component="span"
    sx={{
      color: props.color || "#fff",
      WebkitTextFillColor: "transparent",
      WebkitTextStrokeWidth: props.strokeWidth || "1px",
      WebkitTextStrokeColor: props.color || "#fff",
    }}
    {...props}
  />
))(() => ({}))

export default function StrokeText(props) {
  return <Text {...props} />
}
