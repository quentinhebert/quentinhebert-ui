import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import styles from "../../../styles/TextShine.module.css"
import { Box, Stack, useMediaQuery } from "@mui/material"
import GradientTitleCard from "../../ReusableComponents/cards/gradient-title-card"
import BodyText from "../../ReusableComponents/text/body-text"
import StrokeText from "../../ReusableComponents/text/stroke-text"
import CenteredLandingButton from "../../ReusableComponents/buttons/centered-landing-button"
import ImageCard from "../../ReusableComponents/cards/image-card"

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
    keywords: ["site web", "UX", "back-office", "intégration"],
    description:
      "Mathias Mortelmans est un jeune vidéaste belge. Il réalise des vidéos corporate mais il est surtout actif dans le monde de la nuit et de la fête. Enfin, il partage les vidéos de ses voyages les plus fous ! Il m'a contacté pour lui créer un site sur-mesure.",
  },
  {
    name: "Mon site",
    link: "https://quentinhebert.com",
    img: "/medias/quentinhebert.jpg",
    keywords: ["site web", "UX", "back-office", "intégration"],
    description:
      "Eh oui, mon site web est l'une de mes plus belles créations. J'y ai passé des milliers d'heures, entre le logo, la charte graphique, les typographies, les photos, les photo-montages, le contenu vidéo, le contenu textuel, les fonctionnalités, l'expérience utilisateur, le back-office et ma base de données... Je suis fier de le présenter dans mes projets.",
  },
  {
    name: "La Manekine",
    link: "https://www.lamanekine.fr",
    img: "/medias/manekine.jpg",
    keywords: ["pages web", "refonte graphique", "intégration"],
    description:
      "Durant un stage de 6 mois en agence de développement web, j'ai eu l'occasion de refondre la page d'accueil et la page de leurs spectacles de leur site. J'ai mis en place un caroussel automatique en fonction des sorties du mois, et une barre de navigation dynamique selon le scroll de la page.",
  },
  {
    name: "RM Paint",
    link: "#",
    img: "/medias/rmpaint.jpg",
    keywords: ["landing page", "création de contenus 360°"],
    description:
      "Durant un stage de 6 mois en agence de développement web, j'ai eu l'occasion de déveloper une landing page pour RM Paint, filliale de la mutlinationale BASF. Il s'agissait de soumettre 3 couleurs de peintures rouges pour des coques de voiture. J'ai dû créer des animations 360° de coques mettant en relief les reflets des 3 peintures, ainsi que l'intégration de ses contenus à la page. J'ai également mis en place un formulaire de vote.",
  },
]

export default function WebsitesPortfolio(props) {
  const desktop = useMediaQuery((theme) => theme.breakpoints.up("md"))

  return (
    <>
      <MediumTitle
        preventTransitionOut={desktop}
        textAlign="center"
        className={styles.shine}
        fontFamily="Zacbel X"
        letterSpacing={1}
        lineHeight={{ xs: "15vw", sm: "10vw" }}
      >
        <StrokeText>Mes projets</StrokeText>
      </MediumTitle>

      <Stack gap="10rem" margin="5rem 0 15rem">
        {CLIENTS.map((client, key) => (
          <CenteredMaxWidthContainer pixels="1200px" percents="80%" key={key}>
            <Stack
              zIndex={1}
              flexDirection={
                key % 2 === 0
                  ? { xs: "column", md: "row" }
                  : { xs: "column", md: "row-reverse" }
              }
              sx={{
                alignItems: "stretch",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", md: "49%" },
                  justifyContent: "center",
                }}
              >
                <ImageCard img={client.img} preventTransitionOut />
              </Stack>
              <Stack
                zIndex={3}
                alignItems="center"
                gap={3}
                sx={{
                  width: { xs: "100%", md: "49%" },
                  marginRight: { xs: 0, md: key % 2 === 0 ? 0 : "2%" },
                  marginLeft: { xs: 0, md: key % 2 === 0 ? "2%" : 0 },
                }}
              >
                <GradientTitleCard
                  preventTransitionOut={desktop}
                  bgcolor="transparent"
                  textTransform="uppercase"
                  fontFamily="Zacbel X"
                  letterSpacing={2}
                  fontSize="2rem"
                  className={styles.shine}
                >
                  {client.name}
                </GradientTitleCard>
                <BodyText preventTransitionOut={desktop}>
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

                <Stack sx={{ width: { xs: "100%", md: "49%" } }}>
                  <ImageCard
                    img={client.img}
                    display={{ xs: "flex", md: "none" }}
                    width={{ xs: "100%", md: "49%" }}
                    minHeight={{ xs: "200px", sm: "400px" }}
                  />
                </Stack>
                <BodyText preventTransitionOut={desktop} textAlign="justify">
                  {client.description}
                </BodyText>
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
