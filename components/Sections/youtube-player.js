import { Stack } from "@mui/material"
import { memo, useState } from "react"
import ReactPlayer from "react-player"

function arePropsEqual(prevProps, nextProps) {
  return prevProps.videoId === nextProps.videoId
}
const YoutubePlayer = memo((props) => <Youtube {...props} />, arePropsEqual)
export default YoutubePlayer

function Youtube(props) {
  const { videoId, bgColor } = props

  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)

  const toggleMute = () => {
    if (volume === 0) setVolume(1)
    else setVolume(0)
  }

  return (
    // <Stack
    //   width="100%"
    //   sx={{
    //     position: "relative",
    //     paddingBottom: "56.25%" /* ratio 16/9 */,
    //     height: 0,
    //     overflow: "hidden",
    //     clear: "both",
    //     display: "flex",
    //     backgroundColor: bgColor || "#000",
    //   }}
    // >
    //   <iframe
    //     width="100%"
    //     height="100%"
    //     // src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&loop=1&playlist=${videoId}`}
    //     src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    //     frameBorder="0"
    //     title="Embedded youtube"
    //     allowfullscreen="true"
    //     allow="autoplay; fullscreen; encrypted-media"
    //     style={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //     }}
    //   />
    // </Stack>

    <Stack
      width="100%"
      sx={{
        position: "relative",
        paddingBottom: "56.25%" /* ratio 16/9 */,
        overflow: "hidden",
        display: "flex",
        backgroundColor: "#000",
      }}
    >
      <ReactPlayer
        url={`https://www.youtube.com/embed/${videoId}`}
        controls={false}
        playing={playing}
        volume={volume}
        loop={true}
        onReady={() => setPlaying(true)}
        onStart={() => setPlaying(true)}
        onProgress={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          display: "flex",
          flexGrow: 1,
          height: "100%",
          // position: "absolute",
          // opacity: playing ? 1 : 0,
          // transition: "opacity 0.7s ease-in-out",
        }}
      />
    </Stack>
  )
}
