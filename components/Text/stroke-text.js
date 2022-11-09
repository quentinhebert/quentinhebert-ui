import { Box } from "@mui/material"

export default function StrokeText({ color, strokeWidth, ...props }) {
  return (
    <Box
      component="span"
      sx={{
        color: color || "#fff",
        WebkitTextFillColor: "transparent",
        WebkitTextStrokeWidth: strokeWidth || "1px",
        WebkitTextStrokeColor: color || "#fff",
      }}
      {...props}
    />
  )
}
