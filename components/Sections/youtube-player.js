import { Stack } from "@mui/material"
import { memo, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import PillButton from "../ReusableComponents/buttons/pill-button"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"

function arePropsEqual(prevProps, nextProps) {
  return prevProps.videoId === nextProps.videoId
}
const YoutubePlayer = memo((props) => <Youtube {...props} />, arePropsEqual)
export default YoutubePlayer

function Youtube(props) {
  const { videoId } = props

  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)

  const toggleMute = () => {
    if (volume === 0) setVolume(1)
    else setVolume(0)
  }

  const togglePlay = () => setPlaying(!playing)

  useEffect(() => {
    let timeout = 0

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        setShowControls(false)
      }, 2000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
        playsInline
        playsinline
        url={`https://youtu.be/${videoId}`}
        controls={false}
        playing={playing}
        volume={volume}
        loop={true}
        onReady={() => setPlaying(true)}
        onStart={() => setPlaying(true)}
        // onProgress={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          flexGrow: 1,
          height: "100%",
          // position: "absolute",
          visibility: playing ? "visible" : "hidden",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.7s ease-in-out",
        }}
      />
      <Stack
        className="absolute top full-width flex-center row gap-10"
        sx={{
          height: "100%",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.7s ease-in-out",
        }}
      >
        <PillButton onClick={togglePlay}>
          {playing ? "Pause" : "Jouer"}
        </PillButton>
        <PillButton onClick={toggleMute}>
          {volume === 1 ? (
            <VolumeUpIcon sx={{ marginLeft: ".25rem" }} />
          ) : (
            <VolumeOffIcon sx={{ marginLeft: ".25rem" }} />
          )}
        </PillButton>
      </Stack>
    </Stack>
  )
}
