import { Stack } from "@mui/material"
import { memo, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import PillButton from "../Buttons/pill-button"
import { useInView } from "react-intersection-observer"

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.youtubeId === nextProps.youtubeId &&
    prevProps.vimeoId === nextProps.vimeoId
  )
}
const CustomReactPlayer = memo((props) => <Player {...props} />, arePropsEqual)
export default CustomReactPlayer

function Player({ youtubeId, vimeoId, disableAutoplay, triggerPlayInView }) {
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

  const [ref, inView] = useInView()
  useEffect(() => {
    if (inView && triggerPlayInView) setPlaying(true)
    else if (!inView && triggerPlayInView) setPlaying(false)
  }, [inView])

  return (
    <Stack
      width="100%"
      sx={{
        position: "relative",
        paddingBottom: "56.25%" /* ratio 16/9 */,
        overflow: "hidden",
        display: "flex",
        backgroundColor: (theme) => theme.palette.background.black,
      }}
      ref={ref}
    >
      <ReactPlayer
        playsinline
        url={
          !!youtubeId
            ? `https://youtu.be/${youtubeId}`
            : !!vimeoId
            ? `https://player.vimeo.com/video/${vimeoId}`
            : ""
        }
        controls={true}
        playing={playing}
        volume={volume}
        loop={true}
        onReady={() =>
          !disableAutoplay ? setPlaying(true) : setPlaying(false)
        }
        onStart={() =>
          !disableAutoplay ? setPlaying(true) : setPlaying(false)
        }
        onPause={() => setPlaying(false)}
        config={{
          youtube: {
            onUnstarted: () => setPlaying(false),
          },
        }}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          flexGrow: 1,
          height: "100%",
          // visibility: playing ? "visible" : "hidden",
          // opacity: playing ? 1 : 0,
          transition: "opacity 0.7s ease-in-out",
        }}
      />
      {/* <Stack
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
      </Stack> */}
    </Stack>
  )
}
