import * as React from "react"
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { Parallax } from "react-parallax"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ScaleUpOnHoverStack from "../ReusableComponents/animations/scale-up-on-hover-stack"
import { styled } from "@mui/system"

const Text = styled((props) => (
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
    {...props}
  />
))()

const Keyword = styled((props) => (
  <Box
    component="span"
    fontSize="3rem"
    letterSpacing="3px"
    sx={{
      color: (theme) => theme.palette.secondary.main,
      fontStyle: "italic",
    }}
    {...props}
  />
))()

const Container = ({ btnColor, bgImg, href }) => {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0, x: key === 0 ? -25 : 25 }, // Different side for the first and second line
  })

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
      bgImageAlt="Image de fond du parallax"
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
        padding={3}
        border={(theme) => `4px solid ${theme.palette.secondary.main}`}
        height="400px"
        ref={ref}
      >
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Text>
            Un artisan <Keyword>passionné</Keyword>,
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(1)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Text>
            un parcours <Keyword>atypique</Keyword>.
          </Text>
        </motion.div>

        <ScaleUpOnHoverStack>
          <Button
            href={href}
            sx={{
              backgroundColor: btnColor,
              fontWeight: "bold",
              color: (theme) => theme.palette.text.primaryDark,
              padding: ".5rem 1.5rem",
              zIndex: 4,
              marginTop: 2,
              textTransform: "uppercase",
              letterSpacing: { xs: 1, md: 2 },
              fontSize: { xs: "0.7rem", md: "0.875rem" },
              border: (theme) =>
                `2px solid ${theme.palette.background.secondary}`,
              "&:hover": {
                color: (theme) => theme.palette.text.secondary,
                backgroundColor: "rgb(0,0,0,0.5)",
              },
            }}
          >
            À propos de moi
          </Button>
        </ScaleUpOnHoverStack>
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
