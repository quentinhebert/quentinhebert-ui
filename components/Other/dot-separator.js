import { Stack } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function DotSeparator(props) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        y: 1,
        transition: { duration: 0.5, delay: key / 20 },
      },
      hidden: { opacity: 0, y: -25 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Stack
      width="100%"
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      gap={1}
      ref={ref}
      {...props}
    >
      {[...Array(props.dots || 7).keys()].map((key) => (
        <motion.div
          initial="hidden"
          variants={variants(key)}
          animate={controls}
          style={{ display: "flex" }}
        >
          <CircleIcon
            key={key}
            sx={{
              color: (theme) => theme.palette.secondary.main,
              width: ".5rem",
            }}
          />
        </motion.div>
      ))}
    </Stack>
  )
}
