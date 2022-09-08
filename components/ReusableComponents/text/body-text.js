import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled((props) => {
  const { color, fontFamily } = props

  return (
    <Typography
      component={"span"}
      fontFamily={fontFamily || "Helmet"}
      sx={{
        fontSize: { xs: "1rem", md: "1.2rem" },
        letterSpacing: props.letterSpacing || 1,
        lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
        color: color || ((theme) => theme.palette.text.white),
      }}
      {...props}
    />
  )
})(() => ({}))

export default function BodyText(props = { fontFamily, color }) {
  return <Text {...props} />
}
