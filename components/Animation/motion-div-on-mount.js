import { Stack } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useContext, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../contexts/AppContext"
import { ease } from "./eases"

export default function MotionDivOnMount({
  hidden,
  visible,
  delay,
  ease,
  preventOut,
  ...props
}) {
  /********** ANIMATION **********/
  const { appLoading } = useContext(AppContext)
  const [animationRef, inView] = useInView()
  const controls = useAnimation()

  // const easeObj = !ease ? { ease } : null

  useEffect(() => {
    if (inView && !appLoading) controls.start("visible")
    else if (!preventOut) controls.start("hidden")
  }, [controls, inView, appLoading])

  const variants = {
    hidden: {
      ...hidden,
      transition: { delay: delay || 0, duration: 1, ease },
    },
    visible: {
      ...visible,
      transition: {
        delay,
        duration: 1,
        ease,
      },
    },
  }

  return (
    <Stack ref={animationRef} width="100%">
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        {...props}
      />
    </Stack>
  )
}
