import { Box } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function Pill({
  animDelay,
  preventTransitionOut,
  bgColor,
  color,
  cursor,
  scaleUpOnHover,
  boxShadowOnHover,
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
          lineHeight="2rem"
          letterSpacing={1}
          textTransform="capitalize"
          sx={{
            cursor: cursor || "default",
            padding: { xs: "0rem 1rem", md: "0.1rem 1rem" },
            margin: { xs: "0.25rem", md: "0.5rem" },
            fontSize: { xs: "0.8rem", md: "1rem" },
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
