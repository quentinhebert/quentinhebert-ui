import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import BodyText from "../Text/body-text"

const ColorCircle = ({ color, clickable }) => (
  <Box
    width="20px"
    height="20px"
    bgcolor={color}
    sx={{
      borderRadius: "100%",
      "&:hover": { opacity: clickable ? 0.5 : 1 },
      cursor: clickable ? "pointer" : "default",
    }}
  />
)
const BrowserNav = ({ title, onBtnClicks }) => {
  const colors = ["red", "orange", "green"]
  return (
    <Stack
      padding={2}
      flexDirection="row"
      position="relative"
      zIndex={1}
      sx={{
        background: (theme) => theme.palette.background.primary,
        borderRadius: "1rem 1rem 0 0",
      }}
    >
      <Stack flexDirection="row" gap={1}>
        {colors.map((color, key) => (
          <Box
            key={key}
            onClick={
              !!onBtnClicks && !!onBtnClicks[color]
                ? () => onBtnClicks[color]()
                : () => {}
            }
          >
            <ColorCircle
              color={color}
              clickable={!!onBtnClicks && !!onBtnClicks[color]}
            />
          </Box>
        ))}
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          width: "50%",
          top: "50%",
          translate: "50% -50%",
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
const BrowserWindow = ({ rootPadding, ...props }) => (
  <Stack
    sx={{
      width: "100%",
      height: "100%",
      padding: rootPadding || {
        xs: "1rem",
        sm: "2rem",
        md: "4rem",
        lg: "5rem",
        xl: "6rem",
      },
    }}
  >
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "1rem",
        overflow: "hidden",
        background: (theme) => theme.palette.background.black,
      }}
      {...props}
    />
  </Stack>
)
const BrowserMainZone = (props) => (
  <Stack
    sx={{
      position: "relative",
      height: "100%",
      overflow: "auto",
      background: "linear-gradient( rgb(0,0,0,0.7) 0%, rgb(0,0,0,0.6) 100%)",
    }}
    {...props}
  />
)

export default function BrowserLayout({
  title,
  onBtnClicks,
  rootPadding,
  ...props
}) {
  return (
    <BrowserWindow rootPadding={rootPadding}>
      <BrowserNav title={title} onBtnClicks={onBtnClicks} />
      <BrowserMainZone {...props} />
    </BrowserWindow>
  )
}
