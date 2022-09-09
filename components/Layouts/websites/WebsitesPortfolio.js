import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import styles from "../../../styles/TextShine.module.css"
import stylesNeon from "../../../styles/NeonFlickerText.module.css"
import { Box, Stack } from "@mui/material"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import GradientTitleCard from "../../ReusableComponents/cards/gradient-title-card"
import BodyText from "../../ReusableComponents/text/body-text"
import StrokeText from "../../ReusableComponents/text/stroke-text"
import CenteredLandingButton from "../../ReusableComponents/buttons/centered-landing-button"

const CLIENTS = [
  {
    name: "wideop",
    link: "https://wideop.com",
    img: "/medias/wideop.png",
    keywords: [
      "maintenance",
      "refonte graphique",
      "UX",
      "interface utilisateur",
      "SEO",
      "intégration",
      "emailing",
    ],
    description:
      "Wideop est une plateforme collaborative mettant en relation des photographes professionnels avec leurs clients. La plateforme se démarque de ses concurrents de par sa vision éthique envers les photographes professionnels. J'ai été lead-développeur à la tête d'une équipe de développeurs pendant 1 an et demi aux débuts de la start-up.",
  },
  {
    name: "Mathias Mortelmans Films",
    link: "https://www.mathiasmortelmans.com",
    img: "/medias/mmf2.png",
    keywords: ["création web", "UX", "back-office", "intégration"],
    description:
      "Mathias Mortelmans est un jeune vidéaste belge. Il réalise des vidéos corporate mais il est surtout actif dans le monde de la nuit et de la fête. Enfin, il partage les vidéos de ses voyages les plus fous ! Il m'a contacté pour lui créer un site sur-mesure.",
  },
  {
    name: "Mon site",
    link: "https://quentinhebert.com",
    img: "/medias/quentinhebert.jpg",
    keywords: ["création web", "UX", "back-office", "intégration"],
    description:
      "Eh oui, mon site web est l'une de mes plus belles créations. J'y ai passé des milliers d'heures, entre le logo, la charte graphique, les typographies, les photos, les photo-montages, le contenu vidéo, le contenu textuel, les fonctionnalités, l'expérience utilisateur, le back-office et ma base de données... Je suis fier de le présenter dans mes projets.",
  },
]

export default function WebsitesPortfolio(props) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        y: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0, y: -25 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])
  const motionDivStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <>
      <Stack ref={ref}>
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={motionDivStyle}
        >
          <MediumTitle
            textAlign="center"
            className={styles.shine}
            fontFamily="Zacbel X"
            letterSpacing={1}
            lineHeight={{ xs: "15vw", sm: "10vw" }}
          >
            <StrokeText>Mes projets</StrokeText>
          </MediumTitle>
        </motion.div>
      </Stack>

      <Stack gap="10rem" margin="5rem 0 15rem">
        {CLIENTS.map((client, key) => (
          <CenteredMaxWidthContainer pixels="1200px">
            <Stack
              zIndex={1}
              flexDirection={
                key % 2 === 0
                  ? { xs: "column", md: "row" }
                  : { xs: "column", md: "row-reverse" }
              }
            >
              <Stack
                sx={{
                  width: {
                    xs: "100%",
                    md: "49%",
                  },
                  minHeight: "400px",
                  display: { xs: "none", md: "flex" },
                  backgroundImage: `url(${client.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  borderRadius: "20px",
                }}
              />
              <Stack
                zIndex={3}
                alignItems="center"
                gap={3}
                sx={{
                  width: { xs: "100%", md: "49%" },
                  marginRight: { xs: 0, md: key % 2 === 0 ? 0 : "2%" },
                  marginLeft: { xs: 0, md: key % 2 === 0 ? "2%" : 0 },
                  paddingBottom: "2rem",
                }}
              >
                <GradientTitleCard
                  bgcolor="transparent"
                  textTransform="uppercase"
                  fontFamily="Zacbel X"
                  letterSpacing={2}
                  fontSize="2rem"
                  className={styles.shine}
                >
                  {client.name}
                </GradientTitleCard>
                <BodyText>
                  {client.keywords.map((keyword, key) => (
                    <Box
                      key={key}
                      component="span"
                      fontSize="0.9rem"
                      marginRight=".75rem"
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    >
                      /{keyword}
                    </Box>
                  ))}
                </BodyText>
                <Stack
                  sx={{
                    width: {
                      xs: "100%",
                      md: "49%",
                    },
                    minHeight: { xs: "200px", sm: "400px" },
                    display: { xs: "block", md: "none" },
                    backgroundImage: `url(${client.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    borderRadius: "20px",
                  }}
                />
                <BodyText textAlign="justify">{client.description}</BodyText>
                <CenteredLandingButton>
                  <Box component="a" target="_blank" href={client.link}>
                    Accéder au site
                  </Box>
                </CenteredLandingButton>
              </Stack>
            </Stack>
          </CenteredMaxWidthContainer>
        ))}
      </Stack>
    </>
  )
}
