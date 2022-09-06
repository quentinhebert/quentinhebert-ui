import { Typography } from "@mui/material"

export default function SmallTitle(props) {
  const { text, color, fontFamily, textAlign } = props

  return (
    <Typography
      componenent="h2"
      variant="h3"
      textTransform="uppercase"
      letterSpacing={2}
      fontWeight="bold"
      sx={{
        color: (theme) => theme.palette.text.secondary,
        fontSize: "1.2rem",
      }}
      {...props}
    >
      {text}
    </Typography>
  )
}
