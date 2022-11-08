import { Typography } from "@mui/material"

export default function CustomH1({ color, ...props }) {
  if (color === "primary" || color === "secondary" || !color)
    return <Typography color={color} variant="h2" component="h1" {...props} />
  return (
    <Typography variant="h2" component="h1" sx={{ color: color }} {...props} />
  )
}
