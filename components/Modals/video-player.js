import { Stack, Box, Typography } from "@mui/material"
import Boop from "../Animation/boop"
import CloseIcon from "@mui/icons-material/Close"
import { memo, useEffect, useRef, useState } from "react"
import BouncingArrow from "../Navigation/BouncingArrow"
import { isVimeo, isYoutube } from "../../services/urls"
import ScaleUpOnHoverStack from "../Animation/scale-up-on-hover-stack"
import BodyText from "../Text/body-text"
import CustomModal from "./custom-modal"
import VimeoPlayer from "../VideoPlayers/vimeo-player"
import YoutubePlayer from "../VideoPlayers/youtube-player"
import TopRightCloseButton from "../Buttons/top-right-close-button"

const VideoTitle = (props) => (
  <Typography
    variant="h1"
    className="baseline uppercase"
    color="secondary"
    letterSpacing={1}
    sx={{
      fontSize: { xs: "3rem", md: "5rem" },
      whiteSpace: "break-spaces",
      wordBreak: "break-word",
      lineHeight: { xs: "2rem", md: "4rem" },
    }}
    {...props}
  />
)
const Header = ({ video }) => (
  <Stack>
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        marginBottom: { xs: "1rem", md: ".5rem" },
      }}
    >
      <VideoTitle>
        <Box component="span" marginRight=".5rem">
          {video?.title && `${video.title}`}
        </Box>
        <BodyText
          whiteSpace="nowrap"
          fontSize={{ xs: "0.8rem", md: "1rem" }}
          textTransform="capitalize"
        >
          {video?.type || ""}
          {!!video?.year && !!video?.type && ` (${video?.year})`}
          {!!video?.year && !video?.type && ` ${video?.year}`}
        </BodyText>
      </VideoTitle>
    </Stack>
    {video?.client && <BodyText>Pour {video?.client}</BodyText>}
  </Stack>
)
const RenderPlayer = ({ player, videoId }) => {
  if (!player || !videoId) return <></>

  let Player = () => (
    <Stack>
      <Typography color="text.light">Impossible de lire la vidéo...</Typography>
    </Stack>
  )
  switch (player) {
    case "vimeo":
      Player = () => (
        <VimeoPlayer
          videoId={videoId}
          bgColor={(theme) => theme.palette.background.main}
        />
      )
      break
    case "youtube":
      Player = () => (
        <YoutubePlayer
          videoId={videoId}
          bgColor={(theme) => theme.palette.background.main}
        />
      )
      break
    default:
      break
  }

  return <Player />
}
function arePropsEqual(prevProps, nextProps) {
  return prevProps.videoId === nextProps.videoId
}
// Prevent from re-rendering on window resize
const MemoPlayer = memo((props) => <RenderPlayer {...props} />, arePropsEqual)
const SectionTitle = (props) => (
  <Typography
    variant="h2"
    color="secondary"
    marginTop={8}
    marginBottom={1}
    sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
    {...props}
  />
)
const Description = ({ content }) => {
  if (!content) return <></>
  return (
    <>
      <SectionTitle>Quelques mots</SectionTitle>
      <BodyText>{content}</BodyText>
    </>
  )
}
const Pill = (props) => (
  <Box
    component="span"
    className="inline-flex"
    padding="0.1rem 1rem"
    margin="0.25rem"
    lineHeight="2rem"
    letterSpacing={1}
    sx={{
      fontSize: { xs: "0.8rem", md: "1rem" },
      backgroundColor: "#fff",
      color: (theme) => theme.palette.text.primary,
      borderRadius: "20px",
    }}
    {...props}
  />
)
const PillsList = ({ title, list }) => {
  if (!list?.length) return <></>
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <Typography component="div" color="text.white" marginTop={1}>
        {list.map((role, key) => (
          <Pill key={key}>{role}</Pill>
        ))}
      </Typography>
    </>
  )
}
const ScrollToTopBtn = (props) => (
  <Stack
    alignItems="center"
    marginTop={4}
    sx={{ cursor: "pointer" }}
    {...props}
  >
    <ScaleUpOnHoverStack>
      <Typography color="secondary">Revenir en haut</Typography>
    </ScaleUpOnHoverStack>
  </Stack>
)

export default function VideoPlayer(props) {
  const { video, open, handleClose } = props
  const [player, setPlayer] = useState(null)
  const [videoId, setVideoId] = useState(null)

  const ProjectInfoRef = useRef()
  const TopRef = useRef()
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    let identifier = ""

    if (!video?.url) return setVideoId(null)
    const videoUrl = video.url

    // First, we check if the provided video is from youtube or Vimeo. Otherwise, we cannot handle it
    if (isYoutube(videoUrl)) {
      if (videoUrl.includes("watch?v=")) {
        identifier = videoUrl.split("watch?v=")[1].split("&")[0]
      } else if (videoUrl.includes("youtu.be/")) {
        identifier = videoUrl.split("youtu.be/")[1].split("&")[0].split("/")[0]
      }
      setPlayer("youtube")
    } else if (isVimeo(videoUrl)) {
      identifier = videoUrl.split("vimeo.com/")[1]
      setPlayer("vimeo")
    }

    setVideoId(identifier)
  }, [video])

  const isVertical = video && window.innerHeight > window.innerWidth
  const hasVideoInfo =
    video?.description || video?.roles?.length || video?.gear?.length

  return (
    <CustomModal
      fullscreen
      open={open}
      handleClose={handleClose}
      background={(theme) =>
        `linear-gradient(120deg, #000 30%, ${theme.palette.background.main} 100%)`
      }
    >
      <Stack ref={TopRef} sx={{ scrollMarginTop: "20rem" }} />

      <Stack flexGrow={1}>
        {/* Sticky property to prevent the close button from displaying over the scrollbar */}
        <Stack alignItems="center" minHeight="100vh" className="sticky">
          {/* <CloseBtn onClick={handleClose} /> */}
          <TopRightCloseButton onClick={handleClose} />

          {/****** FILM INFO ******/}

          <Box
            width={isVertical ? "96%" : "70%"}
            textAlign="left"
            justifyContent="left"
            padding="1rem 0"
            sx={{ marginTop: { xs: "2rem", md: 0 } }}
          >
            <Header video={video} />
          </Box>

          {/****** FILM PLAYER ******/}
          <Stack
            width={isVertical ? "100%" : "70%"}
            className="flex-center relative"
          >
            <MemoPlayer player={player} videoId={videoId} />
          </Stack>

          {hasVideoInfo && (
            <Stack alignItems="center" sx={{ transform: "translateY(40px)" }}>
              <BouncingArrow
                scrollTo={scrollTo}
                refForScroll={ProjectInfoRef}
              />
            </Stack>
          )}

          {/****** PROJECT INFO ******/}
          <Box
            width={isVertical ? "96%" : "70%"}
            textAlign="left"
            justifyContent="left"
            padding="2rem 0 2rem"
            ref={ProjectInfoRef}
          >
            <Description content={video?.description} />

            <PillsList title="Sur ce projet, je suis..." list={video?.roles} />

            <PillsList title="Matériel utilisé" list={video?.gear} />

            {hasVideoInfo && (
              <ScrollToTopBtn onClick={() => scrollTo(TopRef)} />
            )}
          </Box>
        </Stack>
      </Stack>
    </CustomModal>
  )
}
