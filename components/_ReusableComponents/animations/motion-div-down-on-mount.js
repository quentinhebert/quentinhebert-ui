import { motion } from "framer-motion"

export default function MotionDivDownOnMount({ delay, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: delay || 0 }}
      className="full-width"
      {...props}
    />
  )
}
