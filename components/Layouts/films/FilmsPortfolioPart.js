import React, { useRef } from "react"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import ScrollToTopBtn from "../../Navigation/scroll-to-top"
import theme from "../../../config/theme"
import FilmsIndexHero from "./FilmsIndexHero"
import FilmsFocusPart from "./FilmsFocusPart"
import FilmsExperiencePart from "./FilmsExperiencePart"
import FilmsQuoteParallax from "./FilmsQuoteParralax"

export default function FilmsPortfolioPart(props) {
  const { refForScroll } = props

  const LabelCell = ({ categoryTitle, subtitle }) => {
    return (
      <ImageListItem
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundColor: "#2b5b8a",
            // backgroundColor: "#111a23",
          }}
        />
        <ImageListItemBar
          title={categoryTitle}
          subtitle={subtitle}
          sx={{
            pointerEvents: "none",
            wordBreak: "break",
            //background: "rgb(42, 46, 69, 0.7)",
            height: "100%",
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: "Ethereal",
            ".MuiImageListItemBar-title": {
              fontWeight: "bold",
              color: (theme) => theme.palette.secondary.main,
              lineHeight: "2rem",
              fontSize: "2vw",
              letterSpacing: "2px",
              whiteSpace: "inherit",
            },
          }}
        />
      </ImageListItem>
    )
  }

  const VideoCell = ({ src, alt, title, key }) => {
    return (
      <ImageListItem
        key={key}
        sx={{
          height: "100%",
          width: "100%",
          cursor: "pointer",
          overflow: "hidden",
          "&:hover": {
            "& .MuiBox-root": { transform: "scale(1.1)" },
          },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          sx={{
            zIndex: 0,
            objectFit: "cover",
            objectPosition: "50% 50%",
            "-webkit-transition": "transform 0.4s ease-in-out",
            "-ms-transition": "transform 0.4s ease-in-out",
            transition: "transform 0.4s ease-in-out",
            //filter: "grayscale(1)",
          }}
        />
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "rgb(0, 0, 0, 0.2)",
            zIndex: 1,
          }}
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: "1rem",
            width: "calc(100% - 2rem)",
            height: "calc(100% - 2rem)",
            position: "absolute",
            border: `.2rem solid ${theme.palette.secondary.main}`,
            zIndex: 2,
            "-webkit-transition": "background 200ms linear",
            "-ms-transition": "background 200ms linear",
            transition: "background 200ms linear",
            "&:hover": {
              background: "rgb(0, 0, 0, 0.4)",
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Ethereal",
              fontSize: "1.5rem",
              color: "#fff",
              textShadow: "2px 2px 7px #000",
              letterSpacing: "0.05rem",
            }}
          >
            {title}
          </Typography>
          <Button
            className="cool-button"
            color="secondary"
            sx={{
              borderRadius: 0,
              margin: 0.5,
              fontSize: "1.25vw",
              letterSpacing: "0.15vw",
              whiteSpace: "inherit",
              wordBreak: "break",
              textShadow: "2px 2px 7px #000",
              "&:hover": {
                color: theme.palette.text.secondary,
                backgroundColor: "transparent",
              },
            }}
          >
            Voir {">"}
          </Button>
        </Stack>
      </ImageListItem>
    )
  }

  const RowStartingLabel = ({ categoryTitle, subtitle, videos }) => {
    return (
      <>
        <LabelCell categoryTitle={categoryTitle} subtitle={subtitle} />

        {videos && videos.length
          ? videos.map((video, key) => {
              if (key < 2)
                // We only want a row of 2 videos
                //TODO : Randomize within a set of more than 2 videos, so the 2 displayed videos change every time the page is loaded
                return (
                  <VideoCell
                    key={key}
                    src={video.src}
                    alt={video.alt}
                    title={video.title}
                  />
                )
            })
          : null}
      </>
    )
  }

  const RowEndingLabel = ({ categoryTitle, subtitle, videos }) => {
    return (
      <>
        {videos && videos.length
          ? videos.map((video, key) => {
              if (key < 2)
                // We only want a row of 2 videos
                //TODO : Randomize within a set of more than 2 videos, so the 2 displayed videos change every time the page is loaded
                return (
                  <VideoCell
                    key={key}
                    src={video.src}
                    alt={video.alt}
                    title={video.title}
                  />
                )
            })
          : null}

        <LabelCell categoryTitle={categoryTitle} subtitle={subtitle} />
      </>
    )
  }

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />

      {/* <Stack sx={{ backgroundColor: "#2b5b8a" }}> */}
      <Stack
        sx={{
          // backgroundColor: "#111a23",
          // backgroundImage: "url(/medias/3333.svg)",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
        }}
      >
        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="start">
            <Stack padding="4rem" width="100%">
              <Typography
                variant="h1"
                fontFamily="Ethereal"
                fontWeight="bold"
                textAlign="left"
                // color="secondary"
                sx={{
                  color: "#2b5b8a",
                  // color: "#fff",
                  fontSize: {
                    xs: "4.5rem",
                    sm: "12vw",
                  },
                  lineHeight: {
                    xs: "4rem",
                    sm: "8rem",
                    md: "10rem",
                    lg: "13rem",
                    xl: "17rem",
                  },
                }}
              >
                Portfolio .
              </Typography>

              <ImageList
                gap={0}
                sx={{
                  margin: 1,
                  // maxWidth: {
                  //   xs: "300px",
                  //   sm: "800px",
                  //   md: "800px",
                  //   lg: "1200px",
                  //   xl: "1200px",
                  // },
                  flexDirection: "row",
                }}
                cols={3}
                rowHeight={200}
              >
                <RowStartingLabel
                  categoryTitle={"Courts-métrages"}
                  subtitle={"Fiction – Sensibilisation"}
                  videos={[
                    {
                      src: "/medias/tryptique-short-film.png",
                      alt: "ALT",
                      title: "Amour à l'Horizon",
                    },
                    {
                      src: "/medias/tryptique-short-film-2.png",
                      alt: "ALT",
                      title: "Trois secondes",
                    },
                  ]}
                />

                <RowEndingLabel
                  categoryTitle={"Clips"}
                  subtitle={"Musique – Aftermovies"}
                  videos={[
                    {
                      src: "/medias/tryptique-clip.png",
                      alt: "ALT",
                      title: "Aqua",
                    },
                    {
                      src: "/medias/clip-cover-2.png",
                      alt: "ALT",
                      title: "Aftermovie Beguee Fest' 2018",
                    },
                  ]}
                />

                <RowStartingLabel
                  categoryTitle={"Événementiel"}
                  subtitle={"Mariages – Baptêmes – EVG & EVGF"}
                  videos={[
                    {
                      src: "/medias/event-cover.png",
                      alt: "ALT",
                      title: "Baptême d'Elio",
                    },
                    {
                      src: "/medias/event-cover-2.png",
                      alt: "ALT",
                      title: "Élections Mademoiselle Aube 2017",
                    },
                  ]}
                />

                <RowEndingLabel
                  categoryTitle={"Associations"}
                  subtitle={"Films d'étudiants – Formations – Couvertures"}
                  videos={[
                    {
                      src: "/medias/associations-cover.png",
                      alt: "ALT",
                      title: "Présentation des Cordées de la Réussite",
                    },
                    {
                      src: "/medias/associations-cover-2.png",
                      alt: "ALT",
                      title: "Films d'étudiants de l'ESCOM",
                    },
                  ]}
                />

                <RowStartingLabel
                  categoryTitle={"Entreprises"}
                  subtitle={
                    "Publicités – Films d'entreprise – Formations – Interviews – Immobilier"
                  }
                  videos={[
                    {
                      src: "/medias/tryptique-corporate.png",
                      alt: "ALT",
                      title: "Andrea Martins Photography",
                    },
                    {
                      src: "/medias/corporate-cover.png",
                      alt: "ALT",
                      title: "Levée de fonds pour Wideop",
                    },
                  ]}
                />
              </ImageList>
            </Stack>
          </Stack>
        </Slide>
      </Stack>
    </>
  )
}
