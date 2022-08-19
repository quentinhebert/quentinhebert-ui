import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import {
  ImageListItem,
  ImageList,
  ImageListItemBar,
  useMediaQuery,
  Stack,
  Collapse,
} from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

export default function MultirowGallery(props) {
  /********** PROPS **********/
  const { images, cols, marginBottom, bgColor } = props

  /********** STYLE **********/
  const lg = useMediaQuery(theme.breakpoints.down("lg"))
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

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
  }, [controls, inView, images])

  if (!images.length) return <Stack height="300px" />

  /********** RENDER **********/
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      marginBottom={md ? "0rem" : marginBottom || "0rem"}
      sx={{ zIndex: 2, position: "relative" }}
      ref={ref}
    >
      <ImageList
        gap={15}
        sx={{
          margin: 1,
          maxWidth: {
            xs: "300px",
            sm: "800px",
            md: "800px",
            lg: "1200px",
            xl: "1200px",
          },
          flexDirection: md ? "column" : "row",
        }}
        cols={sm ? 1 : lg ? 2 : cols || 3}
        rowHeight={md ? 200 : 300}
      >
        {images.length
          ? images.map((item, key) => (
              <motion.div
                initial="hidden"
                variants={variants(key)}
                animate={controls}
                style={{ display: "flex", width: "100%" }}
                key={key}
              >
                <Link href={item.url || "#"}>
                  <ImageListItem
                    sx={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={item.thumbnail}
                      alt={item.alt}
                      width="100%"
                      height="100%"
                      sx={{
                        "&:hover": {
                          filter: "grayscale(100%) brightness(0.5)",
                        },
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                        borderRadius: "20px",
                      }}
                    />
                    <ImageListItemBar
                      title={item.label}
                      sx={{
                        pointerEvents: "none",
                        wordBreak: "break",
                        background: "rgb(42, 46, 69, 0.8)",
                        height: "100%",
                        textAlign: "center",
                        textTransform: "uppercase",
                        borderRadius: "20px",
                        "&:hover": {
                          color: (theme) => theme.palette.secondary.main,
                        },
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
                </Link>
              </motion.div>
            ))
          : null}
      </ImageList>
    </Box>
  )
}
