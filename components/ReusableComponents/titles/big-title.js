import { Typography } from "@mui/material"

export default function BigTitle(props) {
  const { title, color, fontFamily, textAlign } = props

  return (
    <Typography
      variant="h1"
      fontFamily={fontFamily || "Helmet"}
      fontWeight="bold"
      textAlign={textAlign || "left"}
      color={"secondary"}
      sx={{
        color: color || "#fff",
        fontSize: {
          xs: "4rem",
          sm: "10vw",
        },
        lineHeight: {
          xs: "4rem",
          sm: "8rem",
          md: "10rem",
          lg: "13rem",
          xl: "17rem",
        },
        background: (theme) =>
          `linear-gradient(-200deg, ${theme.palette.text.secondary} 0%, ${theme.palette.text.primary} 50%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    >
      {title}
    </Typography>
  )
}
