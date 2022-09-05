import { useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import ContactForm from "../Forms/contact-form"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import StrokeText from "../ReusableComponents/text/stroke-text"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"

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
        // backgroundColor: (theme) => theme.palette.secondary.main,
        background: (theme) =>
          `linear-gradient(180deg, #000 70%, ${theme.palette.background.secondary} 100%)`,
        padding: "2rem",
      }}
      ref={ref}
    >
      <CenteredMaxWidthContainer>
        <Stack
          sx={{
            width: "100%",
            borderRadius: "10px",
            padding: "1rem",
            background: (theme) =>
              `linear-gradient(-50deg, rgb(0,0,0,1) 0%, ${theme.palette.background.main} 100%)`,
          }}
        >
          <motion.div
            initial="hidden"
            variants={variants(0)}
            animate={controls}
          >
            <Typography
              // color="text.white"
              color="secondary"
              textAlign="center"
              variant="h2"
              textTransform="uppercase"
              fontStyle="italic"
              // fontWeight="bold"
            >
              <StrokeText>Me </StrokeText> Contacter
            </Typography>
          </motion.div>
        </Stack>
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
