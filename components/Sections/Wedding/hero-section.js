import { Stack, Typography, useMediaQuery } from "@mui/material"
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline"
import ReactPlayer from "react-player"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import { useContext, useEffect, useState } from "react"
import BodyText from "../../Text/body-text"
import PillButton from "../../Buttons/pill-button"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
import AnimatedScrollDownBtn from "../../Animation/animated-scroll-down-btn"

const Title = (props) => (
  <Typography
    variant="h1"
    color="secondary"
    fontFamily="POPFINE"
    sx={{
      marginTop: 2,
      fontSize: { xs: "6rem", md: "10rem" },
      zIndex: 0,
      textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
    }}
    {...props}
  />
)

const CTAButton = (props) => (
  <Stack
    padding="1rem 4rem"
    color={(theme) => theme.palette.text.secondary}
    alignItems="center"
    flexDirection="row"
    sx={{
      background: "#000",
      cursor: "pointer",
      borderRadius: "50px",
      boxShadow: (theme) => `0px 0px 30px 5px ${theme.palette.secondary.main}`,
      textShadow: (theme) => `0px 0px 20px ${theme.palette.secondary.main}`,
      "& > .MuiSvgIcon-root": {
        transition: ".3s ease-out",
        fontSize: "2rem",
        translate: "0px",
        rotate: "0deg",
        filter: (theme) =>
          `drop-shadow(0px 0px 10px ${theme.palette.secondary.main})`,
      },
      "&:hover": {
        "& > .MuiTypography-root": {
          transform: "scale(1.1)",
        },
        "& > .MuiSvgIcon-root": {
          translate: "30px",
          rotate: "180deg",
        },
      },
    }}
    margin="1rem"
    gap={2}
    {...props}
  />
)

const motionDivStyle = { display: "flex" }

export default function HeroSection(props) {
  const { refForScroll } = props

  const { lang } = useContext(AppContext)

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const landscape = useMediaQuery("@media (min-aspect-ratio: 16/9)")
  const portrait = useMediaQuery("@media (max-aspect-ratio: 16/9)")

  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [rendered, setRendered] = useState(false)

  const handleClick = () => {
    setPlaying(!playing)
  }
  const handleMute = () => {
    if (volume === 1) setVolume(0)
    else if (volume === 0) setVolume(1)
  }

  useEffect(() => {
    setRendered(true) // Trick to avoid nextjs hydration error
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
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        marginTop: "-82px",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        // maxHeight: "600px", // TODO: Remove that line when suscribed to vimeo plan
        overflow: "hidden",
        objectFit: "cover",
        zIndex: 2,
      }}
    >
      <Stack
        sx={{
          backgroundImage: "url('/medias/wedding-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "100%",
        }}
        className="flex-center"
        overflow="hidden"
      >
        {rendered && ( // Trick to avoid nextjs hydration error
          <ReactPlayer
            url="https://player.vimeo.com/video/848007866"
            controls={false}
            playing={playing}
            volume={volume}
            loop={true}
            width={portrait ? "250.78vh" : "100vw"}
            height={landscape ? "56.25vw" : "120vh"}
            onPause={() => setPlaying(false)}
            style={{
              transform: "scale(1)",
              position: "absolute",
              display: "flex",
              opacity: playing ? 1 : 0,
              transition: "opacity .7s ease-in-out",
            }}
          />
        )}
      </Stack>

      <Stack
        className="absolute full-width flex-center no-select top left"
        // height="calc(100% - 90px)"
        height="100%"
        zIndex={101}
        flexGrow={1}
        gap={8}
      >
        <Stack
          className="full-width flex-center no-select"
          gap={4}
          sx={{
            opacity: playing ? 0 : 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <MotionDivOnMount
            hidden={{ y: -20, opacity: 0 }}
            visible={{ y: 0, opacity: 1 }}
            withEase
            style={{ motionDivStyle }}
          >
            <Title textAlign="center">
              {translations.wedding.hero.title[lang]}
            </Title>
          </MotionDivOnMount>
          <BodyText
            animDelay={0.25}
            fontSize="1.5rem"
            fontStyle="italic"
            mb={6}
          >
            {translations.wedding.hero.iam[lang]}
          </BodyText>
        </Stack>

        {/* <Stack
          className="row flex-center"
          sx={{
            opacity: showControls || !playing ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <MotionDivOnMount
            hidden={{ opacity: 0 }}
            visible={{ opacity: 1 }}
            delay={playing ? 0 : 1.25}
          >
            <CTAButton onClick={handleClick}>
              <Typography
                fontFamily="Trophy"
                sx={{
                  fontSize: { xs: ".6rem", md: "1rem" },
                  transition: ".3s ease-in-out",
                }}
              >
                {playing ? "Pause" : translations.films.hero.btn[lang]}
              </Typography>
              {playing ? (
                <PauseCircleOutlineIcon sx={{ marginLeft: ".25rem" }} />
              ) : (
                <PlayCircleFilledWhiteOutlinedIcon
                  sx={{ marginLeft: ".25rem" }}
                />
              )}
            </CTAButton>
          </MotionDivOnMount>

          {playing && (
            <ScaleUpOnHoverStack>
              <PillButton padding="1.2rem" color="#000" onClick={handleMute}>
                {volume === 1 ? (
                  <VolumeUpIcon sx={{ marginLeft: ".25rem" }} />
                ) : (
                  <VolumeOffIcon sx={{ marginLeft: ".25rem" }} />
                )}
              </PillButton>
            </ScaleUpOnHoverStack>
          )}
        </Stack> */}
      </Stack>

      <Stack
        zIndex={102}
        justifyContent="end"
        alignItems="center"
        position="absolute"
        bottom={40}
        width="100%"
      >
        <AnimatedScrollDownBtn
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )
}
