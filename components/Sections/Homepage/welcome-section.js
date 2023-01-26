import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-scroll-parallax"
import LeftSubmitButton from "../../Buttons/left-submit-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

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

  const [opacity, setOpacity] = useState(0)
  const handleOpacity = (progress) => {
    if (md) return
    if (progress < 0.5) setOpacity(progress * 2)
    else if (progress > 0.75) setOpacity(-4 * progress + 4)
    else setOpacity(1)
  }

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
          height: { xs: "auto", md: "150vh" },
        }}
      >
        {/* Tracking ref for visibility inView */}
        <Parallax
          onProgressChange={(progress) => handleOpacity(progress)}
          style={{
            zIndex: 100,
            position: "absolute",
            top: 0,
            height: "1000px",
          }}
        >
          <Stack
            ref={ref}
            height="700px"
            width="100%"
            sx={{
              marginTop: "100px",
              zIndex: 100,
            }}
          />
        </Parallax>

        <Stack
          className="full-width bottom left"
          sx={{
            position: { xs: "relative", md: "fixed" },
            flexDirection: { xs: "column", md: "row" },
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "auto", md: "100%" },
              zIndex: 1,
            }}
          >
            <Stack
              width="100%"
              minHeight="400px"
              sx={{
                height: { xs: "auto", md: "100%" },
                marginTop: { xs: "0", md: "30px" },
                opacity: { xs: 1, md: opacity },
                transition: "opacity 0.4s ease",
                backgroundImage: "url(/medias/portrait.jpg)",
                backgroundSize: "cover",
                backgroundPosition: {
                  xs: "50%",
                  sm: "0% 10%",
                  lg: "50%",
                },
              }}
            />
          </Stack>

          <Stack
            justifyContent="center"
            zIndex={0}
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              opacity: { xs: 1, md: opacity },
              transition: "opacity 0.4s ease",
              backgroundImage:
                "linear-gradient(#000 40%, rgb(0,0,0,0.5)), url(/medias/bubbles.svg)",
              backgroundSize: "cover",
              backgroundPosition: `50%`,
              padding: "2rem",
              gap: "2rem",
            }}
          >
            <motion.div
              animate={controls}
              initial="hidden"
              variants={textVariant(0)}
            >
              <Typography variant="h2" fontFamily="POPFINE" color="secondary">
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
              <BodyText
                preventTransition
                fontSize={{
                  xs: "1rem",
                  md: "1.2rem",
                }}
              >
                Je suis Quentin HÉBERT, vidéaste professionnel et développeur
                web en freelance.
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
                    Mes services
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
