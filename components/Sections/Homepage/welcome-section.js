import { Box, Stack, Typography } from "@mui/material"
import BodyText from "../../Text/body-text"
import LeftSubmitButton from "../../Buttons/left-submit-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { useContext, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import NextLink from "../../Helpers/next-link"
import Span from "../../Text/span"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

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
    if (inView) controls.start("visible")
    else controls.start("hidden")
  }, [controls, inView])

  useEffect(() => {
    gsap.to("#parallaxContent", {
      yPercent: 70,
      ease: "none",
      scrollTrigger: {
        spin: true,
        trigger: "#parallaxWrapper",
        start: "top center", // the default values
        end:
          "+=" +
          (document.querySelector("#parallaxWrapper").offsetHeight + 800) +
          " center",
        scrub: 0.1,
        // markers: true,
      },
    })
    gsap.to("#parallaxImg1", {
      yPercent: 0,
      opacity: 1,
      rotate: 10,
      ease: "true",
      scrollTrigger: {
        trigger: "#parallaxWrapper",
        start: "-400px center", // the default values
        end:
          "+=" +
          (document.querySelector("#parallaxWrapper").offsetHeight + 800) +
          " center",
        scrub: true,
        // markers: true,
      },
    })
    gsap.to("#parallaxImg2", {
      yPercent: -50,
      rotate: 10,
      opacity: 4,
      ease: "true",
      scrollTrigger: {
        trigger: "#parallaxWrapper",
        start: "-100px center", // the default values
        end:
          "+=" +
          (document.querySelector("#parallaxWrapper").offsetHeight + 800) +
          " center",
        scrub: true,
        // markers: true,
      },
    })
    gsap.to("#parallaxImg3", {
      yPercent: -20,
      rotate: 10,
      opacity: 4,
      ease: "true",
      scrollTrigger: {
        trigger: "#parallaxWrapper",
        start: "0 center",
        end:
          "+=" +
          (document.querySelector("#parallaxWrapper").offsetHeight + 800) +
          " center",
        scrub: true,
        // markers: true,
      },
    })
  }, [])

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
          id="parallaxWrapper"
          mb="500px"
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
            <Box
              id="parallaxImg1"
              sx={{
                opacity: 0,
                rotate: "-10deg",
                width: { xs: "50vw", lg: "30vw" },
                height: { xs: "50vw", lg: "30vw" },
                alignSelf: "end",
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/cover.jpg" />
            </Box>

            <Box
              id="parallaxImg2"
              sx={{
                position: "absolute",
                translate: "0 100%",
                top: 0,
                left: "50px",
                opacity: 0,
                rotate: "-10deg",
                width: { xs: "40vw", lg: "20vw" },
                height: { xs: "40vw", lg: "20vw" },
                zIndex: 2,
              }}
            >
              <GalleryImg src="/medias/portrait.jpg" />
            </Box>

            <Box
              id="parallaxImg3"
              sx={{
                position: "absolute",
                translate: "0 100%",
                top: 0,
                right: "70px",
                opacity: 0,
                rotate: "-20deg",
                width: { xs: "45vw", lg: "27vw" },
                height: { xs: "45vw", lg: "27vw" },
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/bridge.jpg" />
            </Box>
          </Stack>

          <Stack
            id="parallaxContent"
            sx={{
              width: { xs: "100%", lg: "50%" },
              height: "100%",
              gap: "2rem",
              padding: "2rem",
              zIndex: 3,
            }}
          >
            <motion.div
              animate={controls}
              initial="hidden"
              variants={textVariant(0)}
            >
              <Typography
                variant="h2"
                fontFamily="POPFINE"
                color="secondary"
                lineHeight={{ xs: "3rem", md: "5rem" }}
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
        </Stack>
      </Stack>
    </>
  )
}
