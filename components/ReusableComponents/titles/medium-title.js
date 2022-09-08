import { Typography } from "@mui/material"

export default function MediumTitle(props) {
  return (
    <Typography
      color="secondary"
      sx={{
        fontSize: { xs: "12vw", md: "5vw" },
        lineHeight: { xs: "10vw", md: "5vw" },
      }}
      {...props}
    />
  )
}
