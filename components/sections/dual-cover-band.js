import React, { useEffect } from "react"
import { useMediaQuery, Stack, Typography } from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import BicolorTitleBand from "./bicolor-title-band"

export default function DualCoverBand(props) {
  /********** PROPS **********/
  const { images } = props

  if (!images.length) return <Stack height="300px" />

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  /********** RENDER **********/
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      sx={{
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      {images.length
        ? images.map((item, key) => (
            <Stack
              key={key}
              flexDirection="column"
              overflow="hidden"
              bgcolor={item.bgColor || theme.palette.background.main}
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            >
              <BicolorTitleBand
                secondaryText={item.secondaryText}
                secondaryColor={item.secondaryTextColor}
                mainFontFamily={item.fontFamily || "Arial"}
                mainText={item.label}
                mainColor={theme.palette.secondary.main}
                padding={isMobileOrTablet ? "2rem 0 0" : "4rem 0 0"}
                letterSpacing={item.letterSpacing || null}
              />
              <Stack alignItems="center" zIndex={1}>
                <Link href={item.url || "#"} key={key}>
                  <Stack
                    flexDirection="row"
                    marginTop="0.5rem"
                    alignItems="center"
                    sx={{
                      color: theme.palette.text.link,
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
                        color: theme.palette.text.link,
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        letterSpacing: { xs: "1px", md: "2px" },
                      }}
                    >
                      {item.linkLabel}
                    </Typography>
                    {">"}
                  </Stack>
                </Link>
              </Stack>
              <Link href={item.imgLink}>
                <Stack
                  width="100%"
                  sx={{
                    cursor: "pointer",
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: "50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: { xs: "300px", sm: "500px", md: "400px" },
                    transition: "0.7s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Link>
            </Stack>
          ))
        : null}
    </Stack>
  )
}
