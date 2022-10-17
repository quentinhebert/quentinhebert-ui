import { Stack, Box, Typography } from "@mui/material"
import VimeoPlayer from "../Sections/vimeo-player"
import Boop from "../Animation/boop"
import CloseIcon from "@mui/icons-material/Close"
import { memo, useEffect, useRef, useState } from "react"
import YoutubePlayer from "../Sections/youtube-player"
import BouncingArrow from "../Navigation/BouncingArrow"
import ScaleUpOnHoverStack from "../ReusableComponents/animations/scale-up-on-hover-stack"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import { isVimeo, isYoutube } from "../../services/urls"
import BodyText from "../ReusableComponents/text/body-text"

const CloseBtn = (props) => (
  <Box
    className="fixed full-width top left"
    sx={{
      height: "60px",
      zIndex: 100,
      overflow: "auto",
      background: "linear-gradient(0deg, transparent 0%, rgb(0,0,0,0.7) 100%)",
      textShadow: "4px 3px 10px rgba(0,0,0,0.9)",
    }}
  >
    <Stack
      className="flex-center pointer row fixed gap-4"
      sx={{
        right: "2rem",
        top: "1rem",
      }}
      fontFamily="Helmet"
      {...props}
    >
      <ScaleUpOnHoverStack>
        <Box color="text.secondary">Fermer</Box>
      </ScaleUpOnHoverStack>
      <Boop>
        <CloseIcon color="secondary" />
      </Boop>
    </Stack>
  </Box>
)

const VideoTitle = (props) => (
  <Typography
    className="baseline uppercase gap-10"
    color="secondary"
    letterSpacing={1}
    sx={{
      fontSize: { xs: "1.3rem", md: "3rem" },
      whiteSpace: "break-spaces",
      wordBreak: "break-word",
      lineHeight: { xs: "1.5rem", md: "2.6rem" },
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
        {video?.title && `${video.title} `}
        <BodyText
          whiteSpace="nowrap"
          fontSize={{ xs: "0.8rem", md: "1rem" }}
          textTransform="capitalize"
        >
          {video?.year || ""}
          {video?.year && video?.type && " – "}
          {video?.type || ""}
        </BodyText>
      </VideoTitle>
    </Stack>
    {video?.client && (
      <BodyText fontFamily="Ethereal" fontWeight="bold">
        Pour {video?.client}
      </BodyText>
    )}
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
    color="secondary"
    variant="h5"
    marginTop={8}
    marginBottom={1}
    textTransform="uppercase"
    letterSpacing={1}
    {...props}
  />
)

const Description = ({ content }) => {
  if (!content) return <></>
  return (
    <>
      <SectionTitle>Quelques mots</SectionTitle>
      <BodyText fontFamily="Ethereal" fontWeight="bold">
        {content}
      </BodyText>
    </>
  )
}

const Pill = (props) => (
  <Box
    component="span"
    className="bold inline-flex"
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
      <Typography color="text.white" fontFamily="Ethereal" marginTop={1}>
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
          <CloseBtn onClick={handleClose} />

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
