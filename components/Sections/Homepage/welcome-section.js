import { Box, Button, Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-scroll-parallax"

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

  const [opacity, setOpacity] = useState(0)
  const handleOpacity = (progress) => {
    if (progress < 0.5) setOpacity(progress * 2)
    else if (progress > 0.75) setOpacity(-4 * progress + 4)
    else setOpacity(1)
  }

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

        <Parallax
          onProgressChange={(progress) => handleOpacity(progress)}
          style={{
            background: "blue",
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
              backgroundColor: "red",
            }}
          />
        </Parallax>

        <Stack
          className="full-width bottom left"
          sx={{
            position: { xs: "relative", md: "fixed" },
            flexDirection: { xs: "column", md: "row" },
            height: { xs: "100%", md: "100vh" },
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              zIndex: 1,
            }}
          >
            <Stack
              width="100%"
              height="100%"
              minHeight="300px"
              sx={{
                marginTop: "30px",
                opacity: { xs: 1, md: opacity },
                transition: "opacity 0.4s ease",
                backgroundImage: "url(/medias/portrait.jpg)",
                backgroundSize: "cover",
                backgroundPosition: { xs: "50%", md: "20%", lg: "50%" },
              }}
            />
          </Stack>

          <Stack
            className="flex-center"
            zIndex={0}
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              opacity: { xs: 1, md: opacity },
              transition: "opacity 0.4s ease",
              backgroundImage:
                "linear-gradient(#000 40%, rgb(0,0,0,0.5)), url(/medias/bubbles.svg)",
              backgroundSize: "cover",
              backgroundPosition: "50%",
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
                color="#fff"
                letterSpacing={2}
                fontSize="4rem"
                lineHeight="3rem"
              >
                Créons ensemble, voyons plus loin
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
                web.
                <br />
                <br />
                {/* Artisan, j'allie ma créativité à mon savoir-faire pour vous
                aider à mieux communiquer une idée, à vendre un bien ou un
                service. */}
                Propulsons vos idées sur le web et en vidéo.
                <br />
                <br />
                Ne cherchez plus, vous trouverez tout ici. Image de marque,
                branding, site web, film promotionnel ou artistique, le tout sur
                mesure.
              </BodyText>

              <Box width="100%">
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
