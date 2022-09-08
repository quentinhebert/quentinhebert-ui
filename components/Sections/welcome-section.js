import { Box, Button, Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import BodyText from "../ReusableComponents/text/body-text"
import styles from "../../styles/TextShine.module.css"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import MediumTitle from "../ReusableComponents/titles/medium-title"

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
      <Stack ref={topRef} sx={{ scrollMarginTop: "65px" }} />

      <Stack
        width="100%"
        height="calc(100vh - 65px)"
        alignItems="center"
        justifyContent="center"
        ref={ref}
        zIndex={1}
      >
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
            <BodyText color="text.white" textAlign="center" letterSpacing={1}>
              Je m'appelle Quentin HÉBERT et je suis vidéaste professionnel et
              développeur web.
              <br />
              Artisan, j'allie ma créativité à mon savoir-faire pour vous aider
              à mieux communiquer une idée, un bien ou un service.
            </BodyText>
          </CenteredMaxWidthContainer>

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              component="a"
              className={"cool-button"}
              sx={{
                letterSpacing: 1,
                cursor: "pointer",
              }}
              onClick={(e) => scrollTo(refForScroll)}
            >
              <Typography
                color="secondary"
                textTransform="uppercase"
                fontSize="1.2rem"
              >
                Les services que je propose
              </Typography>
            </Box>
            <ChevronRightIcon
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            />
          </Stack>
        </motion.div>
      </Stack>
    </>
  )
}
