import { Stack } from "@mui/material"
import * as React from "react"

export default function VimeoPlayer(props) {
  const { videoId, bgColor } = props

  return (
    <Stack
      width="100%"
      sx={{
        position: "relative",
        paddingBottom: "56.25%" /* ratio 16/9 */,
        height: 0,
        overflow: "hidden",
        clear: "both",
        display: "flex",
        backgroundColor: bgColor || "#000",
      }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&background=1&autopause=0&muted=0&loop=1`}
        width="960"
        height="540"
        frameBorder="0"
        allow="fullscreen"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Stack>
  )
}
