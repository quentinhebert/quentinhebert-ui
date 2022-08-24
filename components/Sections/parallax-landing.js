import * as React from "react"
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import { Parallax } from "react-parallax"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Parallax
      blur={{ min: -15, max: 20 }}
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
        zIndex={3}
        padding={3}
        border={`4px solid ${theme.palette.secondary.main}`}
        height="400px"
        ref={ref}
      >
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Typography
            color="#fff"
            textTransform="uppercase"
            fontWeight="bold"
            marginTop="1rem"
            zIndex={4}
            sx={{
              textShadow: "0.15em -0.1em 0.3em black",
              fontSize: { xs: "3vw", sm: "2rem", md: "2.3rem" },
              letterSpacing: { xs: "2vw", sm: "4px" },
            }}
          >
            Un artisan{" "}
            <Box
              component="span"
              fontSize="3rem"
              letterSpacing="3px"
              sx={{
                color: theme.palette.secondary.main,
                fontStyle: "italic",
              }}
            >
              passionné
            </Box>
            ,
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(1)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Typography
            color="#fff"
            textTransform="uppercase"
            fontWeight="bold"
            marginTop="1rem"
            zIndex={4}
            sx={{
              textShadow: "0.15em -0.1em 0.3em black",
              fontSize: { xs: "3vw", sm: "2rem", md: "2.3rem" },
              letterSpacing: { xs: "2vw", sm: "4px" },
            }}
          >
            un parcours{" "}
            <Box
              component="span"
              fontSize="3rem"
              letterSpacing="3px"
              sx={{
                color: theme.palette.secondary.main,
                fontStyle: "italic",
              }}
            >
              atypique
            </Box>
            .
          </Typography>
        </motion.div>
        <Button
          href={href}
          sx={{
            backgroundColor: btnColor,
            fontWeight: "bold",
            color: theme.palette.background.main,
            padding: ".5rem 1.5rem",
            zIndex: 4,
            marginTop: 2,
            textTransform: "uppercase",
            letterSpacing: { xs: 1, md: 2 },
            fontSize: { xs: "0.7rem", md: "0.875rem" },
            border: `2px solid ${theme.palette.background.secondary}`,
            "&:hover": {
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: "rgb(0,0,0,0.5)",
              transform: "scale(1.1)",
            },
          }}
        >
          À propos de moi
        </Button>
      </Stack>
    </Parallax>
  )
}

export default function ParralaxLandingSection(props) {
  const { btnColor, bgImg, href } = props
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
    >
      <Container btnColor={btnColor} bgImg={bgImg} href={href} />
    </Stack>
  )
}
