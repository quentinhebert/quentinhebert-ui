import { Box } from "@mui/material"
import BodyText from "../Text/body-text"

export function HeadCell({ width, ...props }) {
  return (
    <Box
      component="th"
      textAlign="left"
      sx={{
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        padding: 2,
        minWidth: width || "10%",
        background: (theme) => theme.palette.background.main,
      }}
    >
      <BodyText
        preventTransition
        color={(theme) => theme.palette.text.secondary}
        {...props}
      />
    </Box>
  )
}

export function Cell(props) {
  return (
    <Box
      component="td"
      textAlign="left"
      sx={{
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        padding: 2,
      }}
    >
      <BodyText preventTransition color="#fff" {...props} />
    </Box>
  )
}

export function Line(props) {
  return (
    <Box
      component="tr"
      sx={{
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        padding: 2,
        cursor: "pointer",
        "&:hover": {
          background: "rgb(198, 144, 14, 0.3)",
        },
      }}
      {...props}
    />
  )
}
