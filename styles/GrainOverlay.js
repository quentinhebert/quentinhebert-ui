import { Stack } from "@mui/material"

export default function GrainOverlay() {
  return (
    <Stack
      sx={{
        background: (theme) => `url(/medias/noise.gif)`,
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity: { xs: 0.045, md: 0.035 },
        zIndex: 100000000,
        backgroundSize: { xs: "80vw", md: "25vw" },
      }}
    />
  )
}
