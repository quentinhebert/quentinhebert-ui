import { Stack } from "@mui/material"

export default function GrainOverlay() {
  return (
    <Stack
      sx={{
        background: (theme) => `url(/medias/noise.gif)`,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity: 0.035,
        zIndex: 100000000,
        backgroundSize: "25vw",
      }}
    />
  )
}
