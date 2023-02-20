import { Stack } from "@mui/material"
import GrainOverlay from "../../styles/GrainOverlay"

export default function PageRoot(props) {
  return (
    <Stack minHeight="100vh" position="relative" bgcolor="background.black">
      <Stack {...props} />

      <GrainOverlay />
    </Stack>
  )
}
