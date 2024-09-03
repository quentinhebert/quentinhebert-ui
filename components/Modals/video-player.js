import { Stack, Box, Typography } from "@mui/material"
import { memo, useContext, useEffect, useRef, useState } from "react"
import { isVimeo, isYoutube } from "../../services/urls"
import ScaleUpOnHoverStack from "../Animation/scale-up-on-hover-stack"
import BodyText from "../Text/body-text"
import CustomModal from "./custom-modal"
import CustomReactPlayer from "../VideoPlayers/custom-react-player"
import TopRightCloseButton from "../Buttons/top-right-close-button"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"
import AnimatedScrollDownBtn from "../Animation/animated-scroll-down-btn"
import StaggerParent from "../Animation/stagger-parent"
import { motion } from "framer-motion"
import { moveDownVariants, moveLeftVariants } from "../Animation/variants"

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
const Header = ({ video }) => {
  const { lang } = useContext(AppContext)
  return (
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
            {video?.type.label[lang] || ""}
            {!!video?.year && !!video?.type && ` (${video?.year})`}
            {!!video?.year && !video?.type && ` ${video?.year}`}
          </BodyText>
        </VideoTitle>
      </Stack>
      {video?.client && (
        <BodyText>
          {translations.films.portfolio.client[lang]} {video?.client}
        </BodyText>
      )}
    </Stack>
  )
}
const RenderPlayer = ({ player, videoId }) => {
  if (!player || !videoId) return <></>

  let Player = () => (
    <Stack>
      <Typography color="text.light">Impossible de lire la vidéo...</Typography>
    </Stack>
  )
  switch (player) {
    case "vimeo":
      Player = () => <CustomReactPlayer vimeoId={videoId} />
      break
    case "youtube":
      Player = () => <CustomReactPlayer youtubeId={videoId} />
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
    marginTop={4}
    marginBottom={1}
    sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
    {...props}
  />
)
const Description = ({ content }) => {
  if (!content) return <></>
  const { lang } = useContext(AppContext)
  return (
    <>
      <SectionTitle>
        {translations.films.portfolio.description[lang]}
      </SectionTitle>
      <BodyText whiteSpace="pre-line">{content[lang]}</BodyText>
    </>
  )
}
const Pill = (props) => (
  <motion.div variants={moveDownVariants} style={{ display: "inline-flex" }}>
    <Box
      component="span"
      className="inline-flex"
      padding="0.1rem 1rem"
      margin="0.25rem"
      lineHeight="2rem"
      sx={{
        fontSize: { xs: "0.8rem", md: "0.9rem" },
        backgroundColor: "#fff",
        color: (theme) => theme.palette.text.primary,
        borderRadius: "20px",
      }}
      {...props}
    />
  </motion.div>
)
const PillsList = ({ title, list }) => {
  const { lang } = useContext(AppContext)
  if (!list?.length) return <></>
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <Typography component="div" color="text.white" marginTop={1}>
        <StaggerParent staggerChildren={0.1} style={{ display: "inline" }}>
          {list.map((item, key) => (
            <Pill>
              {!!item[lang] && item[lang].trim() !== "" ? item[lang] : item.fr}
            </Pill>
          ))}
        </StaggerParent>
      </Typography>
    </>
  )
}
const ScrollToTopBtn = (props) => {
  const { lang } = useContext(AppContext)
  return (
    <Stack
      alignItems="center"
      marginTop={4}
      sx={{ cursor: "pointer" }}
      {...props}
    >
      <ScaleUpOnHoverStack>
        <Typography color="secondary">
          {translations.films.portfolio.scrollToTop[lang]}
        </Typography>
      </ScaleUpOnHoverStack>
    </Stack>
  )
}

export default function VideoPlayer(props) {
  const { video, open, handleClose } = props
  const [player, setPlayer] = useState(null)
  const [videoId, setVideoId] = useState(null)

  const { lang } = useContext(AppContext)

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
        <Stack alignItems="center" minHeight="100svh" className="sticky">
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

          {/****** TEASER PLAYER ******/}
          <Box
            width={isVertical ? "96%" : "70%"}
            textAlign="left"
            justifyContent="left"
            padding="1rem 0"
            sx={{ marginTop: { xs: "2rem", md: 0 } }}
          >
            <MemoPlayer player={player} videoId={videoId} />

            {!!video?.teaser_url ? (
              <Stack mt="3rem" mb="1.5rem">
                <VideoTitle>Teaser</VideoTitle>
                <CustomReactPlayer
                  youtubeId={video?.teaser_url}
                  disableAutoplay
                />
              </Stack>
            ) : (
              <></>
            )}
          </Box>

          {hasVideoInfo && (
            <Stack alignItems="center" sx={{ transform: "translateY(40px)" }}>
              <AnimatedScrollDownBtn
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
            padding="4rem 0 2rem"
            ref={ProjectInfoRef}
          >
            <Description content={video?.description} />

            <PillsList
              title={translations.films.portfolio.roles[lang]}
              list={video?.roles}
            />

            <PillsList
              title={translations.films.portfolio.gear[lang]}
              list={video?.gear}
            />

            {hasVideoInfo && (
              <ScrollToTopBtn onClick={() => scrollTo(TopRef)} />
            )}
          </Box>
        </Stack>
      </Stack>
    </CustomModal>
  )
}
