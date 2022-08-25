import React, { useEffect } from "react"
import { useMediaQuery, Stack, Typography } from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import BicolorTitle from "./titles/bicolor-title"
import BlueLink from "./blue-link"

export default function DualCoverBand(props) {
  /********** PROPS **********/
  const { items } = props

  /*
  Array of 2 items.
  1 item :
  {
    bgColor: Color of the background,
    img: Image URL/path (String),
    imgLink: Href path redirection when clicking on the image (String > path or URL),
    secondaryText: Top small text (String),
    secondaryTextColor: Color of the top small text (String),
    label: Big text (String),
    linkLabel: Link text (String),
    url: Href path redirection when clicking on the link (String > path or URL),
    fontFamily: String,
    letterSpacing: value + unit (String),
  }
  */

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75, delay: 0 },
    },
    hidden: { opacity: 0 },
  }
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  if (!items.length) return <Stack height="300px" />

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
      {items.length
        ? items.map((item, key) => (
            <Stack
              key={key}
              flexDirection="column"
              overflow="hidden"
              bgcolor={item.bgColor || theme.palette.background.main}
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            >
              <BicolorTitle
                secondaryText={item.secondaryText}
                secondaryColor={item.secondaryTextColor}
                mainFontFamily={item.fontFamily || "Arial"}
                mainText={item.label}
                mainColor={theme.palette.secondary.main}
                padding={isMobileOrTablet ? "2rem 0 0" : "4rem 0 0"}
                letterSpacing={item.letterSpacing || null}
              />

              {/* <Stack alignItems="center" ref={ref}>
                <motion.div
                  initial="hidden"
                  variants={variants}
                  animate={controls}
                  style={{ zIndex: 1 }}
                >
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
                </motion.div>
              </Stack> */}
              <BlueLink href={item.url || "#"} text={item.linkLabel} />

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
