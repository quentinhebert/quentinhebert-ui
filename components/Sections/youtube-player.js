import { Stack } from "@mui/material"
import * as React from "react"

export default function YoutubePlayer(props) {
  const { videoId, bgColor } = props

  return (
    <Stack
      width="100%"
      bgcolor={bgColor}
      sx={{
        position: "relative",
        paddingBottom: "56.25%" /* ratio 16/9 */,
        height: 0,
        overflow: "hidden",
        clear: "both",
        display: "flex",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        // src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&loop=1&playlist=${videoId}`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        title="Embedded youtube"
        allowfullscreen="true"
        allow="autoplay; fullscreen; encrypted-media"
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
