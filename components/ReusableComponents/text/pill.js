import { Box } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function Pill({
  animDelay,
  preventTransitionOut,
  bgColor,
  color,
  ...props
}) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: animDelay ? animDelay / 10 : 0 },
    },
    hidden: { opacity: 0, y: 0 },
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!preventTransitionOut) {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Box className="inline-flex" ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={{ width: "100%" }}
      >
        <Box
          component="span"
          className="bold inline-flex"
          padding="0.3rem 1rem"
          margin="0.25rem"
          lineHeight="2rem"
          letterSpacing={1}
          textTransform="capitalize"
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            backgroundColor: bgColor || "#fff",
            color: color || ((theme) => theme.palette.text.primary),
            borderRadius: "20px",
            boxShadow: "5px 5px 20px 1px rgb(0,0,0,0.2)",
          }}
          {...props}
        />
      </motion.div>
    </Box>
  )
}
