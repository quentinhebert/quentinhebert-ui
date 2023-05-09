import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { useContext, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../contexts/AppContext"

const Text = styled(
  ({
    color,
    fontFamily,
    preventTransition,
    preventTransitionOut,
    animDelay,
    textAlign,
    letterSpacing,
    fontSize,
    lineHeight,
    width,
    ...props
  }) => {
    let customColor = color
    if (!!color && color === "secondary")
      customColor = (theme) => theme.palette.secondary.main

    /********** ANIMATION **********/
    const { appLoading } = useContext(AppContext)
    const [ref, inView] = useInView()
    const controls = useAnimation()
    const variants = {
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: animDelay || 0.25,
          ease: [0.32, 0, 0.67, 0],
        },
      },
      hidden: { opacity: 0 },
    }
    useEffect(() => {
      if (preventTransition) return
      if (inView && !appLoading) controls.start("visible")
      else if (!preventTransitionOut) controls.start("hidden")
    }, [controls, inView, appLoading])

    return (
      <Box
        component={"span"}
        ref={ref}
        textAlign={textAlign || "left"}
        width={width || "auto"}
      >
        <motion.span
          initial={preventTransition ? "visible" : "hidden"}
          variants={variants}
          animate={controls}
        >
          <Typography
            component={"span"}
            fontFamily={fontFamily || ((theme) => theme.typography.fontFamily)}
            sx={{
              fontSize: fontSize || {
                xs: "0.8rem",
                md: "1rem",
              },
              letterSpacing: letterSpacing || 0,
              lineHeight: lineHeight || {
                xs: "1rem",
                md: "1.6rem",
              },
              color: customColor || ((theme) => theme.palette.text.white),
            }}
            {...props}
          />
        </motion.span>
      </Box>
    )
  }
)(() => ({}))

export default function BodyText(
  props = {
    color,
    fontFamily,
    preventTransition,
    preventTransitionOut,
    animDelay,
    textAlign,
    letterSpacing,
    fontSize,
    lineHeight,
  }
) {
  return <Text {...props} />
}
