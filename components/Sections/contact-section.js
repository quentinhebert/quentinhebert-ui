import { useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import ContactForm from "../Forms/contact-form"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import StrokeText from "../ReusableComponents/text/stroke-text"

export default function ContactSection(props) {
  const { defaultService } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      transition: { duration: 0.75, delay: 0 },
    },
    hidden: { opacity: 0 },
  })
  const controls = useAnimation()

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
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        overflow: "hidden",
        backgroundColor: (theme) => theme.palette.secondary.main,
        padding: "2rem",
      }}
      ref={ref}
    >
      <Typography
        fontSize="3rem"
        textTransform="uppercase"
        fontWeight="bold"
        // fontStyle="italic"
      >
        Hello, can I help you ?
      </Typography>
      <motion.div
        initial="hidden"
        variants={variants(1)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ContactForm defaultService={defaultService} />
      </motion.div>
    </Stack>
  )
}
