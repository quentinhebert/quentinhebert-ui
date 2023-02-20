import { useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import ContactForm from "../../Forms/contact-form"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"

export default function ContactSection(props) {
  const { defaultService } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.75, delay: key },
    },
    hidden: { opacity: 0, x: -25 },
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
      padding="5rem 0"
      zIndex={1}
      position="relative"
      bgcolor="background.black"
      sx={{
        overflow: "hidden",
      }}
      ref={ref}
    >
      <CenteredMaxWidthContainer pixels="800px" percents="80%" gap={2}>
        <motion.div initial="hidden" variants={variants(0)} animate={controls}>
          <Typography variant="h2" color="secondary">
            Vous avez un projet...
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(0.5)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <ContactForm defaultService={defaultService} />
        </motion.div>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
