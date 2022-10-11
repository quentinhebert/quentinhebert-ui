import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Text = styled((props) => {
  const { color, fontFamily } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75, delay: 0.25, ease: [0.32, 0, 0.67, 0] },
    },
    hidden: { opacity: 0 },
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
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
            fontSize: props.fontSize || { xs: "1rem", md: "1.2rem" },
            letterSpacing: props.letterSpacing || 1,
            lineHeight: props.lineHeight || {
              xs: "1.3rem",
              sm: "1.5rem",
              md: "2rem",
            },
            color: color || ((theme) => theme.palette.text.white),
          }}
          {...props}
        />
      </motion.div>
    </Stack>
  )
})(() => ({}))

export default function BodyText(props = { fontFamily, color }) {
  return <Text {...props} />
}
