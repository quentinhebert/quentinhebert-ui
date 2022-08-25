import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled((props) => {
  const { text, href, openNewTab, hoverColor, color, fontFamily } = props

  return (
    <Typography
      component="a"
      href={href}
      target={openNewTab ? "_blank" : ""}
      sx={{
        fontFamily: fontFamily || "",
        color: color || "",
        "&:hover": {
          color: (theme) => hoverColor || theme.palette.text.secondary,
        },
        fontSize: "inherit",
      }}
      {...props}
    >
      {text}
    </Typography>
  )
})()

export default function InTextLink(
  props = {
    text,
    href,
    openNewTab,
    hoverColor,
    color,
    fontFamily,
  }
) {
  return <Text {...props} />
}
