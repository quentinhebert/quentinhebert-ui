import { Typography } from "@mui/material"

export default function SmallTitle({
  color,
  textTransform,
  padding,
  fontSize,
  fontFamily,
  ...props
}) {
  return (
    <Typography
      component="h2"
      variant="h3"
      fontFamily={fontFamily || "kardust"}
      textTransform={textTransform || "uppercase"}
      letterSpacing={2}
      fontWeight="bold"
      zIndex={1}
      className="no-select"
      sx={{
        color: color || ((theme) => theme.palette.text.secondary),
        fontSize: fontSize || "1.2rem",
        padding: padding || 0,
      }}
      {...props}
    />
  )
}
