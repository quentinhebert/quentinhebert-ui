import { Stack } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useContext, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../contexts/AppContext"

export default function MotionDivOnMount({
  hidden,
  visible,
  delay,
  preventOut,
  WrapperProps,
  ...props
}) {
  /********** ANIMATION **********/
  const { appLoading } = useContext(AppContext)
  const [animationRef, inView] = useInView()
  const controls = useAnimation()

  useEffect(() => {
    if (inView && !appLoading) controls.start("visible")
    else if (!preventOut) controls.start("hidden")
  }, [controls, inView, appLoading])

  const variants = {
    hidden: {
      ...hidden,
      transition: { delay: delay || 0, duration: 1 },
    },
    visible: {
      ...visible,
      transition: {
        delay,
        duration: 1,
      },
    },
  }

  return (
    <Stack ref={animationRef} width="100%" {...WrapperProps}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        {...props}
      />
    </Stack>
  )
}
