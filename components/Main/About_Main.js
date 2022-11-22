import { Box, Stack, Typography } from "@mui/material"
import BodyText from "../Text/body-text"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import PillButton from "../Buttons/pill-button"
import { useState } from "react"
import EastIcon from "@mui/icons-material/East"
import { motion } from "framer-motion"

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
        padding="10rem 0"
        percents="80%"
        pixels="1600px"
        gap="4%"
        flexDirection="row"
        alignItems="center"
      >
        <Stack width="48%" gap={2}>
          <Typography
            color="#fff"
            letterSpacing={2}
            sx={{
              fontSize: { xs: "2rem", md: "4rem" },
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

        <Stack width="48%">
          <iframe
            src="https://www.youtube.com/embed/PAhiebzm0pk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{ aspectRatio: "16/9" }}
          />
        </Stack>

        {/* <Stack justifyContent="center" alignItems="center" gap={4}>
        <ImgTextBand
          img="/medias/cta-cover.jpg"
          title="Un profil scientifique"
          titleColor="#61b448"
          text="Après un baccalauréat scientifique, je m'oriente vers une formation d'ingénieur. Je me spécialise en informatique. C'est un secteur prometteur, qui peut m'offrir un bel avenir. Après 5 ans de dure labeur, à douter, à désobéir, à me surpasser, à réfléchir, j'obtiens enfin mon diplôme d'ingénieur."
          reverse
        />
        <ImgTextBand
          img="/medias/cta-cover.jpg"
          title="Mes premiers pas dans le web"
          titleColor="#61b448"
          text="Mais diplômé en plein covid-19, je choisis de débuter ma carrière dans le web. C'est un choix judicieux qui réunit à la fois mon envie de créer et mes compétences acquises au cours de deux stages de six mois, réalisés dans la programmation web pendant mon cursus d'ingénieur."
        />
        <ImgTextBand
          img="/medias/cta-cover.jpg"
          title="Un projet de longue date"
          titleColor="#61b448"
          text="Depuis le collège, je réalise de courtes vidéos avec mes amis. Je débute avec des clips humoristiques mais très vite, je réalise mon premier court métrage (fiction). Je prends goût à l'écriture, au cadrage, à la réalisation ainsi qu'au montage. Au fil des années, je constitue un collectif avec lequel je réalise des dizaines de sketchs et courts métrages. "
          reverse
        />
      </Stack> */}
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
