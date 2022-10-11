import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Text = styled((props) => {
  const { color, fontFamily, preventTransitionOut, animDelay } = props

  /********** ANIMATION **********/
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
    if (inView) {
      controls.start("visible")
    } else if (!preventTransitionOut) {
      controls.start("hidden")
    }
  }, [controls, inView])
  const motionDivStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <Stack ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={motionDivStyle}
      >
        <Typography
          component={"span"}
          fontFamily={fontFamily || "Helmet"}
          sx={{
            fontSize: props.fontSize || {
              xs: "0.8rem",
              sm: "0.95rem",
              md: "1.1rem",
            },
            letterSpacing: props.letterSpacing || 1,
            lineHeight: props.lineHeight || {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
            },
            color: color || ((theme) => theme.palette.text.white),
          }}
          {...props}
        />
      </motion.div>
    </Stack>
  )
})(() => ({}))

export default function BodyText(
  props = { fontFamily, color, preventTransitionOut }
) {
  return <Text {...props} />
}
