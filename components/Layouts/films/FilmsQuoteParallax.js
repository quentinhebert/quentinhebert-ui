import { Box, Stack, Typography } from "@mui/material"
import { Parallax } from "react-parallax"
import theme from "../../../config/theme"
import FlashingRedDot from "../../Navigation/FlashingRedDot"
import Timer from "../../ReusableComponents/timer"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const Container = ({ btnColor, bgImg, href }) => {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    // For the first line
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1 },
        },
        hidden: { opacity: 0, x: -25 },
      }
    // For the second line
    return {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1 },
      },
      hidden: { opacity: 0, x: 25 },
    }
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Parallax
      bgImage={bgImg}
      bgImageAlt="Portrait en noir et blanc de Quentin."
      strength={200}
      style={{
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
        minHeight="300px"
        zIndex={3}
        sx={{
          padding: { xs: "3rem 1.5rem", md: "4rem 6rem" },
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
        ref={ref}
      >
        <Stack
          sx={{
            border: `1px solid ${theme.palette.text.white}`,
            backgroundColor: "rgb(0,0,0,0.1)",
            backgroundImage: "url(/medias/white-grid.png)",
            backgroundSize: "100% 100%",
            padding: "1rem",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <Stack width="34%" />
            <Stack alignItems="center" flexGrow={1}>
              <Box
                sx={{
                  display: "flex",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgb(0,0,0,0.2)",
                }}
              >
                <Timer
                  color={theme.palette.secondary.main}
                  fontFamily="Ethereal"
                  letterSpacing="0.15rem"
                />
              </Box>
            </Stack>
            <Stack width="33%">
              <FlashingRedDot />
            </Stack>
          </Stack>

          <motion.div
            initial="hidden"
            variants={variants(0)}
            animate={controls}
            style={{ width: "100%", display: "flex" }}
          >
            <Typography
              component={"span"}
              fontFamily="Ethereal"
              fontWeight="bold"
              lineHeight="3vw"
              textAlign="center"
              sx={{
                color: "#fff",
                margin: { xs: "2rem auto", md: "6rem auto 3rem" },
                padding: "0 1rem",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              Depuis que le mouvement a rencontré la photographie, la vidéo n'a
              cessé d'envahir nos vies. C'est naturellement qu'elle s'est
              imposée comme medium le plus convaincant.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(1)}
            animate={controls}
            style={{ width: "100%", display: "flex" }}
          >
            <Typography
              component={"span"}
              fontFamily="Ethereal"
              color="secondary"
              sx={{
                width: { xs: "100%", md: "90%", lg: "70%" },
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                margin: { xs: "1rem 0.5rem", md: "0rem auto 2rem" },
              }}
            >
              <Box textAlign="right" fontStyle="italic" fontWeight="bold">
                "Une image vaut mieux que mille mots".
              </Box>
              <Box fontWeight="bold">
                – Alors que dire de vingt-cinq images par secondes ?
              </Box>
            </Typography>
          </motion.div>
        </Stack>
      </Stack>
    </Parallax>
  )
}

export default function FilmsQuoteParallax(props) {
  const { refForScroll, btnColor, href } = props
  return (
    <>
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <Container
          btnColor={btnColor}
          // bgImg={"/medias/movement-parallax.jpg"}
          bgImg={""}
          href={href}
        />
      </Stack>
    </>
  )
}
