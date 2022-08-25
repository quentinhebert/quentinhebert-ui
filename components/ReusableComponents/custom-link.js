import { Box } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled((props) => {
  const { text, href, hoverColor } = props

  return (
    <Box
      component="a"
      href={href}
      rel="noreferrer"
      sx={{
        "&:hover": {
          cursor: "pointer",
          color: (theme) => hoverColor || theme.palette.text.secondary,
        },
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CustomLink(
  props = {
    href,
    hoverColor,
  }
) {
  return <Text {...props} />
}
