import { Stack, Typography, useMediaQuery } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline"
import { motion } from "framer-motion"
import BodyText from "../../ReusableComponents/text/body-text"
import PillButton from "../../ReusableComponents/buttons/pill-button"
import ScaleUpOnHoverStack from "../../ReusableComponents/animations/scale-up-on-hover-stack"
import ReactPlayer from "react-player"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import { useEffect, useState } from "react"

const Title = (props) => (
  <Typography
    variant="h1"
    color="secondary"
    fontFamily="Ethereal"
    fontWeight="bold"
    sx={{
      fontSize: { xs: "1.75rem", md: "3rem" },
      zIndex: 0,
      textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
    }}
    {...props}
  />
)

const motionDivStyle = { display: "flex" }

export default function FilmsIndexHero(props) {
  const { refForScroll } = props

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

  const handleClick = () => {
    setPlaying(!playing)
  }
  const handleMute = () => {
    if (volume === 1) setVolume(0)
    else if (volume === 0) setVolume(1)
  }

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
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        background: "#000",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: { xs: "90vh", md: "100vh" },
        // maxHeight: "600px", // TODO: Remove that line when suscribed to vimeo plan
        overflow: "hidden",
        objectFit: "cover",
      }}
    >
      <Stack
        sx={{ position: "relative", height: "100%" }}
        className="flex-center"
      >
        <ReactPlayer
          url="https://player.vimeo.com/video/759263656"
          controls={false}
          playing={playing}
          volume={volume}
          loop={true}
          width={portrait ? "250.78vh" : "100vw"}
          height={landscape ? "56.25vw" : "120vh"}
          onPause={() => setPlaying(false)}
          style={{
            position: "absolute",
            display: "flex",
            opacity: playing ? 1 : 0,
            transition: "opacity 0.7s ease-in-out",
          }}
        />
      </Stack>

      <Stack
        className="absolute full-width flex-center gap-2 no-select top left"
        height="100%"
        zIndex={101}
        flexGrow={1}
      >
        <Stack
          className="full-width flex-center gap-2 no-select top left"
          sx={{
            opacity: playing ? 0 : 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <BodyText>Je suis</BodyText>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ motionDivStyle }}
          >
            <Title textAlign="center">Vidéaste freelance</Title>
          </motion.div>
          <Stack
            className="row gap-10"
            sx={{
              textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
            }}
          >
            <BodyText animDelay={0.5}>Réalisateur</BodyText>
            <BodyText animDelay={0.75}>Cadreur</BodyText>
            <BodyText animDelay={1}>Monteur</BodyText>
          </Stack>
        </Stack>

        <Stack
          className="row flex-center"
          sx={{
            opacity: showControls || !playing ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <ScaleUpOnHoverStack>
            <PillButton
              padding="0.15rem 2rem"
              color="#000"
              margin="1rem"
              onClick={handleClick}
              animDelay={playing ? 0 : 1.25}
              gap={2}
            >
              {playing ? "Pause" : "Jouer"}
              {playing ? (
                <PauseCircleOutlineIcon sx={{ marginLeft: ".25rem" }} />
              ) : (
                <PlayCircleFilledWhiteOutlinedIcon
                  sx={{ marginLeft: ".25rem" }}
                />
              )}
            </PillButton>
          </ScaleUpOnHoverStack>

          {playing && (
            <ScaleUpOnHoverStack>
              <PillButton
                padding="0.35rem 1rem"
                color="#000"
                onClick={handleMute}
              >
                {volume === 1 ? (
                  <VolumeUpIcon sx={{ marginLeft: ".25rem" }} />
                ) : (
                  <VolumeOffIcon sx={{ marginLeft: ".25rem" }} />
                )}
              </PillButton>
            </ScaleUpOnHoverStack>
          )}
        </Stack>
      </Stack>

      <Stack
        zIndex={102}
        justifyContent="end"
        alignItems="center"
        position="absolute"
        bottom={10}
        width="100%"
      >
        <BouncingArrow
          text=""
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )
}
