import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import {
  ImageListItem,
  ImageList,
  ImageListItemBar,
  useMediaQuery,
  Stack,
  Collapse,
  Typography,
} from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import BicolorTitleBand from "./bicolor-title-band"

export default function DualCoverBand(props) {
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

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  /********** RENDER **********/
  return (
    <Stack
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      marginBottom="0rem"
      sx={{
        zIndex: 2,
        position: "relative",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
      ref={ref}
    >
      {images.length
        ? images.map((item, key) => (
            <Stack
              flexDirection="column"
              sx={{ width: { xs: "100%", md: "50%" }, overflow: "hidden" }}
              key={key}
            >
              <BicolorTitleBand
                secondaryText="Découvrez"
                secondaryColor={key === 0 ? "#fff" : "#000"}
                mainFontFamily={key === 0 ? "Ethereal" : "Zacbel X"}
                mainText={`Mes ${item.label}`}
                mainColor={theme.palette.text.secondary}
                padding={isMobileOrTablet ? "2rem 0 0" : "4rem 0 0"}
                bgColor={
                  key === 0 ? theme.palette.background.dark : "transparent"
                }
              />
              <Stack
                alignItems="center"
                justifyContent="start"
                sx={{
                  backgroundColor:
                    key === 0 ? theme.palette.background.dark : "transparent",
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                }}
              >
                <Link href={item.url || "#"} key={key}>
                  <Stack
                    flexDirection="row"
                    marginTop="0.5rem"
                    alignItems="center"
                    sx={{
                      color: "#06c",
                      fontSize: { xs: "1rem", md: "1.3rem" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontFamily="Arial"
                      textAlign="center"
                      lineHeight="1.3rem"
                      className="cool-link"
                      sx={{
                        color: "#06c",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        letterSpacing: { xs: "1px", md: "3px" },
                      }}
                    >
                      Portfolio
                    </Typography>
                    {">"}
                  </Stack>
                </Link>
              </Stack>
              <Stack
                sx={{
                  backgroundImage: `url(${item.thumbnail})`,
                  backgroundPosition: "50%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: { xs: "300px", sm: "500px", md: "400px" },
                  transition: "0.7s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Stack>
          ))
        : null}
    </Stack>
  )
}
