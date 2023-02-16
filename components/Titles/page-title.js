import { Typography } from "@mui/material"

export default function PageTitle(props) {
  const { text, color, fontFamily, textAlign } = props

  return (
    <Typography
      variant="h1"
      fontFamily={fontFamily || "POPFINE"}
      fontWeight="bold"
      textAlign={textAlign || "left"}
      color="secondary"
      {...props}
    >
      {text}
    </Typography>
  )
}
