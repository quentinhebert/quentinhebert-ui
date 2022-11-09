import { Box, Button, Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import BodyText from "../../Text/body-text"

export default function WelcomeSection(props) {
  const { scrollTo, topRef, refForScroll } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const textVariant = (delay) => ({
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    hidden: {
      opacity: 0,
      x: -25,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  })
  const imgVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.5 },
    },
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <>
      <Stack
        ref={topRef}
        sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
      />

      <Stack
        width="100%"
        height="150vh"
        minHeight="600px"
        justifyContent="center"
        zIndex={0}
        position="relative"
      >
        {/* Tracking ref for visibility inView */}
        <Stack
          ref={ref}
          height="700px"
          width="100%"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            marginTop: "100px",
            // background: "red",
            zIndex: 5,
          }}
        />

        <Stack
          className="full-width"
          sx={{
            height: { xs: "100%", md: "100vh" },
            bottom: 0,
            left: 0,
            flexDirection: { xs: "column", md: "row" },
            position: { xs: "relative", md: "fixed" },
          }}
        >
          <Stack sx={{ width: { xs: "100%", md: "50%" }, height: "100%" }}>
            <motion.div
              className="flex-center"
              initial="hidden"
              animate={controls}
              variants={imgVariant}
              style={{
                zIndex: 1,
                height: "100%",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <Stack
                width="100%"
                height="100%"
                minHeight="300px"
                sx={{
                  backgroundImage: "url(/medias/portrait.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: { xs: "50%", md: "20%", lg: "50%" },
                }}
              />
            </motion.div>
          </Stack>

          <Stack
            className="flex-center"
            zIndex={0}
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              opacity: inView ? 1 : 0,
              transition: "opacity 1s",
              backgroundImage:
                "linear-gradient(#000 40%, rgb(0,0,0,0.5)), url(/medias/bubbles.svg)",
              backgroundSize: "cover",
              backgroundPosition: "50%",
            }}
          >
            <motion.div
              initial="hidden"
              variants={textVariant(0.5)}
              animate={controls}
              style={{
                padding: "2rem 2rem 1rem",
              }}
            >
              <Typography
                color="#fff"
                letterSpacing={2}
                fontSize="4rem"
                lineHeight="3rem"
              >
                Créons ensemble, voyons plus loin
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              variants={textVariant(1)}
              animate={controls}
              className="flex column"
              style={{
                padding: "1rem 2rem 2rem",
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
                Bonjour et bienvenue sur mon site, je m'appelle Quentin HÉBERT.
                Je suis vidéaste professionnel et développeur web.
                <br />
                <br />
                Artisan, j'allie ma créativité à mon savoir-faire pour vous
                aider à mieux communiquer une idée, un bien ou un service.
              </BodyText>
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "30px",
                    color: "#fff",
                    borderColor: "#fff",
                    padding: "0.5rem 2rem",
                    letterSpacing: 1,
                  }}
                  onClick={() => scrollTo(refForScroll)}
                >
                  Mes services
                </Button>
              </Box>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
