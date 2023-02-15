import { Box, Stack, Typography } from "@mui/material"
import BodyText from "../Text/body-text"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import PillButton from "../Buttons/pill-button"
import { useState } from "react"
import EastIcon from "@mui/icons-material/East"
import { motion } from "framer-motion"
import YoutubePlayer from "../VideoPlayers/youtube-player"

const Text = (props) => (
  <motion.div
    initial={{ x: -20 }}
    animate={{ x: 0 }}
    transition={{ duration: 1 }}
  >
    <BodyText {...props} />
  </motion.div>
)

export default function About_Main() {
  const [slide, setSlide] = useState(0)
  const handleNext = () => setSlide(slide + 1)

  const handleRestart = () => setSlide(0)

  return (
    <Stack
      sx={{
        background:
          "linear-gradient(#000 0%, transparent 60%, transparent 80%, #000 100%), url(/medias/film_grain.jpg)",
        backgroundSize: "cover",
      }}
    >
      <CenteredMaxWidthContainer
        percents="80%"
        pixels="1600px"
        sx={{
          gap: { xs: "5rem", md: "2rem" },
          flexDirection: { xs: "column-reverse", md: "row" },
          padding: { xs: "4rem 0 4rem", md: "8rem 0" },
        }}
      >
        <Stack sx={{ width: { xs: "100%", md: "48%" } }} gap={2}>
          <Typography
            variant="h1"
            color="secondary"
            sx={{
              fontSize: { xs: "4rem", md: "7rem" },
            }}
          >
            À propos
          </Typography>
          {slide === 0 && (
            <Text>
              Issu d'une formation d'ingénieur, j'ai été développeur web pendant
              deux ans dans une start-up. Mais poussé par un désir
              d'indépendance et l'envie de créer, j'ai décidé de me lancer en
              freelance.
            </Text>
          )}
          {slide === 1 && (
            <Text>
              Depuis le collège, je réalise des vidéos : clips et
              courts-métrages pour la plupart. En parallèle de mes études, je
              crée un collectif et une association de productions audiovisuelles
              avec lesquels je m'épanouis dans la réalisation de vidéos.
            </Text>
          )}
          {slide === 2 && (
            <Text>
              Aujourd'hui, je partage mon activité entre la réalisation de sites
              web et de films.
            </Text>
          )}
          <Stack className="row" alignItems="center" gap={4}>
            {slide !== 0 && (
              <Box>
                <Typography
                  component="a"
                  className="cool-button"
                  onClick={handleRestart}
                  color="secondary"
                  sx={{ cursor: "pointer", fontSize: "1.2rem" }}
                >
                  Recommencer
                </Typography>
              </Box>
            )}
            {slide !== 2 && (
              <PillButton onClick={handleNext} endIcon={<EastIcon />}>
                Suivant
              </PillButton>
            )}
          </Stack>
        </Stack>

        <Stack sx={{ width: { xs: "100%", md: "48%" }, gap: 0.25 }}>
          <Stack
            sx={{
              background: "linear-gradient(180deg, #252525 0%, #171615 100%)",
              borderRadius: "15px",
              padding: 0.25,
              width: "88%",
              alignSelf: "center",
            }}
          >
            <Stack
              sx={{
                background: "#000",
                borderRadius: "15px",
                padding: ".5rem .5rem 1rem",
              }}
            >
              <YoutubePlayer
                videoId={"PAhiebzm0pk"}
                bgColor={(theme) => theme.palette.background.main}
              />
            </Stack>
          </Stack>
          <Box component="img" src="/medias/macbook-keyboard.png" />
        </Stack>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
