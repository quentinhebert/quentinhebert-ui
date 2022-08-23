import * as React from "react"
import Box from "@mui/material/Box"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function BicolorTitleBand(props) {
  const {
    mainText,
    mainColor,
    secondaryText,
    mainFontFamily,
    secondaryColor,
    bgColor,
    padding,
    letterSpacing,
  } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.5 },
      },
      hidden: { opacity: 0, scaleX: 0 },
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

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      minHeight="100px"
      direction="column"
      backgroundColor={bgColor}
      padding={padding || "1rem"}
      ref={ref}
      zIndex={2}
    >
      <motion.div initial="hidden" variants={variants(1)} animate={controls}>
        <Box
          component="div"
          width="100%"
          color={secondaryColor}
          textTransform="uppercase"
          letterSpacing="2px"
          textAlign="center"
          fontFamily="Arial"
          fontSize={isMobileOrTablet ? "0.85rem" : "1rem"}
        >
          {secondaryText}
        </Box>
        <Typography
          component="h2"
          textTransform="uppercase"
          letterSpacing={letterSpacing || "5px"}
          textAlign="center"
          color={mainColor}
          fontSize={isMobileOrTablet ? "1.7rem" : "2rem"}
          fontFamily={mainFontFamily || null}
        >
          {mainText}
        </Typography>
      </motion.div>
    </Stack>
  )
}
