import { Typography } from "@mui/material"

export default function SmallTitle(props) {
  return (
    <Typography
      componenent="h2"
      variant="h3"
      textTransform="uppercase"
      letterSpacing={2}
      fontWeight="bold"
      zIndex={1}
      className="no-select"
      sx={{
        color: props.color || ((theme) => theme.palette.text.secondary),
        fontSize: "1.2rem",
      }}
      {...props}
    />
  )
}
