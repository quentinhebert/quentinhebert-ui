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
          sm: "13vw",
        },
        lineHeight: {
          xs: "4rem",
          sm: "8rem",
          md: "10rem",
          lg: "13rem",
          xl: "17rem",
        },
      }}
      {...props}
    >
      {title}
    </Typography>
  )
}
