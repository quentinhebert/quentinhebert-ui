import { Stack } from "@mui/material"

export default function GrainOverlay() {
  return (
    <Stack
      sx={{
        background: `linear-gradient(180deg, rgb(0,0,0,0.15) 0%, transparent 50%, rgb(0,0,0,0.15) 100%), url(/medias/dust.jpg)`,
        width: "calc(100% + 17px)", // For when scrollbar disappears for menu
        height: "calc(100% + 82px)",
        position: "absolute",
        top: "-82px",
        left: 0,
        pointerEvents: "none",
        opacity: 0.25,
        mixBlendMode: "screen",
        zIndex: 10000000,
        backgroundSize: { xs: "80vw", md: "20vw 20vw" },
        filter: "contrast(130%)",
      }}
    />
  )
}
