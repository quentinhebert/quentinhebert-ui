import { useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import ContactForm from "../../Forms/contact-form"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import StrokeText from "../../Text/stroke-text"
import styles from "../../../styles/TextShine.module.css"

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
      margin="5rem 0"
      zIndex={1}
      position="relative"
      sx={{
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
      ref={ref}
    >
      <CenteredMaxWidthContainer pixels="800px" percents="80%" gap={2}>
        <Typography variant="h2" color="secondary">
          Vous avez un projet...
        </Typography>

        <motion.div
          initial="hidden"
          variants={variants(1)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <ContactForm defaultService={defaultService} />
        </motion.div>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
