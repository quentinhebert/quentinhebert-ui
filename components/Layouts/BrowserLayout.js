import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import BodyText from "../Text/body-text"

const ColorCircle = ({ color }) => (
  <Box
    width="20px"
    height="20px"
    bgcolor={color}
    sx={{ borderRadius: "100%" }}
  />
)
const BrowserNav = ({ title }) => {
  const colors = ["red", "orange", "green"]
  return (
    <Stack
      bgcolor="primary"
      padding={2}
      flexDirection="row"
      position="relative"
    >
      <Stack flexDirection="row" gap={1}>
        {colors.map((color) => (
          <ColorCircle color={color} />
        ))}
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          width: "50%",
          translate: "50% 25%",
        }}
      >
        <BodyText
          color="grey"
          textAlign="center"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {title || ""}
        </BodyText>
      </Stack>
    </Stack>
  )
}
const BrowserWindow = (props) => (
  <Stack
    sx={{
      width: "100%",
      height: "100%",
      background: (theme) =>
        `linear-gradient(${theme.palette.secondary.main} 0%, #000 70%)`,
      padding: {
        xs: "1rem",
        sm: "2rem",
        md: "4rem",
        lg: "8rem",
        xl: "10rem",
      },
    }}
  >
    <Stack
      sx={{
        height: "100%",
        borderRadius: "1rem",
        overflow: "hidden",
        background: (theme) => theme.palette.background.main,
      }}
      {...props}
    />
  </Stack>
)
const BrowserMainZone = (props) => (
  <Stack
    sx={{
      position: "relative",
      padding: "2rem 0",
      background: "linear-gradient( rgb(0,0,0,0.9) 0%, rgb(0,0,0,0.7) 100%)",
    }}
    {...props}
  />
)
const GradientBg = (props) => (
  <Stack justifyContent="center" position="relative" {...props} />
)

export default function BrowserLayout({ title, ...props }) {
  const { topRef } = props

  return (
    <GradientBg ref={topRef}>
      <BrowserWindow>
        <BrowserNav title={title} />
        <BrowserMainZone {...props} />
      </BrowserWindow>
    </GradientBg>
  )
}
