import { styled, Typography } from "@mui/material"

const CardTitle = styled(({ variant, ...props }) => {
  return (
    <Typography
      variant={variant || "h4"}
      component="div"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  )
})(() => ({}))

export default function CustomCardTitle(props) {
  return <CardTitle {...props} />
}
