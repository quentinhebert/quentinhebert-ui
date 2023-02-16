import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import BodyText from "../Text/body-text"

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
    className,
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

  useEffect(() => {
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
      direction="column"
      backgroundColor={bgColor}
      padding={padding || "1rem"}
      ref={ref}
      zIndex={0}
    >
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={{ textAlign: "center" }}
      >
        <BodyText>{secondaryText}</BodyText>
        <Typography
          variant="h2"
          textTransform="uppercase"
          letterSpacing={letterSpacing || "5px"}
          textAlign="center"
          color={mainColor}
          fontSize={isMobileOrTablet ? "1.7rem" : "2rem"}
          fontFamily={mainFontFamily || null}
          padding="0 1rem"
          className={className}
        >
          {mainText}
        </Typography>
      </motion.div>
    </Stack>
  )
}
