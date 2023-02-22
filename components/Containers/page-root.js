import { Stack } from "@mui/material"
import GrainOverlay from "../../styles/GrainOverlay"

export default function PageRoot({ withLayer, ...props }) {
  return (
    <Stack minHeight="100svh" position="relative" bgcolor="background.black">
      <Stack {...props} />

      {withLayer && <GrainOverlay />}
    </Stack>
  )
}
