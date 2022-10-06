import { motion } from "framer-motion"

export default function MotionDivFadeInOnMount({ delay, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: delay || 0 }}
      className="full-width"
      {...props}
    />
  )
}
