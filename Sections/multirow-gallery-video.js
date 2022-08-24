import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import {
  ImageListItem,
  ImageList,
  ImageListItemBar,
  useMediaQuery,
  Typography,
  Stack,
} from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"
const VideoPlayer = dynamic(() => import("../Modals/video-player"))

export default function MultirowGalleryVideo(props) {
  /********** PROPS **********/
  const { videos, cols, marginBottom, bgColor } = props

  const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  /********** STYLE **********/
  const sm = useMediaQuery(theme.breakpoints.down("sm"))
  const md = useMediaQuery(theme.breakpoints.down("md"))

  const handleOpenVideoPlayer = (key) => {
    setSelectedVideo(videos[key])
    setOpenVideoPlayer(true)
  }
  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null)
    setOpenVideoPlayer(false)
  }

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.5, delay: key / 10 },
      },
      hidden: { opacity: 0, scaleX: 0 },
    }
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** RENDER **********/
  return (
    <>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        marginBottom={md ? "0rem" : marginBottom || "0rem"}
        sx={{ zIndex: 2, position: "relative" }}
      >
        {videos.length ? (
          <ImageList
            gap={15}
            sx={{
              margin: 1,
              maxWidth: {
                xs: "300px",
                sm: "700px",
                md: "800px",
                lg: "1000px",
                xl: "1200px",
              },
              flexDirection: md ? "column" : "row",
            }}
            ref={ref}
            cols={sm ? 1 : md ? 2 : cols || 3}
            rowHeight={200}
          >
            {videos.map((item, key) => (
              <motion.div
                initial="hidden"
                variants={variants(key)}
                animate={controls}
                style={{ display: "flex", width: "100%" }}
                key={key}
              >
                <ImageListItem
                  sx={{
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenVideoPlayer(key)}
                  key={key}
                >
                  <Box
                    component="img"
                    src={item.thumbnail_url}
                    alt={`Thumbnail of the video ${item.title}`}
                    width="100%"
                    height="100%"
                    sx={{
                      objectFit: "cover",
                      objectPosition: "50% 50%",
                      borderRadius: "20px",
                      "&:hover": {
                        filter: "grayscale(100%)",
                      },
                    }}
                  />
                  <ImageListItemBar
                    title={item.title}
                    position="bottom"
                    sx={{
                      pointerEvents: "none",
                      wordBreak: "break",
                      background: "rgba(0,0,0,0.2)",
                      height: "100%",
                      textAlign: "center",
                      textTransform: "uppercase",
                      borderRadius: "20px",
                      ".MuiImageListItemBar-title": {
                        lineHeight: "2rem",
                        fontSize: {
                          xs: "1rem",
                          sm: "1.2rem",
                          md: "1.1rem",
                          lg: "1.5rem",
                          xl: "1.5rem",
                        },
                        fontWeight: "300",
                        letterSpacing: "2px",
                        whiteSpace: "inherit",
                      },
                    }}
                  />
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        ) : (
          <Stack
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              opacity: 0.8,
              padding: "2rem",
              borderRadius: "10px",
              marginTop: 3,
            }}
          >
            <Typography
              textTransform="uppercase"
              color="primary"
              fontSize="1.5rem"
              letterSpacing={2}
            >
              ⏳ Coming soon...
            </Typography>
          </Stack>
        )}
      </Box>

      {selectedVideo ? (
        <VideoPlayer
          video={selectedVideo}
          open={openVideoPlayer}
          handleClose={handleCloseVideoPlayer}
        />
      ) : null}
    </>
  )
}
