import { motion } from "framer-motion"

export const containerVariants = ({ staggerChildren }) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25, // this will set a delay before the children start animating
      staggerChildren: staggerChildren || 0.1, // this will set the time inbetween children animation
    },
  },
})

export default function StaggerParent({ staggerChildren, ...props }) {
  return (
    <motion.div
      variants={containerVariants({ staggerChildren })}
      initial="hidden"
      animate="visible"
      {...props}
    />
  )
}
