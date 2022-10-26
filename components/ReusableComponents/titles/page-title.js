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
          xs: "1.3rem",
          sm: "1.5rem",
          md: "2.5rem",
        },
      }}
      {...props}
    >
      {text}
    </Typography>
  )
}
