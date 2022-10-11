import { Box, Stack, Typography, Image } from "@mui/material"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import styles from "../../../styles/TextShine.module.css"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import StrokeText from "../../ReusableComponents/text/stroke-text"
import BodyText from "../../ReusableComponents/text/body-text"
import SwipeableViews from "../../Other/SwipeableViews"
import { useEffect, useState } from "react"
import Stepper from "../../Navigation/stepper"
import SwipeIcon from "@mui/icons-material/Swipe"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const KeyWord = ({ text }) => (
  <Box
    component="span"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      fontStyle: "italic",
      fontSize: { xs: "1.2rem", md: "1.4rem" },
    }}
  >
    {text}
  </Box>
)

const WhyWebsite = () => (
  <Stack alignItems="center" justifyContent="center">
    <MediumTitle
      textAlign="center"
      className={styles.shine}
      fontFamily="Zacbel X"
      lineHeight={{ xs: "15vw", sm: "10vw" }}
    >
      <StrokeText>Pourquoi un</StrokeText> site web ?
    </MediumTitle>

    <CenteredMaxWidthContainer marginTop="1rem">
      <BodyText textAlign="center" className="no-select">
        À l'ère du numérique, difficile de se passer d'un site web pour
        présenter sa marque, son entreprise ou ses créations. Vos réseaux
        sociaux permettent d'attirer votre cible, mais votre site web
        professionnel marque un point d'honneur à votre{" "}
        <KeyWord text="crédibilité" />.
      </BodyText>
    </CenteredMaxWidthContainer>
  </Stack>
)

const WhyDevelopper = () => (
  <Stack alignItems="center" justifyContent="center">
    <MediumTitle
      textAlign="center"
      className={styles.shine}
      fontFamily="Zacbel X"
      lineHeight={{ xs: "15vw", sm: "10vw" }}
    >
      <StrokeText>Pourquoi un</StrokeText> développeur ?
    </MediumTitle>

    <CenteredMaxWidthContainer marginTop="1rem">
      <BodyText textAlign="center" className="no-select">
        WordPress, Wix, Odoo... Tant d'outils clés en main et à la portée de
        tous !
        <br />
        C'est ce que vous <KeyWord text="ne trouverez pas ici" />.
        <p />
        Avec un dévelopeur professionnel, vous pourrez discuter, de ce qui est
        faisable techniquement, mais son expérience saura également vous éviter
        certains eccueils.
      </BodyText>
    </CenteredMaxWidthContainer>
  </Stack>
)

const WhyMe = () => (
  <Stack alignItems="center" justifyContent="center">
    <MediumTitle
      textAlign="center"
      className={styles.shine}
      fontFamily="Zacbel X"
      lineHeight={{ xs: "15vw", sm: "10vw" }}
    >
      <StrokeText>Pourquoi </StrokeText> moi ?
    </MediumTitle>

    <CenteredMaxWidthContainer marginTop="1rem">
      <BodyText textAlign="center" className="no-select">
        Je me présente avant tout comme un <KeyWord text="artisan" />, fier de
        son travail, et <KeyWord text="amoureux" /> de son matériau :{" "}
        <KeyWord text="le code" />.
        <p />
        Je peux passer des heures à programmer un <KeyWord text="détail" />,
        mais qui fera toute la <KeyWord text="différence" />.
      </BodyText>
    </CenteredMaxWidthContainer>
  </Stack>
)

const WhyUs = () => (
  <Stack alignItems="center" justifyContent="center">
    <MediumTitle
      textAlign="center"
      className={styles.shine}
      fontFamily="Zacbel X"
      lineHeight={{ xs: "15vw", sm: "10vw" }}
    >
      <StrokeText>Pourquoi </StrokeText> nous ?
    </MediumTitle>

    <CenteredMaxWidthContainer marginTop="1rem">
      <BodyText textAlign="center" className="no-select">
        J'ai des idées et je sais trouver les moyens pour leur donner vie.
        <br />
        Mais ce que mon parcours atypique m'a appris, c'est que je ne
        travaillerai jamais <KeyWord text="pour vous" />. Je travaillerai{" "}
        <KeyWord text="avec vous" />.
      </BodyText>
    </CenteredMaxWidthContainer>
  </Stack>
)

const WhyStep = [WhyWebsite(), WhyDevelopper(), WhyMe(), WhyUs()]

const Caroussel = () => {
  const [index, setIndex] = useState(0)
  const handleChangeIndex = (index) => {
    setIndex(index)
  }

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
  }

  return (
    <Stack ref={ref}>
      <SwipeableViews
        index={index}
        disableLazyLoading
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
        axis="x"
        springConfig={{
          duration: "1s",
          easeFunction: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          delay: "0s",
        }}
      >
        {WhyStep.map((step, key) => (
          <motion.div
            initial="hidden"
            variants={variants(0)}
            animate={controls}
            style={motionDivStyle}
            key={key}
          >
            <Stack
              role="tabpanel"
              id={`full-width-tabpanel-${key}`}
              aria-controls={`full-width-tab-${key}`}
              value={0}
              alignItems="center"
              justifyContent="center"
              sx={{ width: "90%" }}
            >
              {step}
            </Stack>
          </motion.div>
        ))}
      </SwipeableViews>

      <Stack
        marginTop="2rem"
        alignItems="center"
        justifyContent="center"
        sx={{ color: (theme) => theme.palette.text.white }}
        flexDirection="row"
        gap={1}
        className={styles.shine}
      >
        <SwipeIcon />
        <Typography fontStyle="italic" letterSpacing={1}>
          Faire défiler
        </Typography>
      </Stack>

      <Stepper totalSteps={4} activeStep={index} setActiveStep={setIndex} />
    </Stack>
  )
}

export default function WebsitesWhyADevPart(props) {
  const { topRef } = props

  return (
    <Stack
      height="101vh"
      minHeight="600px"
      justifyContent="center"
      ref={topRef}
      sx={{ scrollMarginTop: -1 }}
    >
      <Stack padding="0rem 1rem" gap="1rem">
        <Caroussel />
      </Stack>
    </Stack>
  )
}
