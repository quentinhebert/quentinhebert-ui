import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import theme from "../../config/theme"
import { Stack } from "@mui/material"

export default function Loading() {
  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "red" }}
    >
      <CircularProgress sx={{ color: "#fff" }} />
    </Stack>
  )
}
