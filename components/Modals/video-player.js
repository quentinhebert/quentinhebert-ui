import { Dialog, Stack, Box, Typography, Slide } from "@mui/material"
import VimeoPlayer from "../Sections/vimeo-player"
import theme from "../../config/theme"
import Boop from "../Animation/boop"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useRef, useState, forwardRef, memo } from "react"
import YoutubePlayer from "../Sections/youtube-player"
import BouncingArrow from "../Navigation/BouncingArrow"
import ScaleUpOnHoverStack from "../ReusableComponents/animations/scale-up-on-hover-stack"
import DotSeparator from "../Other/dot-separator"
import CustomModal from "../ReusableComponents/modals/custom-modal"

const SectionTitle = ({ text }) => (
  <Typography
    color="secondary"
    variant="h5"
    marginTop={4}
    marginBottom={1}
    textTransform="uppercase"
    letterSpacing={1}
    fontStyle="italic"
  >
    {text}
  </Typography>
)

const SectionText = (props) => (
  <Typography
    color="text.white"
    fontFamily="Ethereal"
    letterSpacing={1}
    {...props}
  />
)

const VideoTitle = ({ text }) => (
  <Typography
    color="secondary"
    textTransform="uppercase"
    letterSpacing={1}
    variant="h3"
    marginRight={2}
  >
    {text}
  </Typography>
)

export default function VideoPlayer(props) {
  const { video, open, handleClose } = props
  const [player, setPlayer] = useState(null)
  const [videoId, setVideoId] = useState(null)

  const VideoInfoRef = useRef()
  const TopRef = useRef()
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
    } else {
      setVideoId(null)
    }
  }, [video])

  // if (!video) return <></>

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
    // <Dialog
    //   fullScreen
    //   open={open}
    //   onClose={handleClose}
    //   TransitionComponent={Transition}
    //   sx={{
    //     // backgroundColor: (theme) => theme.palette.background.main,
    //     background:
    //       "linear-gradient(180deg, rgb(0,0,0,0.5) 0%, transparent 100%)",
    //   }}
    //   PaperProps={{
    //     sx: {
    //       backgroundImage: "none",
    //       background: (theme) =>
    //         `linear-gradient(120deg, #000 30%, ${theme.palette.background.main} 100%)`,
    //       boxShadow: "none",
    //     },
    //   }}
    // >
    <CustomModal fullscreen open={open} handleClose={handleClose}>
      <Stack flexGrow={1}>
        <Stack ref={TopRef} />
        <Stack alignItems="center" minHeight="100vh">
          {/* CLOSE BUTTON */}
          <Stack
            sx={{
              position: "fixed",
              right: "2rem",
              top: "1rem",
              cursor: "pointer",
              zIndex: 100,
            }}
            flexDirection="row"
            alignItems="center"
            fontFamily="Helmet"
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
            width={
              video && window.innerHeight > window.innerWidth ? "96%" : "70%"
            }
            textAlign="left"
            justifyContent="left"
            padding="1rem 0"
            sx={{ marginTop: { xs: "2rem", md: 0 } }}
          >
            <Stack
              alignItems="baseline"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                marginBottom: { xs: "1rem", md: 0 },
              }}
            >
              <VideoTitle text={video?.title || ""} />
              <Typography
                color="text.white"
                fontSize="1rem"
                component="span"
                fontWeight="100"
                textTransform="Capitalize"
              >
                {video?.date || ""} – {video?.type || ""}
              </Typography>
            </Stack>
            {video?.client ? (
              <SectionText>Pour {video?.client || ""}</SectionText>
            ) : null}
          </Box>

          <Stack
            width={
              video && window.innerHeight > window.innerWidth ? "100%" : "70%"
            }
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
            width={
              video && window.innerHeight > window.innerWidth ? "96%" : "70%"
            }
            textAlign="left"
            justifyContent="left"
            padding="2rem 0 2rem"
            ref={VideoInfoRef}
          >
            {video?.description ? (
              <>
                <SectionTitle text="Quelques mots" />
                <SectionText>{video?.description || ""}</SectionText>
              </>
            ) : null}

            <DotSeparator marginTop={4} dots={3} />

            {video?.roles && video?.roles?.length ? (
              <>
                <SectionTitle text="Sur ce projet, je suis..." />
                <Typography
                  color="text.white"
                  fontFamily="Ethereal"
                  marginTop={1}
                >
                  {video.roles.map((role, key) => (
                    <Box
                      component="span"
                      key={key}
                      padding="0.1rem 0.75rem"
                      margin="0.25rem"
                      display="inline-flex"
                      lineHeight="2rem"
                      letterSpacing={1}
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.9rem", md: "1.2rem" },
                        fontWeight: "bold",
                        backgroundColor: "#fff",
                        color: (theme) => theme.palette.text.primary,
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

            <DotSeparator marginTop={4} dots={3} />

            {video?.gear && video?.gear?.length ? (
              <>
                <SectionTitle text="Matériel utilisé" />
                <SectionText>
                  {video.gear.map((item, key) => (
                    <Box component="span" key={key} marginRight={1}>
                      {item} {video.gear.length === key + 1 ? "" : "–"}
                    </Box>
                  ))}
                </SectionText>
              </>
            ) : null}

            <DotSeparator marginTop={4} dots={3} />

            <Stack
              onClick={(e) => scrollTo(TopRef)}
              alignItems="center"
              marginTop={4}
              sx={{ cursor: "pointer" }}
            >
              <ScaleUpOnHoverStack>
                <Typography color="secondary">Revenir en haut</Typography>
              </ScaleUpOnHoverStack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </CustomModal>

    // {/* </Dialog> */}
  )
}
