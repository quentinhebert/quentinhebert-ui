import React, { useRef } from "react"
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import theme from "../../../config/theme"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BigTitle from "../../ReusableComponents/titles/big-title"
import PortfolioImageList from "./PortfolioImageList"

export default function FilmsPortfolioPart(props) {
  const { refForScroll } = props

  const LabelCell = ({ categoryTitle, subtitle, arrowDirection }) => {
    return (
      <ImageListItem
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          position="absolute"
          width="100%"
          height="100%"
          padding="1rem"
          sx={
            {
              // backgroundColor: (theme) => theme.palette.background.secondary,
            }
          }
        >
          <Typography
            fontFamily="Ethereal"
            textTransform="uppercase"
            fontWeight="bold"
            textAlign="center"
            sx={{
              color: theme.palette.text.primaryLight,
              fontSize: { xs: "3.7vw", sm: "1.2rem", md: "1.5rem" },
              letterSpacing: { xs: 0.25, sm: 1, md: 2 },
              lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            {categoryTitle}
          </Typography>

          {/* <Typography
            fontFamily="Ethereal"
            sx={{
              color: theme.palette.text.primaryLight,
              fontSize: "1.1rem",
              letterSpacing: "1.5px",
              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography> */}

          <Stack flexDirection="row" alignItems="center" marginTop="1rem">
            {arrowDirection === "left" ? (
              <ArrowForwardIcon
                sx={{
                  rotate: "180deg",
                  fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                  display: "flex",
                }}
              />
            ) : null}
            <Typography
              variant="h6"
              fontFamily="Ethereal"
              textAlign="center"
              className="cool-button"
              sx={{
                cursor: "pointer",
                borderRadius: 0,
                margin: 0.5,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                whiteSpace: "inherit",
                wordBreak: "break",
                "&:hover": { color: theme.palette.secondary.main },
              }}
            >
              Parcourir
            </Typography>
            {arrowDirection === "right" ? (
              <ArrowForwardIcon
                sx={{
                  fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                  display: "flex",
                }}
              />
            ) : null}
          </Stack>
        </Stack>
      </ImageListItem>
    )
  }

  const VideoCell = ({ src, alt, title }) => {
    return (
      <ImageListItem
        sx={{
          height: "100%",
          width: "100%",
          cursor: "pointer",
          overflow: "hidden",
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
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          sx={{
            zIndex: 0,
            objectFit: "cover",
            objectPosition: "50% 50%",
            WebkitTransition: "transform 0.4s ease-in-out",
            msTransition: "transform 0.4s ease-in-out",
            transition: "transform 0.4s ease-in-out, filter 0.4s ease-in-out",
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
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 2,
            WebkitTransition: "background 200ms linear",
            msTransition: "background 200ms linear",
            transition: "background 200ms linear",
            padding: "1rem",
            "&:hover": {
              background: "rgb(0, 0, 0, 0.4)",
            },
          }}
        >
          <Typography
            color="secondary"
            fontWeight="bold"
            fontStyle="italic"
            sx={{
              textAlign: "center",
              fontFamily: "Ethereal",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              letterSpacing: { xs: 0.25, sm: 1, md: 2 },
              lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 7px #000",
            }}
          >
            {title}
          </Typography>
        </Stack>
      </ImageListItem>
    )
  }

  const RowStartingLabel = ({ categoryTitle, subtitle, videos }) => {
    return (
      <>
        <LabelCell
          categoryTitle={categoryTitle}
          subtitle={subtitle}
          arrowDirection="right"
        />

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

        <LabelCell
          categoryTitle={categoryTitle}
          subtitle={subtitle}
          arrowDirection="left"
        />
      </>
    )
  }

  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"))
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))

  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />

      <Stack
        sx={{
          backgroundColor: theme.palette.background.white,
          paddingRight: { xs: 0, md: "4rem" },
          paddingLeft: { xs: 0, md: "4rem" },
          paddingBottom: { xs: "2rem", md: "4rem" },
        }}
      >
        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="start">
            <Stack
              width="100%"
              sx={{ padding: { xs: "2rem 0 0 1rem", md: "4rem 2rem 0rem 0" } }}
            >
              <BigTitle
                title="Portfolio ."
                fontFamily="Ethereal"
                color={theme.palette.text.primaryLight}
              />
            </Stack>
          </Stack>
        </Slide>

        {/* <ImageList
          sx={{
            margin: { xs: 0, md: 1 },
            backgroundColor: theme.palette.background.white,
            flexDirection: "row",
          }}
          cols={3}
          rowHeight={md ? 220 : sm ? 200 : 120}
          gap={0.5}
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
                title: "Trois Secondes",
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
                title: "Les Cordées de la Réussite",
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
        </ImageList> */}

        <PortfolioImageList />
      </Stack>
    </>
  )
}
