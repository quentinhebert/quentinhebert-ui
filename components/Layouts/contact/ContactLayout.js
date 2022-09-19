import { Stack, useMediaQuery } from "@mui/material"
import LeftPartContact from "./LeftPartContact"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ContactForm from "../../Forms/contact-form"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import { useEffect } from "react"

export default function ContactLayout(props) {
  const {} = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (xOrigin) => ({
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0, xOrigin },
  })
  useEffect(() => {
    if (inView) controls.start("visible")
    else controls.start("hidden")
  }, [controls, inView])

  /********** ANIMATION STYLE **********/
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"))
  const motionDivStyle = {
    width: fullScreen ? "100%" : "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  }

  return (
    <Stack
      ref={ref}
      overflow="hidden"
      sx={{
        background: (theme) =>
          `linear-gradient(150deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
      }}
    >
      <CenteredMaxWidthContainer pixels="1200px" percents="80%">
        <Stack
          alignItems="baseline"
          margin="calc(65px + 4rem) 0"
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <motion.div
            initial="hidden"
            variants={variants(-200)}
            animate={controls}
            style={motionDivStyle}
          >
            <LeftPartContact />
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(200)}
            animate={controls}
            style={motionDivStyle}
          >
            <ContactForm defaultDirection="column" />
          </motion.div>
        </Stack>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
