import { Box } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function Pill({
  animDelay,
  preventTransitionOut,
  preventTransition,
  bgColor,
  color,
  cursor,
  scaleUpOnHover,
  boxShadowOnHover,
  margin,
  fontSize,
  padding,
  ...props
}) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: animDelay ? animDelay / 10 : 0 },
    },
    hidden: { opacity: 0, y: -10 },
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!preventTransitionOut && !preventTransition) {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Box className="inline-flex" ref={ref}>
      <motion.div
        initial={!preventTransition ? "hidden" : "visible"}
        variants={variants}
        animate={controls}
        style={{ width: "100%" }}
      >
        <Box
          component="span"
          className="inline-flex"
          lineHeight="2rem"
          textTransform="capitalize"
          sx={{
            cursor: cursor || "default",
            padding: padding || { xs: "0rem 1rem", md: "0.1rem 1rem" },
            margin: margin || { xs: "0.25rem", md: "0.25rem" },
            fontSize: fontSize || { xs: "0.8rem", md: "1rem" },
            backgroundColor: bgColor || "#fff",
            color: color || "#000",
            borderRadius: "20px",
            boxShadow: "5px 5px 20px 1px rgb(0,0,0,0.2)",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: scaleUpOnHover ? "scale(1.1)" : "",
              boxShadow: boxShadowOnHover
                ? (theme) => `0px 0px 15px 1px ${theme.palette.secondary.main}`
                : "",
            },
          }}
          {...props}
        />
      </motion.div>
    </Box>
  )
}
