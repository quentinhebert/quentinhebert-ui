import { Box, Stack, Typography } from "@mui/material"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-scroll-parallax"
import LeftSubmitButton from "../../Buttons/left-submit-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { useContext, useEffect, useState } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import NextLink from "../../Helpers/next-link"
import Span from "../../Text/span"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

const birthdate = new Date("1998/1/15")
const cur = new Date()
const diff = cur - birthdate
const age = Math.floor(diff / 31536000000)

const GalleryImg = ({ src, ...props }) => (
  <Box
    width="100%"
    height="100%"
    sx={{
      background: `url(${src})`,
      backgroundPosition: "50%",
      backgroundSize: "cover",
      borderRadius: "100%",
      aspectRatio: "1",
      border: (theme) => `4px inset ${theme.palette.secondary.main}`,
      overflow: "hidden",
      boxShadow: (theme) => `0 0 3rem 1px ${theme.palette.secondary.main}`,
    }}
    {...props}
  >
    <Box
      width="100%"
      height="100%"
      sx={{
        background: `url(/medias/film_grain.jpg)`,
        mixBlendMode: "screen",
        backgroundPosition: "50%",
        backgroundSize: "cover",
      }}
    />
  </Box>
)

export default function WelcomeSection(props) {
  const { scrollTo, topRef, refForScroll } = props

  const [progress, setProgress] = useState(0)

  const { lang } = useContext(AppContext)

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const textVariant = (delay) => ({
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    hidden: {
      x: -25,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  })
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <>
      <Stack ref={topRef} sx={{ scrollMarginTop: "-80px" }} />

      <Stack
        ref={ref}
        width="100%"
        justifyContent="center"
        zIndex={0}
        position="relative"
        sx={{
          marginTop: ".1px",
          backgroundImage: (theme) =>
            `linear-gradient(${theme.palette.background.black} 0%, rgb(0,0,0,0.5) 50%, ${theme.palette.background.black} 100%), url(/medias/bubbles.svg)`,
          backgroundSize: "cover",
          backgroundPosition: `100%`,
        }}
      >
        <Stack
          className="full-width bottom left"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Stack
            sx={{
              width: { xs: "90%", lg: "50%" },
              zIndex: 1,
              gap: 0,
              position: "relative",
            }}
          >
            <Parallax
              easing="easeInQuad"
              scale={[1, 1.1]}
              translateY={[5, 100]}
              translateX={[-10, -10]}
              rotate={["10deg", "-20deg"]}
              style={{
                width: "60%",
                height: "60%",
                alignSelf: "end",
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/cover.jpg" />
            </Parallax>

            <Parallax
              easing="easeInQuad"
              scale={[1, 1.6]}
              translateY={[0, -100]}
              translateX={[15, 15]}
              rotate={["-10deg", "30deg"]}
              style={{
                width: "40%",
                height: "40%",
                zIndex: 2,
              }}
            >
              <GalleryImg src="/medias/portrait.jpg" />
            </Parallax>

            <Parallax
              easing="easeInQuad"
              translateY={[-40, 0]}
              scale={[1, 0.4]}
              rotate={["0deg", "40deg"]}
              style={{
                width: "60%",
                height: "60%",
                alignSelf: "center",
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/bridge.jpg" />
            </Parallax>
          </Stack>

          <Stack
            sx={{
              width: { xs: "100%", lg: "50%" },
              padding: "2rem 2rem 40vw",
            }}
          >
            <Parallax translateY={["0vw", "25vw"]}>
              <Stack gap="2rem">
                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(0)}
                >
                  <Typography
                    variant="h2"
                    fontFamily="POPFINE"
                    color="secondary"
                    className="baseline-align" // Fixes fontface vertical align issue
                  >
                    <Span sx={{ color: (theme) => theme.palette.text.white }}>
                      {translations.homepage.welcome.title.pt1[lang]}
                    </Span>{" "}
                    {translations.homepage.welcome.title.pt2[lang]}{" "}
                    <Span sx={{ color: (theme) => theme.palette.text.white }}>
                      {translations.homepage.welcome.title.pt3[lang]}
                    </Span>{" "}
                    {translations.homepage.welcome.title.pt4[lang]}
                  </Typography>
                </motion.div>
                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(0.5)}
                >
                  <BodyText preventTransition>
                    {translations.homepage.welcome.text.pt1[lang]} {age}{" "}
                    {translations.homepage.welcome.text.pt2[lang]}
                    <br />
                    <br />
                    {translations.homepage.welcome.text.pt3[lang]}
                  </BodyText>
                </motion.div>

                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(1)}
                >
                  <Box width="100%">
                    <NextLink href="/contact">
                      <LeftSubmitButton>
                        <Typography
                          sx={{
                            fontSize: { xs: ".6rem", md: ".8rem" },
                          }}
                        >
                          {translations.homepage.welcome.btn[lang]}
                        </Typography>{" "}
                        <ArrowRightAltIcon />
                      </LeftSubmitButton>
                    </NextLink>
                  </Box>
                </motion.div>
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
