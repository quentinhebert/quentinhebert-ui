import { Typography } from "@mui/material"

export default function PageTitle(props) {
  const { text, color, fontFamily, textAlign } = props

  return (
    <Typography
      variant="h1"
      fontFamily={fontFamily || "Helmet"}
      fontWeight="bold"
      textAlign={textAlign || "left"}
      sx={{
        color: color || "#fff",
        fontSize: {
          xs: "2rem",
          sm: "4vw",
        },
      }}
      {...props}
    >
      {text}
    </Typography>
  )
}
