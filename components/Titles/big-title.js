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
        zIndex: 100,
        fontSize: {
          xs: "3rem",
          sm: "10vw",
        },
        lineHeight: {
          xs: "3rem",
          sm: "4rem",
          md: "10rem",
          lg: "13rem",
          xl: "17rem",
        },
        background: (theme) =>
          !color &&
          `linear-gradient(-200deg, ${theme.palette.text.secondary} 20%, ${theme.palette.text.primary} 70%)`,
        WebkitBackgroundClip: !color && "text",
        WebkitTextFillColor: !color && "transparent",
        color: color || "",
      }}
      {...props}
    >
      {title}
    </Typography>
  )
}
