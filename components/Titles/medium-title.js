import { Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function MediumTitle({ preventTransitionOut, ...props }) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0 },
    }
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
        variants={variants(0)}
        animate={controls}
        style={motionDivStyle}
      >
        <Typography
          variant="h2"
          color="secondary"
          zIndex={1}
          letterSpacing={1}
          sx={{
            fontSize: { xs: "12vw", sm: "9vw", md: "7vw" },
            lineHeight: props.lineHeight || {
              xs: "12vw",
              sm: "9w",
              md: "7vw",
            },
            padding: "0 .5rem",
          }}
          {...props}
        />
      </motion.div>
    </Stack>
  )
}
