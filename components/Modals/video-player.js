import { Dialog, Stack, Box, Typography, Slide } from "@mui/material"
import VimeoPlayer from "../Sections/vimeo-player"
import theme from "../../config/theme"
import Boop from "../Animation/boop"
import CloseIcon from "@mui/icons-material/Close"
import React, { useEffect, useState } from "react"
import YoutubePlayer from "../Sections/youtube-player"

export default function VideoPlayer(props) {
  const { video, open, handleClose } = props
  const [player, setPlayer] = useState(null)
  const [videoId, setVideoId] = useState(null)

  useEffect(() => {
    let identifier = ""
    if (video && video.url) {
      const videoUrl = video.url
      // First, we check if the provided video is from youtube or Vimeo. Otherwise, we cannot handle it
      if (isYoutube(videoUrl)) {
        if (
          videoUrl.indexOf("https://www.youtube.com/watch?v=") === 0 ||
          videoUrl.indexOf("www.youtube.com/watch?v=") === 0
        ) {
          identifier = videoUrl.split("watch?v=")[1].split("&")[0]
        } else if (videoUrl.indexOf("https://youtu.be/") === 0) {
          identifier = videoUrl
            .split("https://youtu.be/")[1]
            .split("&")[0]
            .split("/")[0]
        }
        setPlayer("youtube")
        setVideoId(identifier)
      } else if (isVimeo(videoUrl)) {
        identifier = videoUrl.split("vimeo.com/")[1]
        setVideoId(identifier)
        setPlayer("vimeo")
      }
    }
  }, [video])

  if (!video) return <></>

  const isYoutube = (path) => {
    if (
      path.indexOf("https://www.youtube.com") === 0 ||
      path.indexOf("https://youtu.be") === 0 ||
      path.indexOf("youtu.be") === 0 ||
      path.indexOf("www.youtube.com") === 0 ||
      path.indexOf("youtube.com") === 0
    ) {
      return true
    }
    return false
  }
  const isVimeo = (path) => {
    if (
      path.indexOf("https://vimeo.com") === 0 ||
      path.indexOf("vimeo.com") === 0
    ) {
      return true
    }
    return false
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      TransitionComponent={Transition}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundColor: theme.palette.background.main,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            cursor: "pointer",
          }}
        >
          <Boop>
            <CloseIcon sx={{ color: theme.palette.text.light }} />
          </Boop>
        </Box>
        <Stack
          width={window.innerHeight > window.innerWidth ? "100%" : "70%"}
          justifyContent="center"
          alignItems="center"
        >
          {player === "vimeo" ? (
            <VimeoPlayer
              videoId={videoId}
              bgColor={theme.palette.background.main}
            />
          ) : player === "youtube" ? (
            <YoutubePlayer
              videoId={videoId}
              bgColor={theme.palette.background.main}
            />
          ) : (
            <Stack>
              <Typography color="text.light">
                Sorry, we cannot find the video.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Dialog>
  )
}
