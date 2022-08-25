import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled((props) => {
  const { color, letterSpacing, fontSize } = props

  return (
    <Typography
      sx={{
        color: (theme) => color || theme.palette.text.white,
        fontSize: fontSize || { xs: "0.5rem", md: "0.75rem" },
        letterSpacing: letterSpacing || 1,
      }}
      {...props}
    />
  )
})(() => ({}))

export default function SmallText(props) {
  return <Text {...props} />
}
