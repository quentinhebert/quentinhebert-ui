import * as React from "react"
import Box from "@mui/material/Box"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function BicolorTitle(props) {
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
  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75 },
    },
    hidden: { opacity: 0 },
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
      marginTop="0.25px"
      ref={ref}
    >
      <motion.div initial="hidden" variants={variants} animate={controls}>
        <Box
          component="div"
          width="100%"
          color={secondaryColor}
          textTransform="uppercase"
          letterSpacing="2px"
          textAlign="center"
          fontFamily="Helmet"
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
