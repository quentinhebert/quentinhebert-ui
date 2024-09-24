import { useContext, useEffect, useRef, useState } from "react"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import VideoPlayer from "../../../../Modals/video-player"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import useSWR from "swr"
import { fetchers } from "../../../../../services/public-fetchers"
import { FilmsHomePageContext } from "../../../../../contexts/PagesContexts"
import PillButton from "../../../../Buttons/pill-button"
import Pill from "../../../../Text/pill"
import translations from "../../../../../services/translation"
import { AppContext } from "../../../../../contexts/AppContext"
import { buildPublicURL } from "../../../../../services/utils"
import Link from "next/link"

// const DATA = [
//   {
//     img: "/medias/aviron.png",
//     title: "Club d'aviron de Soissons",
//     client: "Société Nautique Soissonnaise",
//     type: "Sport",
//     url: "https://youtu.be/2tmVOpWrzy4",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Fujifilm XT-3",
//       "Fujifilm 18-55mm f2.8-4",
//       "Ronin SC",
//       "Canon 5DIII",
//       "Sigma 70-200mm f2.8",
//     ],
//     description:
//       "Le club d'aviron de Soissons est fier de voir ses rameurs de tous âges sur le beau bassin d'entraînement de l'Aisne. Amateurs comme compétiteurs, c'est toujours dans l'esprit d'une grande famille que la SNS vous accueille au club !",
//     year: "2022",
//   },
//   {
//     img: "/medias/event-cover.png",
//     title: "Baptême d'Elio",
//     client: "Sophie & Jérémy",
//     type: "Événementiel",
//     url: "https://www.youtube.com/watch?v=8fhZVuXzRgs",
//     roles: ["Réalisateur", "Cadreur", "Monteur", "Ingénieur son"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Sigma 70-200mm f2.8",
//       "Steadicam mécanique",
//       "Zoom H4n Pro",
//       "Prodipe ST-1 Pro",
//     ],
//     description:
//       "À l'occasion de son baptême, voici quelques souvenirs du jour où Céline et Kévin sont respectivement faits marraine et parrain de l'adorable Elio.",
//     year: "2021",
//   },
//   {
//     img: "/medias/event-cover-2.png",
//     title: "Élections Mademoiselle Aube 2017",
//     client: "le Commité Mademoiselle Aube",
//     type: "Événementiel",
//     url: "https://www.youtube.com/watch?v=m7yUDcryETo",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "La fin du règne de Mademoiselle Aube 2016 venant à terme, il est venu le temps de céder la couronne. Retour sur les répétitions et les backstages de l'élection de 2017.",
//     year: "2017",
//   },
//   {
//     img: "/medias/associations-cover-2.png",
//     title: "Film d'étudiants de l'ESCOM",
//     type: "Association",
//     url: "https://www.youtube.com/watch?v=S7m4Rg-1oOo",
//     client: "les Machiav'Hell",
//     roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Sigma 70-200mm f2.8",
//       "Steadicam mécanique",
//       "Crosse d'épaule",
//       "Zoom H4n Pro",
//       "Prodipe ST-1 Pro",
//       "Rode BoomPole",
//       "Trépied",
//     ],
//     description:
//       "Avec mon association de production audiovisuelle, nous avons réalisé le film de la liste Les Machiav'Hell se présentant aux élections du Bureau Des Étudiants de l'ESCOM. Les étudiants partent pour le Week-End d'intégration de leur école, une épopée qui leur réserve bien des surprises...",
//     year: "2019",
//   },
//   {
//     img: "/medias/tryptique-short-film.png",
//     title: "Amour à l'Horizon",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=Zf_f7a-GTPo",
//     client: "Narco Prod",
//     roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Sigma 70-200mm f2.8",
//       "Steadicam mécanique",
//       "Crosse d'épaule",
//       "Zoom H4n Pro",
//       "Prodipe ST-1 Pro",
//       "Rode BoomPole",
//       "Trépied",
//     ],
//     description:
//       "Elise, une jeune écrivaine, va vivre un amour passionnel mais impossible au travers de sa nouvelle...",
//     year: "2019",
//   },
//   {
//     img: "/medias/aqua.png",
//     title: "Aqua",
//     type: "Clip",
//     url: "https://youtu.be/S-Ncwv9iZoc",
//     client: "Van Elie",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Trépied"],
//     description:
//       'Clip musical pour le titre "Aqua" écrit et interprété par Van Elie.',
//     year: "2018",
//   },
//   {
//     img: "/medias/associations-cover.png",
//     title: "Les Cordées de la Réussite",
//     type: "Association",
//     url: "https://www.youtube.com/watch?v=Ti9E1TS1RXU",
//     client: "Les Cordées de la Réussite",
//     roles: ["Réalisateur", "Cadreur", "Monteur", "Ingénieur du son"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Trépied",
//       "AudioTechnica ATR 3350",
//       "Zoom H4n",
//     ],
//     description:
//       "Présentation de l'assocation Les Cordées de La Réussite, association permettant à de jeunes collégiens de la ville de Troyes de découvrir la science de manière ludique et pratique.",
//     year: "2018",
//   },
//   {
//     img: "/medias/trois-secondes.png",
//     title: "Trois Secondes",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=TMVO8jUp_ps",
//     client: "Narco Prod",
//     roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Trépied",
//       "Crosse d'épaule",
//       "Zoom H4n",
//       "Prodipe ST-1 Pro",
//       "Rode BoomPole",
//     ],
//     description: "En quête de réponses, Malik se bat contre le temps...",
//     year: "2018",
//   },
//   {
//     img: "/medias/tryptique-corporate.png",
//     title: "Andrea Martins Photography",
//     type: "Entreprise",
//     url: "https://youtu.be/yWneBeEp9QU",
//     client: "Andrea Martins Photography",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Andréa est une photographe indépendante. Voilà quelques images qui présentent son univers et son travail.",
//     year: "2018",
//   },
//   {
//     img: "/medias/corporate-cover.png",
//     title: "Levée de fonds pour Wideop",
//     type: "Entreprise",
//     url: "https://www.youtube.com/watch?v=sQHwRCq-gWk",
//     client: "Wideop S.A.S.",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Wideop est une jeune Start-Up auboise dont l'ambition est d'agréger la demande de shooting photo avec l'offre abondante des photographes professionnels, et ce, de manière totalement éthique pour les photographes. Découvrez la vidéo de présentation pour les potentiels investisseurs !",
//     year: "2022",
//   },
//   {
//     img: "/medias/madrid.jpg",
//     title: "Madrid",
//     type: "Voyage",
//     url: "https://www.youtube.com/watch?v=AG8B3CXIuhI",
//     client: "les souvenirs",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description: "Quelques images de mon erasmus en Espagne : Madrid !",
//     year: "2019",
//   },
//   {
//     img: "/medias/stormer.png",
//     title: "But Nobody Wants To Die",
//     type: "Clip",
//     url: "https://www.youtube.com/watch?v=aIlXVjQC0hQ",
//     client: "Størmer",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     description:
//       "Clip techno d'une production musicale originale, by Størmer.",
//     year: "2019",
//   },
//   {
//     img: "/medias/w-cine.png",
//     title: "Pas D'Ciné",
//     type: "Clip",
//     url: "https://www.youtube.com/watch?v=EZwvsyqKyOw",
//     client: "W",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8"],
//     year: "2019",
//   },
//   {
//     img: "/medias/w-tete.png",
//     title: "Pas La Tête À Ça",
//     type: "Clip",
//     url: "https://www.youtube.com/watch?v=n6Y2zAgmBfk",
//     client: "W",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Canon 50mm f1.8",
//       "Steadicam mécanique",
//     ],
//     year: "2019",
//   },
//   {
//     img: "/medias/w-casa.png",
//     title: "Casa",
//     type: "Clip",
//     url: "https://www.youtube.com/watch?v=HZRIUVLQeOo",
//     client: "W",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Steadicam mécanique",
//       "Crosse d'épaule",
//     ],
//     year: "2019",
//   },
//   {
//     img: "/medias/fleur.png",
//     title: "Fleur",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=MwJfXBeJqGg",
//     client: "Tangi SEZNEC / Narco Prod",
//     roles: [
//       "Co-scénariste",
//       "Co-réalisateur",
//       "Ingénieur du son",
//       "Co-monteur",
//     ],
//     gear: [
//       "Fujifilm XT-3",
//       "Fujifilm 18-55mm",
//       "Crosse d'épaule",
//       "Trépied",
//       "Zoom H4n",
//       "Rode BoomPole",
//       "Prodipe ST-1 Pro",
//     ],
//     description:
//       "Court-métrage sélectionné au TRÈS COURT Festival à l'occasion du DÉFI 48H. Sur le thème de l'écologie, découvrez la personnification des différents acteurs de l'écologie dans notre société actuelle.",
//     year: "2019",
//   },
//   {
//     img: "/medias/saint-valentin.png",
//     title: "Bonne Saint-Valentin (à tous)",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=oKsWR5-oXEM",
//     client: "Narco Prod",
//     roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Canon 50mm f1.8",
//       "Crosse d'épaule",
//       "Zoom H4n Pro",
//       "Prodipe ST-1 Pro",
//       "Rode BoomPole",
//       "Trépied",
//     ],
//     description: "Fêtons tous ensemble la Saint-Valentin !",
//     year: "2019",
//   },
//   {
//     img: "/medias/andrea-2.png",
//     title: "Andrea Martins Photography",
//     type: "Entreprise",
//     url: "https://www.youtube.com/watch?v=Mp1K5KPwTs8",
//     client: "Andrea Martins Photography",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Voilà la deuxième publicité que j'ai réalisée pour Andréa et son activité de photographe.",
//     year: "2019",
//   },
//   {
//     img: "/medias/nfps.png",
//     title: "Ne Fêtes Pas Semblant",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=UXdsQeKJuIo",
//     client: "Narco Prod",
//     roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Canon 50mm f1.8",
//       "Trépied",
//       "Crosse d'épaule",
//       "Zoom H4n",
//       "Prodipe ST-1 Pro",
//       "Rode BoomPole",
//     ],
//     description:
//       "Trois frères et soeurs vont tout faire pour célébrer les fêtes de fin d'année avec leur famille...",
//     year: "2017",
//   },
//   {
//     img: "/medias/mca-2018.png",
//     title: "Mademoiselle Champagne-Ardenne 2018",
//     type: "Événementiel",
//     url: "https://www.youtube.com/watch?v=hIjCGI4KjV0",
//     client: "le Commité Madesoiselle Champagne-Ardenne",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Teaser de l'élection de Mademoiselle Champagne-Ardenne 2018, et présentation des candiyears.",
//     year: "2017",
//   },
//   {
//     img: "/medias/aurelie.png",
//     title: "Aurélie F",
//     type: "Portrait",
//     url: "https://www.youtube.com/watch?v=Ipv9RANpV4k",
//     client: "Aurélie F",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Portrait d'Aurélie, candiyear aux élections de Mademoiselle Champagne-Ardenne 2018.",
//     year: "2017",
//   },
//   {
//     img: "/medias/anouck.png",
//     title: "Anouck D",
//     type: "Portrait",
//     url: "https://www.youtube.com/watch?v=JmjjzI6Q9fU",
//     client: "Anouck D",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Portrait d'Anouck, candiyear aux élections de Mademoiselle Champagne-Ardenne 2018.",
//     year: "2017",
//   },
//   {
//     img: "/medias/mca-2017.png",
//     title: "Mademoiselle Champagne Ardenne 2017",
//     type: "Événementiel",
//     url: "https://www.youtube.com/watch?v=r6rj-oL28YI",
//     client: "le Commité Mademoiselle Champagne-Ardenne",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description:
//       "Teaser des élections de Mademoiselle Champagne-Ardenne 2017.",
//     year: "2017",
//   },
//   {
//     img: "/medias/terreauriste.png",
//     title: "Le Terreauriste",
//     type: "Court-métrage",
//     url: "https://www.youtube.com/watch?v=sK2k7vjEB9Y",
//     client: "Narco Prod",
//     roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur", "Commédien"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Canon 50mm f1.8",
//       "Trépied",
//       "Zoom H4n",
//       "Prodipe ST-1 Pro",
//     ],
//     description:
//       "Breaking News : Nouvelle attaque du Terreauriste. Une fois de plus, notre société est en danger...",
//     year: "2016",
//   },
//   {
//     img: "/medias/blablarap.png",
//     title: "Bla Bla Rap",
//     type: "Clip",
//     url: "https://www.youtube.com/watch?v=NR2JMALmFdQ",
//     client: "Van Elie / Moonkeys",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
//     description: `7 heures, 1 clip, 1 prod', 1 rappeur, des contraintes ! 🌴🌽

//       Contraintes du rush :
//       Thème : transports en commun
//       Mots : trident, chocolatine, Benalla, sagouin, femme au volant.
//       Punchline : « Boire ou conduire, à la base on devrait choisir, déboires de la vie, tourne la page, mais n’risque pas ta vie. »`,
//     year: "2018",
//   },
//   {
//     img: "/medias/beguee.png",
//     title: "Aftermovie Beguee Fest' 2018",
//     type: "Événementiel",
//     url: "https://www.youtube.com/watch?v=sUTQ3GtMfKg",
//     client: "Beguee Fest'",
//     roles: ["Réalisateur", "Cadreur", "Monteur"],
//     gear: [
//       "Canon 5DIII",
//       "Sigma 24-70mm f2.8",
//       "Canon 50mm f1.8",
//       "Steadicam mécanique",
//       "Trépied",
//     ],
//     description:
//       "Retour en image sur la 2ème édition du Beguee Fest ! Le festival picard du reggae et de la bonne vibe !",
//     year: "2018",
//   },
// ]

const FilterSection = ({ handleFilter, activeFilter }) => {
  const { lang } = useContext(AppContext)
  return (
    <Stack className="full-width flex-center">
      <Typography
        component="div"
        sx={{
          textAlign: "center",
          whiteSpace: "break-spaces",
          wordBreak: "break-word",
        }}
      >
        {translations.films.portfolio.categories.map((category, key) => (
          <Pill
            key={key}
            animDelay={key}
            cursor="pointer"
            scaleUpOnHover
            boxShadowOnHover
            margin={{ xs: "0.25rem", md: "0.5rem" }}
            color={
              activeFilter === category.id
                ? "black"
                : (theme) => theme.palette.secondary.main
            }
            bgColor={
              activeFilter === category.id
                ? (theme) => theme.palette.secondary.main
                : "transparent"
            }
            border={(theme) => `1px solid ${theme.palette.secondary.main}`}
            onClick={() => handleFilter(category.id)}
          >
            {category[lang]}
          </Pill>
        ))}
      </Typography>
    </Stack>
  )
}
const PlayBtn = () => (
  <Box
    sx={{
      position: "absolute",
      color: (theme) => theme.palette.text.secondary,
      opacity: 0,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 3,
      fontSize: "1.5rem",
      textTransform: "uppercase",
      transition: ".1s ease-in-out",
    }}
  >
    <PlayCircleIcon
      sx={{
        fontSize: "4rem",
      }}
    />
  </Box>
)
const Thumbnail = (props) => (
  <Box
    component="img"
    width="100%"
    height="100%"
    sx={{
      borderRadius: "100%",
      zIndex: 0,
      objectFit: "cover",
      objectPosition: "50% 50%",
      WebkitTransition: ".4s ease-in-out",
      msTransition: ".4s ease-in-out",
      transition: ".4s ease-in-out",
    }}
    {...props}
  />
)
const ImgList = (props) => <Grid container {...props} spacing="1rem" />

const ImgListItem = (props) => (
  <Grid
    item
    xs={6}
    md={4}
    key={props.index}
    sx={{
      position: "relative",
      cursor: "pointer",
      aspectRatio: "1",
      height: "100%",
      borderRadius: "100%",
      "&:hover": {
        "& .MuiBox-root": {
          transform: "scale(1.05)",
          filter: "grayscale(1)",
        },
        "& .MuiContainer-root": {
          background: "rgb(0, 0, 0, 0.4)",
          "& .MuiTypography-root": {
            opacity: 0,
            textShadow: "none",
          },
          "& .MuiBox-root": {
            textShadow: "none",
            filter: "none",
            opacity: 1,
          },
        },
      },
    }}
    {...props}
  />
)
const Overlay = (props) => (
  <Container
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      zIndex: 100,
      padding: ".5rem",
      background: `linear-gradient(120deg, rgb(0, 0, 0, 0.2) 50%, rgb(0, 0, 0, 0.9) 100%)`,
      borderRadius: "100%",
    }}
    {...props}
  />
)
const VideoTitle = (props) => (
  <Typography
    fontFamily="POPFINE"
    color="secondary"
    sx={{
      textAlign: "center",
      fontSize: {
        xs: "1.8rem",
        sm: "2rem",
        md: "2.5rem",
      },
      letterSpacing: "2px",
      lineHeight: {
        xs: "1.8rem",
        sm: "2rem",
        md: "3rem",
      },
      textShadow: "2px 2px 10px rgb(0,0,0,0.5)",
      transition: ".1s ease-in-out",
    }}
    {...props}
  />
)

export default function VideoList({ height, setHeight, ...props }) {
  const {} = props

  const { lang } = useContext(AppContext)

  /********* StaticProps cached at build time **********/
  const { staticData } = useContext(FilmsHomePageContext)
  let data = staticData.films

  /********** SWR revalidation while first returning cached static data **********/
  const swr = useSWR(`films`, async () => fetchers.films(), {
    fallbackData: data, // cached data initially returned by SWR
    revalidateOnMount: true,
  })
  if (!!swr.data) data = swr.data // When user loads the page, data is updated by fallbackData (cached === static data), then updated by fetched up-to-date data

  /********** CONSTANTS **********/
  const initialLimit = 6

  /********** USE STATES **********/
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
  const [videoClicked, setVideoClicked] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredData, setFilteredData] = useState(data)
  const [hasMoreFilms, setHasMoreFilms] = useState(false)
  const [limit, setLimit] = useState(initialLimit)

  /********** REFS **********/
  const heightRef = useRef()

  /********** HANDLERS **********/
  const handleCloseVideoPlayer = () => {
    setVideoClicked(null)
    setOpenVideoPlayer(false)
  }
  const handleFilter = (categoryId) => {
    setActiveFilter(categoryId)
    if (categoryId === "all" && data === filteredData) return
    // Systematically remove the show more button
    setHasMoreFilms(false)
    // Hide all the videos (UX transition)
    controls.start("hidden")
    // After the videos disappeared, reset filtered data
    setTimeout(() => {
      setFilteredData(null)
    }, 500)
    // Trick to conserve the heihgt for the parent AnimateHeight component
    setHeight(heightRef?.current?.clientHeight)
    // Finally handle the new filtered data
    setTimeout(() => {
      let localData = data
      if (categoryId === "all") setFilteredData(localData)
      else
        localData = localData.filter(
          (item) => item.type.label_id === categoryId
        )
      setFilteredData(localData)
      setHeight("auto")
    }, 500)
  }
  const handleShowMore = () => {
    if (limit === initialLimit) {
      setLimit(1000)
    } else {
      setLimit(initialLimit)
      setTimeout(() => {
        scrollTo(TopRef)
      }, 200)
    }
  }
  const handleVideoClick = (item) => {
    setVideoClicked(item)
    setOpenVideoPlayer(true)
  }

  /********** USE EFFECTS **********/
  // Each time data is filtered, we update the state to display or the the show more button
  useEffect(() => {
    if (filteredData && filteredData.length)
      setHasMoreFilms(filteredData.length > 6)
    else setHasMoreFilms(false)
  }, [filteredData])

  // Each time we fetch up to date data, we populate filteredData
  useEffect(() => {
    if (data) setFilteredData(data)
    setHeight("auto")
  }, [data])

  /********** SCROLL UTILS **********/
  const TopRef = useRef(null)
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: key / 10,
      },
    },
    hidden: { opacity: 0 },
  })
  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView, limit, filteredData])

  /********** RENDER **********/
  if (!data || !data?.length) return <></>
  return (
    <>
      <Stack
        ref={TopRef}
        sx={{
          scrollMarginTop: "80px",
        }}
      />

      <Stack
        ref={ref}
        width="100%"
        maxWidth="800px"
        margin="auto"
        padding="0 0 2rem"
        gap={2}
      >
        <FilterSection
          ref={heightRef}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        />

        {activeFilter === "wedding" ? (
          <Link
            href="/wedding"
            passHref
            style={{ margin: "auto" }}
            target="_blank"
          >
            <PillButton
              margin="1rem auto"
              width="auto"
              endIcon={<ArrowRightAltIcon />}
            >
              💍 En savoir plus sur les films de mariage
            </PillButton>
          </Link>
        ) : null}

        <ImgList>
          {filteredData?.length
            ? filteredData?.map((item, key) => {
                if (key < limit)
                  return (
                    <ImgListItem
                      key={item.id}
                      onClick={() => handleVideoClick(item)}
                    >
                      <motion.div
                        key={key}
                        initial="hidden"
                        variants={variants(key)}
                        animate={controls}
                        style={{
                          width: "100%",
                          height: "calc(100% - 1rem)",
                          overflow: "hidden",
                          borderRadius: "100%",
                          display: "block",
                          transform: "translateZ(0)",
                        }}
                      >
                        <Thumbnail
                          src={buildPublicURL(item.thumbnail_path)}
                          srcSet={buildPublicURL(item.thumbnail_path)}
                          alt={item.title}
                        />
                        <Overlay>
                          <PlayBtn />
                          <VideoTitle>{item.title}</VideoTitle>
                        </Overlay>
                      </motion.div>
                    </ImgListItem>
                  )
              })
            : null}
        </ImgList>
        <Stack
          width="100%"
          className="flex-center"
          display={hasMoreFilms ? "flex" : "none"}
        >
          <Box component="div">
            <PillButton
              onClick={handleShowMore}
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{ rotate: limit === initialLimit ? "0deg" : "180deg" }}
                />
              }
            >
              {limit === initialLimit
                ? translations.films.portfolio.showMore[lang]
                : translations.films.portfolio.showLess[lang]}
            </PillButton>
          </Box>
        </Stack>
      </Stack>

      <VideoPlayer
        video={videoClicked}
        open={openVideoPlayer}
        handleClose={handleCloseVideoPlayer}
      />
    </>
  )
}
