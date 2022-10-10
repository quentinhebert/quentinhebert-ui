import { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import VideoPlayer from "../../Modals/video-player"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"

export default function MasonryImageList() {
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
  const [videoClicked, setVideoClicked] = useState(null)
  const initialLimit = 6
  const [limit, setLimit] = useState(initialLimit)
  const handleCloseVideoPlayer = () => {
    setVideoClicked(null)
    setOpenVideoPlayer(false)
  }

  const md = useMediaQuery((theme) => theme.breakpoints.down("md"))
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const itemData = [
    {
      img: "/medias/aviron.png",
      title: "Club d'aviron de Soissons",
      client: "Société Nautique Soissonnaise",
      type: "Sport",
      url: "https://youtu.be/2tmVOpWrzy4",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Fujifilm XT-3",
        "Fujifilm 18-55mm f2.8-4",
        "Ronin SC",
        "Canon 5DIII",
        "Sigma 70-200mm f2.8",
      ],
      description:
        "Le club d'aviron de Soissons est fier de voir ses rameurs de tous âges sur le beau bassin d'entraînement de l'Aisne. Amateurs comme compétiteurs, c'est toujours dans l'esprit d'une grande famille que la SNS vous accueille au club !",
      date: "2022",
    },
    {
      img: "/medias/event-cover.png",
      title: "Baptême d'Elio",
      client: "Sophie & Jérémy",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=8fhZVuXzRgs",
      roles: ["Réalisateur", "Cadreur", "Monteur", "Ingénieur son"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Sigma 70-200mm f2.8",
        "Steadicam mécanique",
        "Zoom H4n Pro",
        "Prodipe ST-1 Pro",
      ],
      description:
        "À l'occasion de son baptême, voici quelques souvenirs du jour où Céline et Kévin sont respectivement faits marraine et parrain de l'adorable Elio.",
      date: "2021",
    },
    {
      img: "/medias/event-cover-2.png",
      title: "Élections Mademoiselle Aube 2017",
      client: "le Commité Mademoiselle Aube",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=m7yUDcryETo",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "La fin du règne de Mademoiselle Aube 2016 venant à terme, il est venu le temps de céder la couronne. Retour sur les répétitions et les backstages de l'élection de 2017.",
      date: "2017",
    },
    {
      img: "/medias/associations-cover-2.png",
      title: "Film d'étudiants de l'ESCOM",
      type: "Association",
      url: "https://www.youtube.com/watch?v=S7m4Rg-1oOo",
      client: "les Machiav'Hell",
      roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Sigma 70-200mm f2.8",
        "Steadicam mécanique",
        "Crosse d'épaule",
        "Zoom H4n Pro",
        "Prodipe ST-1 Pro",
        "Rode BoomPole",
        "Trépied",
      ],
      description:
        "Avec mon association de production audiovisuelle, nous avons réalisé le film de la liste Les Machiav'Hell se présentant aux élections du Bureau Des Étudiants de l'ESCOM. Les étudiants partent pour le Week-End d'intégration de leur école, une épopée qui leur réserve bien des surprises...",
      date: "2019",
    },
    {
      img: "/medias/tryptique-short-film.png",
      title: "Amour à l'Horizon",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=Zf_f7a-GTPo",
      client: "Narco Prod",
      roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Sigma 70-200mm f2.8",
        "Steadicam mécanique",
        "Crosse d'épaule",
        "Zoom H4n Pro",
        "Prodipe ST-1 Pro",
        "Rode BoomPole",
        "Trépied",
      ],
      description:
        "Elise, une jeune écrivaine, va vivre un amour passionnel mais impossible au travers de sa nouvelle...",
      date: "2019",
    },
    {
      img: "/medias/aqua.png",
      title: "Aqua",
      type: "Clip",
      url: "https://youtu.be/S-Ncwv9iZoc",
      client: "Van Elie",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Trépied"],
      description:
        'Clip musical pour le titre "Aqua" écrit et interprété par Van Elie.',
      date: "2018",
    },
    {
      img: "/medias/associations-cover.png",
      title: "Les Cordées de la Réussite",
      type: "Association",
      url: "https://www.youtube.com/watch?v=Ti9E1TS1RXU",
      client: "Les Cordées de la Réussite",
      roles: ["Réalisateur", "Cadreur", "Monteur", "Ingénieur du son"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Trépied",
        "AudioTechnica ATR 3350",
        "Zoom H4n",
      ],
      description:
        "Présentation de l'assocation Les Cordées de La Réussite, association permettant à de jeunes collégiens de la ville de Troyes de découvrir la science de manière ludique et pratique.",
      date: "2018",
    },
    {
      img: "/medias/trois-secondes.png",
      title: "Trois Secondes",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=TMVO8jUp_ps",
      client: "Narco Prod",
      roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Trépied",
        "Crosse d'épaule",
        "Zoom H4n",
        "Prodipe ST-1 Pro",
        "Rode BoomPole",
      ],
      description: "En quête de réponses, Malik se bat contre le temps...",
      date: "2018",
    },
    {
      img: "/medias/tryptique-corporate.png",
      title: "Andrea Martins Photography",
      type: "Entreprise",
      url: "https://youtu.be/yWneBeEp9QU",
      client: "Andrea Martins Photography",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Andréa est une photographe indépendante. Voilà quelques images qui présentent son univers et son travail.",
      date: "2018",
    },
    {
      img: "/medias/corporate-cover.png",
      title: "Levée de fonds pour Wideop",
      type: "Entreprise",
      url: "https://www.youtube.com/watch?v=sQHwRCq-gWk",
      client: "Wideop S.A.S.",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Wideop est une jeune Start-Up auboise dont l'ambition est d'agréger la demande de shooting photo avec l'offre abondante des photographes professionnels, et ce, de manière totalement éthique pour les photographes. Découvrez la vidéo de présentation pour les potentiels investisseurs !",
      date: "2022",
    },
    {
      img: "/medias/madrid.jpg",
      title: "Madrid",
      type: "Voyage",
      url: "https://www.youtube.com/watch?v=AG8B3CXIuhI",
      client: "les souvenirs",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description: "Quelques images de mon erasmus en Espagne : Madrid !",
      date: "2019",
    },
    {
      img: "/medias/stormer.png",
      title: "But Nobody Wants To Die",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=aIlXVjQC0hQ",
      client: "Størmer",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      description:
        "Clip techno d'une production musicale originale, by Størmer.",
      date: "2019",
    },
    {
      img: "/medias/w-cine.png",
      title: "Pas D'Ciné",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=EZwvsyqKyOw",
      client: "W",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8"],
      date: "2019",
    },
    {
      img: "/medias/w-tete.png",
      title: "Pas La Tête À Ça",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=n6Y2zAgmBfk",
      client: "W",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Canon 50mm f1.8",
        "Steadicam mécanique",
      ],
      date: "2019",
    },
    {
      img: "/medias/w-casa.png",
      title: "Casa",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=HZRIUVLQeOo",
      client: "W",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Steadicam mécanique",
        "Crosse d'épaule",
      ],
      date: "2019",
    },
    {
      img: "/medias/fleur.png",
      title: "Fleur",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=MwJfXBeJqGg",
      client: "Tangi SEZNEC / Narco Prod",
      roles: [
        "Co-scénariste",
        "Co-réalisateur",
        "Ingénieur du son",
        "Co-monteur",
      ],
      gear: [
        "Fujifilm XT-3",
        "Fujifilm 18-55mm",
        "Crosse d'épaule",
        "Trépied",
        "Zoom H4n",
        "Rode BoomPole",
        "Prodipe ST-1 Pro",
      ],
      description:
        "Court-métrage sélectionné au TRÈS COURT Festival à l'occasion du DÉFI 48H. Sur le thème de l'écologie, découvrez la personnification des différents acteurs de l'écologie dans notre société actuelle.",
      date: "2019",
    },
    {
      img: "/medias/saint-valentin.png",
      title: "Bonne Saint-Valentin (à tous)",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=oKsWR5-oXEM",
      client: "Narco Prod",
      roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Canon 50mm f1.8",
        "Crosse d'épaule",
        "Zoom H4n Pro",
        "Prodipe ST-1 Pro",
        "Rode BoomPole",
        "Trépied",
      ],
      description: "Fêtons tous ensemble la Saint-Valentin !",
      date: "2019",
    },
    {
      img: "/medias/andrea-2.png",
      title: "Andrea Martins Photography",
      type: "Entreprise",
      url: "https://www.youtube.com/watch?v=Mp1K5KPwTs8",
      client: "Andrea Martins Photography",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Voilà la deuxième publicité que j'ai réalisée pour Andréa et son activité de photographe.",
      date: "2019",
    },
    {
      img: "/medias/nfps.png",
      title: "Ne Fêtes Pas Semblant",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=UXdsQeKJuIo",
      client: "Narco Prod",
      roles: ["Co-scénariste", "Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Canon 50mm f1.8",
        "Trépied",
        "Crosse d'épaule",
        "Zoom H4n",
        "Prodipe ST-1 Pro",
        "Rode BoomPole",
      ],
      description:
        "Trois frères et soeurs vont tout faire pour célébrer les fêtes de fin d'année avec leur famille...",
      date: "2017",
    },
    {
      img: "/medias/mca-2018.png",
      title: "Mademoiselle Champagne-Ardenne 2018",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=hIjCGI4KjV0",
      client: "le Commité Madesoiselle Champagne-Ardenne",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Teaser de l'élection de Mademoiselle Champagne-Ardenne 2018, et présentation des candidates.",
      date: "2017",
    },
    {
      img: "/medias/aurelie.png",
      title: "Aurélie F",
      type: "Portrait",
      url: "https://www.youtube.com/watch?v=Ipv9RANpV4k",
      client: "Aurélie F",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Portrait d'Aurélie, candidate aux élections de Mademoiselle Champagne-Ardenne 2018.",
      date: "2017",
    },
    {
      img: "/medias/anouck.png",
      title: "Anouck D",
      type: "Portrait",
      url: "https://www.youtube.com/watch?v=JmjjzI6Q9fU",
      client: "Anouck D",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Portrait d'Anouck, candidate aux élections de Mademoiselle Champagne-Ardenne 2018.",
      date: "2017",
    },
    {
      img: "/medias/mca-2017.png",
      title: "Mademoiselle Champagne Ardenne 2017",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=r6rj-oL28YI",
      client: "le Commité Mademoiselle Champagne-Ardenne",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description:
        "Teaser des élections de Mademoiselle Champagne-Ardenne 2017.",
      date: "2017",
    },
    {
      img: "/medias/terreauriste.png",
      title: "Le Terreauriste",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=sK2k7vjEB9Y",
      client: "Narco Prod",
      roles: ["Scénariste", "Réalisateur", "Cadreur", "Monteur", "Commédien"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Canon 50mm f1.8",
        "Trépied",
        "Zoom H4n",
        "Prodipe ST-1 Pro",
      ],
      description:
        "Breaking News : Nouvelle attaque du Terreauriste. Une fois de plus, notre société est en danger...",
      date: "2016",
    },
    {
      img: "/medias/blablarap.png",
      title: "Bla Bla Rap",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=NR2JMALmFdQ",
      client: "Van Elie / Moonkeys",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: ["Canon 5DIII", "Sigma 24-70mm f2.8", "Steadicam mécanique"],
      description: `7 heures, 1 clip, 1 prod', 1 rappeur, des contraintes ! 🌴🌽

        Contraintes du rush : 
        Thème : transports en commun
        Mots : trident, chocolatine, Benalla, sagouin, femme au volant.
        Punchline : « Boire ou conduire, à la base on devrait choisir, déboires de la vie, tourne la page, mais n’risque pas ta vie. »`,
      date: "2018",
    },
    {
      img: "/medias/beguee.png",
      title: "Aftermovie Beguee Fest' 2018",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=sUTQ3GtMfKg",
      client: "Beguee Fest'",
      roles: ["Réalisateur", "Cadreur", "Monteur"],
      gear: [
        "Canon 5DIII",
        "Sigma 24-70mm f2.8",
        "Canon 50mm f1.8",
        "Steadicam mécanique",
        "Trépied",
      ],
      description:
        "Retour en image sur la 2ème édition du Beguee Fest ! Le festival picard du reggae et de la bonne vibe !",
      date: "2018",
    },
  ]

  const showreel = {
    img: "/medias/cta-cover.jpg",
    title: "Bande démo",
    type: "Bande démo",
    url: "https://www.youtube.com/watch?v=eAnDQRbDQ1c",
    date: "2022",
  }

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
        delay: sm ? key / (itemData.length * 3) : key / 10,
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
  }, [controls, inView, limit])

  return (
    <>
      <Stack
        ref={TopRef}
        sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
      />
      <Box sx={{ width: "100%" }} ref={ref}>
        <motion.div
          initial="hidden"
          variants={variants(3)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Link
            onClick={() => {
              setVideoClicked(showreel)
              setOpenVideoPlayer(true)
            }}
          >
            <ImageListItem
              sx={{
                width: "100%",
                cursor: "pointer",
                overflow: "hidden",
                marginTop: { xs: "1rem", md: 0 },
                "&:hover": {
                  "& .MuiBox-root": {
                    transform: "scale(1.1)",
                    filter: "grayscale(1)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={showreel.img}
                srcSet={showreel.img}
                alt="Bande Démo"
                width="100%"
                sx={{
                  height: { xs: "200px", md: "300px" },
                  zIndex: 0,
                  objectFit: "cover",
                  objectPosition: "50% 30%",
                  WebkitTransition: "transform 0.4s ease-in-out",
                  msTransition: "transform 0.4s ease-in-out",
                  transition:
                    "transform 0.4s ease-in-out, filter 0.4s ease-in-out",
                }}
              />
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  zIndex: 100,
                  WebkitTransition: "background 200ms linear",
                  msTransition: "background 200ms linear",
                  transition: "background 200ms linear",
                  padding: "1rem",
                  background: "rgb(0, 0, 0, 0.2)",
                  "&:hover": {
                    background: "rgb(0, 0, 0, 0.4)",
                  },
                }}
              >
                <Typography
                  color="secondary"
                  fontWeight="bold"
                  sx={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                    lineHeight: { xs: "1.3rem", sm: "2rem", md: "3rem" },
                    textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                  }}
                >
                  Bande Démo 2022
                </Typography>
              </Stack>
            </ImageListItem>
          </Link>
        </motion.div>

        <ImageList
          rowHeight={sm ? 150 : 200}
          gap={0}
          cols={sm ? 1 : md ? 2 : 3}
          sx={{
            marginTop: "-6px",
            marginBottom: "2rem",
            "& .MuiImageListItem-root": {
              marginBottom: "0 !important",
            },
          }}
        >
          {itemData.map((item, key) => {
            if (key < limit)
              return (
                <motion.div
                  initial="hidden"
                  variants={variants(key)}
                  animate={controls}
                  style={{ width: "100%" }}
                  key={key}
                >
                  <Link
                    onClick={() => {
                      setVideoClicked(item)
                      setOpenVideoPlayer(true)
                    }}
                    key={item.img}
                  >
                    <ImageListItem
                      sx={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        overflow: "hidden",
                        "&:hover": {
                          "& .MuiBox-root": {
                            transform: "scale(1.1)",
                            filter: "grayscale(1)",
                          },
                        },
                      }}
                      key={item.img}
                    >
                      <Box
                        component="img"
                        src={item.img}
                        srcSet={item.img}
                        alt={item.title}
                        width="100%"
                        height="100%"
                        sx={{
                          zIndex: 0,
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                          WebkitTransition: "transform 0.4s ease-in-out",
                          msTransition: "transform 0.4s ease-in-out",
                          transition:
                            "transform 0.4s ease-in-out, filter 0.4s ease-in-out",
                        }}
                      />
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          zIndex: 100,
                          WebkitTransition: "background 200ms linear",
                          msTransition: "background 200ms linear",
                          transition: "background 200ms linear",
                          padding: "1rem",
                          background: "rgb(0, 0, 0, 0.2)",
                          "&:hover": {
                            background: "rgb(0, 0, 0, 0.4)",
                            "& .MuiTypography-root": {
                              opacity: 0,
                              textShadow: "none",
                            },
                            "& .MuiBox-root": {
                              textShadow: "none",
                              filter: "none",
                              opacity: 1,
                              transition: "opacity 0.4s ease-in-out",
                            },
                          },
                        }}
                      >
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
                            fontFamily: "Helmet",
                            fontSize: "1.5rem",
                            textTransform: "uppercase",
                          }}
                        >
                          <PlayCircleOutlineIcon sx={{ fontSize: "4rem" }} />
                        </Box>
                        <Typography
                          color="secondary"
                          fontStyle="italic"
                          fontFamily="Ethereal"
                          letterSpacing={1}
                          sx={{
                            textAlign: "center",
                            textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                          }}
                        >
                          {item.type}
                        </Typography>
                        <Typography
                          color="secondary"
                          fontWeight="bold"
                          sx={{
                            textAlign: "center",
                            fontSize: {
                              xs: "1rem",
                              sm: "1.2rem",
                              md: "1.7rem",
                            },
                            lineHeight: {
                              xs: "1.3rem",
                              sm: "1.5rem",
                              md: "2rem",
                            },
                            textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </ImageListItem>
                  </Link>
                </motion.div>
              )
          })}
        </ImageList>

        <Stack width="100%">
          <Button
            color="secondary"
            variant="contained"
            onClick={(e) => {
              if (limit === initialLimit) {
                setLimit(1000)
              } else {
                setLimit(initialLimit)
                setTimeout(() => {
                  scrollTo(TopRef)
                }, 200)
              }
            }}
            endIcon={
              <KeyboardArrowDownIcon
                sx={{ rotate: limit === initialLimit ? "0deg" : "180deg" }}
              />
            }
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            {limit === initialLimit ? "Afficher plus" : "Afficher moins"}
          </Button>
        </Stack>
      </Box>

      <VideoPlayer
        video={videoClicked}
        open={openVideoPlayer}
        handleClose={handleCloseVideoPlayer}
      />
    </>
  )
}
