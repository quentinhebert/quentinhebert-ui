import { Typography } from "@mui/material"

export default function SmallText({
  color,
  letterSpacing,
  fontSize,
  ...props
}) {
  return (
    <Typography
      sx={{
        color: (theme) => color || theme.palette.text.white,
        fontSize: fontSize || { xs: "0.6rem", md: "0.8rem" },
        letterSpacing: letterSpacing || 1,
      }}
      {...props}
    />
  )
}
