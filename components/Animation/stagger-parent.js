import { Stack } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useContext, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../contexts/AppContext"

export const containerVariants = ({ staggerChildren }) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5, // this will set a delay before the children start animating
      staggerChildren: staggerChildren || 0.1, // this will set the time inbetween children animation
    },
  },
})

export default function StaggerParent({
  staggerChildren,
  wrapperProps,
  ...props
}) {
  const { appLoading } = useContext(AppContext)
  const [AnimationRef, inView] = useInView()
  const controls = useAnimation()

  useEffect(() => {
    if (!appLoading) controls.start("visible")
  }, [controls, appLoading])

  return (
    <Stack {...wrapperProps} ref={AnimationRef}>
      <motion.div
        variants={containerVariants({ staggerChildren })}
        animate={controls}
        initial="hidden"
        {...props}
      />
    </Stack>
  )
}
