import { styled, Typography } from "@mui/material"

const CardTitle = styled((props) => {
  return (
    <Typography
      variant="h4"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ fontSize: { xs: "1.3rem", md: "2rem" } }}
    >
      {props.icon || null} {props.title}
    </Typography>
  )
})(() => ({}))

export default function CustomCardTitle(props) {
  return <CardTitle {...props} />
}
