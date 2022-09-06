import * as React from "react"
import { Stack, useMediaQuery } from "@mui/material"
import LeftPartContact from "./LeftPartContact"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Navbar from "../../Navigation/Navbars/navbar"
import Footer from "../../Navigation/Footers/Footer"
import ContactForm from "../../Forms/contact-form"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"

export default function ContactLayout(props) {
  const {} = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1, delay: 0 },
        },
        hidden: { opacity: 0, x: -200 },
      }
    return {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, delay: 0 },
      },
      hidden: { opacity: 0, x: 200 },
    }
  }
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** STYLE **********/
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"))

  return (
    <Stack
      width="100%"
      overflow="hidden"
      sx={{
        background: (theme) =>
          `linear-gradient(150deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
      }}
    >
      <Navbar />

      <CenteredMaxWidthContainer pixels="1200px" percents="80%">
        <Stack
          ref={ref}
          alignItems="baseline"
          margin="calc(65px + 4rem) 0"
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <motion.div
            initial="hidden"
            variants={variants(0)}
            animate={controls}
            style={{
              width: fullScreen ? "100%" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <LeftPartContact />
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(2)}
            animate={controls}
            style={{
              width: fullScreen ? "100%" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ContactForm defaultDirection="column" />
          </motion.div>
        </Stack>
      </CenteredMaxWidthContainer>

      <Footer />
    </Stack>
  )
}
