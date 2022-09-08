import { Box, Button, Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import BodyText from "../ReusableComponents/text/body-text"
import styles from "../../styles/TextShine.module.css"
import MediumTitle from "../ReusableComponents/titles/medium-title"
import CenteredLandingButton from "../ReusableComponents/buttons/centered-landing-button"

export default function WelcomeSection(props) {
  const { scrollTo, topRef, refForScroll } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        y: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0, y: -25 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])
  const motionDivStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "2rem",
  }

  return (
    <>
      <Stack
        ref={topRef}
        sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
      />

      <Stack
        width="100%"
        height="calc(100vh - 65px)"
        justifyContent="center"
        zIndex={1}
      >
        <Stack ref={ref}>
          <motion.div
            initial="hidden"
            variants={variants(2)}
            animate={controls}
            style={motionDivStyle}
          >
            <MediumTitle textAlign="center" className={styles.shine}>
              Bienvenue sur mon site
            </MediumTitle>

            <CenteredMaxWidthContainer zIndex={1}>
              <BodyText
                color="text.white"
                textAlign="center"
                className="no-select"
              >
                Je m'appelle Quentin HÉBERT et je suis vidéaste professionnel et
                développeur web.
                <br />
                Artisan, j'allie ma créativité à mon savoir-faire pour vous
                aider à mieux communiquer une idée, un bien ou un service.
              </BodyText>
            </CenteredMaxWidthContainer>

            <CenteredLandingButton onClick={(e) => scrollTo(refForScroll)}>
              Les services que je propose
            </CenteredLandingButton>
          </motion.div>
        </Stack>
      </Stack>
    </>
  )
}
