import { useEffect, useState } from "react"
import {
  Box,
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

export default function MasonryImageList() {
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
  const [videoClicked, setVideoClicked] = useState(null)
  const handleCloseVideoPlayer = () => {
    setVideoClicked(null)
    setOpenVideoPlayer(false)
  }

  const md = useMediaQuery((theme) => theme.breakpoints.down("md"))
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const itemData = [
    {
      img: "/medias/event-cover.png",
      title: "Baptême d'Elio",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=8fhZVuXzRgs",
    },
    {
      img: "/medias/event-cover-2.png",
      title: "Élections Mademoiselle Aube 2017",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=m7yUDcryETo",
    },
    {
      img: "/medias/associations-cover-2.png",
      title: "Film d'étudiants de l'ESCOM",
      type: "Association",
      url: "https://www.youtube.com/watch?v=S7m4Rg-1oOo",
    },
    {
      img: "/medias/tryptique-short-film.png",
      title: "Amour à l'Horizon",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=Zf_f7a-GTPo",
    },
    {
      img: "/medias/aqua.png",
      title: "Aqua",
      type: "Clip",
      url: "https://youtu.be/S-Ncwv9iZoc",
    },
    {
      img: "/medias/associations-cover.png",
      title: "Les Cordées de la Réussite",
      type: "Association",
      url: "https://www.youtube.com/watch?v=Ti9E1TS1RXU",
    },
    {
      img: "/medias/trois-secondes.png",
      title: "Trois Secondes",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=TMVO8jUp_ps",
    },
    {
      img: "/medias/tryptique-corporate.png",
      title: "Andrea Martins Photography",
      type: "Entreprise",
      url: "https://youtu.be/yWneBeEp9QU",
    },
    {
      img: "/medias/corporate-cover.png",
      title: "Levée de fonds pour Wideop",
      type: "Entreprise",
      url: "https://www.youtube.com/watch?v=sQHwRCq-gWk",
    },
    {
      img: "/medias/madrid.jpg",
      title: "Madrid",
      type: "Voyage",
      url: "https://www.youtube.com/watch?v=AG8B3CXIuhI",
    },
    {
      img: "/medias/stormer.png",
      title: "But Nobody Wants To Die",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=aIlXVjQC0hQ",
    },
    {
      img: "/medias/w-cine.png",
      title: "Pas D'Ciné",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=EZwvsyqKyOw",
    },
    {
      img: "/medias/w-tete.png",
      title: "Pas La Tête À Ça",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=n6Y2zAgmBfk",
    },
    {
      img: "/medias/w-casa.png",
      title: "Casa",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=HZRIUVLQeOo",
    },
    {
      img: "/medias/fleur.png",
      title: "Fleur",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=MwJfXBeJqGg",
    },
    {
      img: "/medias/saint-valentin.png",
      title: "Bonne Saint-Valentin (à tous)",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=oKsWR5-oXEM",
    },
    {
      img: "/medias/andrea-2.png",
      title: "Andrea Martins Photography",
      type: "Entreprise",
      url: "https://www.youtube.com/watch?v=Mp1K5KPwTs8",
    },
    {
      img: "/medias/nfps.png",
      title: "Ne Fêtes Pas Semblant",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=UXdsQeKJuIo",
    },
    {
      img: "/medias/mca-2018.png",
      title: "Mademoiselle Champagne-Ardenne 2018",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=hIjCGI4KjV0",
    },
    {
      img: "/medias/aurelie.png",
      title: "Aurélie F",
      type: "Portrait",
      url: "https://www.youtube.com/watch?v=Ipv9RANpV4k",
    },
    {
      img: "/medias/anouck.png",
      title: "Anouck D",
      type: "Portrait",
      url: "https://www.youtube.com/watch?v=JmjjzI6Q9fU",
    },
    {
      img: "/medias/mca-2017.png",
      title: "Mademoiselle Champagne Ardenne 2017",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=r6rj-oL28YI",
    },
    {
      img: "/medias/terreauriste.png",
      title: "Le Terreauriste",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=sK2k7vjEB9Y",
    },
    {
      img: "/medias/blablarap.png",
      title: "Bla Bla Rap",
      type: "Clip",
      url: "https://www.youtube.com/watch?v=NR2JMALmFdQ",
    },
    {
      img: "/medias/beguee.png",
      title: "Aftermovie Beguee Fest' 2018",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=sUTQ3GtMfKg",
    },
  ]

  const showreel = {
    img: "/medias/cta-cover.jpg",
    url: "https://www.youtube.com/watch?v=eAnDQRbDQ1c",
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
  }, [controls, inView])

  return (
    <>
      <Box sx={{ width: "100%" }} ref={ref}>
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
              borderRadius: "15px",
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
              height="300px"
              sx={{
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
                color="text.white"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                  fontFamily: "Ethereal",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                  letterSpacing: { xs: 0.25, sm: 1, md: 2.5 },
                  lineHeight: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                  textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                }}
              >
                – Découvrez ma –
              </Typography>
              <Typography
                color="secondary"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                  fontFamily: "Ethereal",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                  letterSpacing: { xs: 0.5, sm: 3, md: 4 },
                  lineHeight: { xs: "1.3rem", sm: "2rem", md: "3rem" },
                  textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                }}
              >
                Bande Démo
              </Typography>
            </Stack>
          </ImageListItem>
        </Link>

        <ImageList
          rowHeight={200}
          gap={8}
          cols={sm ? 1 : md ? 2 : 3}
          sx={{
            "& .MuiImageListItem-root": {
              marginBottom: "0 !important",
            },
          }}
        >
          {itemData.map((item, key) => (
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
                    borderRadius: "15px",
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
                      },
                    }}
                  >
                    <Typography
                      color="text.white"
                      fontWeight="bold"
                      sx={{
                        textAlign: "center",
                        fontFamily: "Ethereal",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                        letterSpacing: { xs: 0.25, sm: 1, md: 2.5 },
                        lineHeight: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                      }}
                    >
                      – {item.type} –
                    </Typography>
                    <Typography
                      color="secondary"
                      fontWeight="bold"
                      sx={{
                        textAlign: "center",
                        fontFamily: "Ethereal",
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "2rem" },
                        letterSpacing: { xs: 0.25, sm: 1, md: 2.5 },
                        lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                        textShadow: "2px 2px 4px rgb(0,0,0,0.5)",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </ImageListItem>
              </Link>
            </motion.div>
          ))}
        </ImageList>
      </Box>

      <VideoPlayer
        video={videoClicked}
        open={openVideoPlayer}
        handleClose={handleCloseVideoPlayer}
      />
    </>
  )
}
