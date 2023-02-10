import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-scroll-parallax"
import LeftSubmitButton from "../../Buttons/left-submit-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

const birthdate = new Date("1998/1/15")
const cur = new Date()
const diff = cur - birthdate
const age = Math.floor(diff / 31536000000)

export default function WelcomeSection(props) {
  const { scrollTo, topRef, refForScroll } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const textVariant = (delay) => ({
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1.0] },
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

  const md = useMediaQuery((theme) => theme.breakpoints.down("md"))

  return (
    <>
      <Stack ref={topRef} sx={{ scrollMarginTop: "60px" }} />

      <Stack
        width="100%"
        minHeight="600px"
        justifyContent="center"
        zIndex={0}
        position="relative"
        sx={{
          height: { xs: "auto", lg: "150vh" },
          backgroundImage:
            "linear-gradient(#000 40%, rgb(0,0,0,0.5)), url(/medias/bubbles.svg)",
          backgroundSize: "cover",
          backgroundPosition: `50%`,
        }}
      >
        {/* Tracking ref for visibility inView */}
        <Stack
          ref={ref}
          height="700px"
          width="100%"
          sx={{
            marginTop: "100px",
            zIndex: 100,
          }}
        />

        <Stack
          className="full-width bottom left"
          sx={{
            position: { xs: "relative", lg: "fixed" },
            flexDirection: { xs: "column", lg: "row" },
            height: { xs: "auto", lg: "100vh" },
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", lg: "50%" },
              height: { xs: "auto", lg: "100%" },
              zIndex: 1,
            }}
          >
            <Parallax
              translateX={[-50, 0]}
              translateY={[0, 0]}
              // opacity={[0, 1]}
              style={{ height: "100%" }}
            >
              <Stack
                width="100%"
                minHeight="400px"
                sx={{
                  height: { xs: "auto", lg: "100%" },
                  marginTop: { xs: "0", lg: "30px" },
                  backgroundImage: "url(/medias/portrait.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: {
                    xs: "50%",
                    sm: "0% 10%",
                    lg: "50%",
                  },
                }}
              />
            </Parallax>
          </Stack>

          <Stack
            justifyContent="center"
            zIndex={0}
            sx={{
              width: { xs: "100%", lg: "50%" },
              height: "100%",
              opacity: { xs: 1, lg: 1 },
              transition: "opacity 0.4s ease",
              padding: "2rem",
              gap: "2rem",
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
                lineHeight={{ xs: "10vw", lg: "6vw" }}
              >
                <span style={{ color: "#FFF" }}>Créons</span> ensemble,{" "}
                <span style={{ color: "#FFF" }}>voyons</span> plus loin
              </Typography>
            </motion.div>

            <motion.div
              className="flex column"
              animate={controls}
              initial="hidden"
              variants={textVariant(0.3)}
              style={{
                gap: "2rem",
              }}
            >
              <BodyText preventTransition>
                Je m'appelle Quentin, j'ai {age} ans et je suis vidéaste
                professionnel et développeur web en freelance.
                <br />
                <br />
                Donnons du sens à vos idées, que ce soit en vidéo ou sur le web,
                et réalisons ensemble un film ou un site qui vous ressemble.
              </BodyText>

              <Box width="100%">
                <LeftSubmitButton onClick={() => scrollTo(refForScroll)}>
                  <Typography
                    sx={{
                      fontSize: { xs: ".6rem", md: ".8rem" },
                    }}
                  >
                    Services
                  </Typography>{" "}
                  <ArrowRightAltIcon />
                </LeftSubmitButton>
              </Box>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
