import { styled, Typography } from "@mui/material"

const CardTitle = styled(({ variant, ...props }) => {
  return (
    <Typography
      variant={variant || ""}
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textTransform="uppercase"
      sx={{ fontSize: { xs: "1.3rem", md: "2rem" } }}
      {...props}
    />
  )
})(() => ({}))

export default function CustomCardTitle(props) {
  return <CardTitle {...props} />
}
