import { Box, Button } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function PillButton({
  background,
  padding,
  color,
  margin,
  textTransform,
  onClick,
  animDelay,
  preventTransitionOut,
  ...props
}) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: animDelay || 0 },
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
    <Box margin={margin || 0} ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={{ width: "100%" }}
      >
        <Button
          variant="contained"
          sx={{
            background: background || ((theme) => theme.palette.secondary.main),
            color: color || "#000",
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            borderRadius: "30px",
            padding: padding || { xs: ".5rem 1.25rem", md: ".5rem 2rem" },
            boxShadow: "5px 10px 30px 5px rgb(0,0,0,0.3)",
            textTransform: textTransform || "uppercase",
            "&:hover": {
              background:
                background || ((theme) => theme.palette.secondary.main),
              opacity: 0.8,
            },
          }}
          onClick={onClick || (() => {})}
          {...props}
        />
      </motion.div>
    </Box>
  )
}
