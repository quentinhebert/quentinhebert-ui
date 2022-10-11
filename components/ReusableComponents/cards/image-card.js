import { Stack } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function ImageCard({
  img,
  width,
  display,
  minHeight,
  ...props
}) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
      ease: [0.5, 0.71, 1, 1.5],
    },
    hidden: { opacity: 0, scale: 0.7 },
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])
  const motionDivStyle = {
    flexGrow: 1,
    width: "100%",
  }

  return (
    <Stack ref={ref} flexGrow={1}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={motionDivStyle}
      >
        <Stack
          sx={{
            flexGrow: 1,
            height: "100%",
            width: width || "100%",
            minHeight: minHeight || "400px",
            display: display || { xs: "none", md: "flex" },
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            borderRadius: "20px",
          }}
          {...props}
        />
      </motion.div>
    </Stack>
  )
}
