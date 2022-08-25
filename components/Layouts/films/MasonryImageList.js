import { useState } from "react"
import {
  Box,
  ImageList,
  ImageListItem,
  Link,
  Stack,
  Typography,
} from "@mui/material"
import VideoPlayer from "../../Modals/video-player"

export default function MasonryImageList() {
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
  const [videoClicked, setVideoClicked] = useState(null)
  const handleCloseVideoPlayer = () => {
    setVideoClicked(null)
    setOpenVideoPlayer(false)
  }

  const itemData = [
    {
      img: "/medias/tryptique-short-film.png",
      title: "Amour à l'Horizon",
      type: "Court-métrage",
      url: "https://www.youtube.com/watch?v=Zf_f7a-GTPo",
    },
    {
      img: "/medias/associations-cover.png",
      title: "Les Cordées de la Réussite",
      type: "Association",
      url: "",
    },
    {
      img: "/medias/associations-cover-2.png",
      title: "Film d'étudiants de l'ESCOM",
      type: "Association",
      url: "",
    },
    {
      img: "/medias/aqua.png",
      title: "Aqua",
      type: "Clip",
      url: "https://youtu.be/S-Ncwv9iZoc",
    },
    {
      img: "/medias/event-cover-2.png",
      title: "Élections Mademoiselle Aube 2017",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=m7yUDcryETo",
    },
    {
      img: "/medias/beguee.png",
      title: "Aftermovie Beguee Fest' 2018",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=sUTQ3GtMfKg",
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
      img: "/medias/event-cover.png",
      title: "Baptême d'Elio",
      type: "Événementiel",
      url: "https://www.youtube.com/watch?v=8fhZVuXzRgs",
    },
  ]

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ImageList
          // variant="masonry"
          rowHeight={200}
          cols={3}
          gap={8}
          sx={{
            "& .MuiImageListItem-root": {
              marginBottom: "0 !important",
            },
          }}
        >
          {itemData.map((item) => (
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
                {/* <Box
                  component="img"
                  width="100%"
                  height="200px"
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  sx={{
                    WebkitTransition: "transform 0.4s ease-in-out",
                    msTransition: "transform 0.4s ease-in-out",
                    transition:
                      "transform 0.4s ease-in-out, filter 0.4s ease-in-out",
                  }}
                /> */}
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
