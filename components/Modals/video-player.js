import { Dialog, Stack, Box, Typography, Slide } from "@mui/material"
import VimeoPlayer from "../Sections/vimeo-player"
import theme from "../../config/theme"
import Boop from "../Animation/boop"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useRef, useState, forwardRef } from "react"
import YoutubePlayer from "../Sections/youtube-player"
import BouncingArrow from "../Navigation/BouncingArrow"
import ScaleUpOnHoverStack from "../ReusableComponents/animations/scale-up-on-hover-stack"

export default function VideoPlayer(props) {
  const { video, open, handleClose } = props
  const [player, setPlayer] = useState(null)
  const [videoId, setVideoId] = useState(null)

  const VideoInfoRef = useRef()
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

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

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      // onClick={handleClose}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
      }}
      PaperProps={{
        style: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      }}
    >
      <Stack alignItems="center" minHeight="100vh">
        <Stack
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            cursor: "pointer",
          }}
          flexDirection="row"
          alignItems="center"
          fontFamily="Arial"
          onClick={handleClose}
        >
          <ScaleUpOnHoverStack>
            <Box color="text.secondary" sx={{ marginRight: ".5rem" }}>
              Fermer
            </Box>
          </ScaleUpOnHoverStack>
          <Boop>
            <CloseIcon sx={{ color: theme.palette.secondary.main }} />
          </Boop>
        </Stack>

        {/* Video infos */}
        <Box
          width={window.innerHeight > window.innerWidth ? "96%" : "70%"}
          textAlign="left"
          justifyContent="left"
          padding="1rem 0"
        >
          <Typography
            color="secondary"
            fontFamily="Ethereal"
            fontWeight="bold"
            variant="h3"
          >
            {video.title}{" "}
            <Box color="text.white" fontSize="1rem" component="span">
              {video.date} – {video.type}
            </Box>
          </Typography>
          {video.client ? (
            <Typography color="text.white" fontFamily="Ethereal" variant="h5">
              Pour {video.client}
            </Typography>
          ) : null}
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

        <Stack alignItems="center" sx={{ transform: "translateY(40px)" }}>
          <BouncingArrow
            text=""
            scrollTo={scrollTo}
            refForScroll={VideoInfoRef}
          />
        </Stack>

        {/* Project infos */}
        <Box
          width={window.innerHeight > window.innerWidth ? "96%" : "70%"}
          textAlign="left"
          justifyContent="left"
          padding="2rem 0 2rem"
          ref={VideoInfoRef}
        >
          {video.description ? (
            <>
              <Typography
                color="secondary"
                fontFamily="Ethereal"
                fontWeight="bold"
                variant="h4"
              >
                Quelques mots...
              </Typography>
              <Typography color="text.white" fontFamily="Ethereal" variant="h5">
                {video.description}
              </Typography>
            </>
          ) : null}

          {video.roles && video.roles.length ? (
            <>
              <Typography
                color="secondary"
                fontFamily="Ethereal"
                fontWeight="bold"
                variant="h4"
                marginTop={5}
              >
                Sur ce projet, je suis...
              </Typography>
              <Typography
                color="text.white"
                fontFamily="Ethereal"
                variant="h5"
                marginTop={1}
              >
                {video.roles.map((role, key) => (
                  <Box
                    component="span"
                    key={key}
                    padding={1}
                    marginRight={1}
                    sx={{
                      border: (theme) =>
                        `1px solid ${theme.palette.text.white}`,
                      borderRadius: "5px",
                    }}
                  >
                    {role}
                  </Box>
                ))}
              </Typography>
            </>
          ) : null}

          {video.gear && video.gear.length ? (
            <>
              <Typography
                color="secondary"
                fontFamily="Ethereal"
                fontWeight="bold"
                variant="h4"
                marginTop={5}
              >
                Matériel utilisé
              </Typography>
              <Typography color="text.white" fontFamily="Ethereal" variant="h5">
                {video.gear.map((item, key) => (
                  <Box component="span" key={key} marginRight={1}>
                    {item} {video.gear.length === key + 1 ? "" : "–"}
                  </Box>
                ))}
              </Typography>
            </>
          ) : null}
        </Box>
      </Stack>
    </Dialog>
  )
}
