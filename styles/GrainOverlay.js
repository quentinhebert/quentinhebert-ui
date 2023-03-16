import { Stack } from "@mui/material"

export default function GrainOverlay() {
  return (
    <Stack
      sx={{
        background: `linear-gradient(180deg, rgb(0,0,0,0.15) 0%, transparent 50%, rgb(0,0,0,0.15) 100%), url(/medias/dust.jpg)`,
        width: "calc(100% + 17px)", // For when scrollbar disappears for menu
        maxWidth: "100vw",
        height: "calc(100% + 82px)",
        position: "absolute",
        top: "-82px",
        left: 0,
        pointerEvents: "none",
        opacity: 0.2,
        mixBlendMode: "screen",
        zIndex: 10000000,
        backgroundSize: { xs: "80vw", md: "8vw 8vw" },
        filter: "contrast(130%)",
      }}
    />
  )
}
