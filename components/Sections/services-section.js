import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import GradientTitleCard from "../ReusableComponents/cards/gradient-title-card"
import theme from "../../config/theme"
import CustomCard from "../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../ReusableComponents/cards/end-card-button"
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined"
import StrokeText from "../ReusableComponents/text/stroke-text"
import styles from "../../styles/TextShine.module.css"
import fadeStyles from "../../styles/InfiniteFade.module.css"
import flashingStyles from "../../styles/FlashingRedDot.module.css"
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import FlashingRedDot from "../Navigation/FlashingRedDot"

const SERVICES = {
  VIDEO: [
    "Film de mariage",
    "Publicité d'entreprise",
    "Clip musical, Aftermovie & Teaser",
    "Portrait et Interview",
    "Court-métrage",
  ],
  WEB: [
    "Site vitrine",
    "Landing Page",
    "Newsletters",
    "Back-Office personnalisé",
    "E-mails automatiques personnalisés",
    "Base de données complexe et API sur-mesure",
  ],
}

const List = ({ src }) =>
  src.map((item, key) => (
    <Typography
      className="no-select"
      display="flex"
      alignItems="center"
      justifyContent="left"
      key={key}
      marginBottom="0.5rem"
      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
    >
      <TaskAltOutlinedIcon
        color="secondary"
        sx={{ marginRight: "0.5rem", fontSize: { xs: "1.2rem", md: "1.4rem" } }}
      />
      {item}
    </Typography>
  ))

const VideoCard = () => (
  <CustomCard
    rightbgcolor={`${theme.palette.background.main}`}
    leftbgcolor="transparent"
    lineardeg="-50deg"
  >
    <CustomCardTitle className="no-select">
      Vidéo
      <FlashingRedDot />
    </CustomCardTitle>

    <Box textAlign="left" flexGrow={1} letterSpacing={1}>
      <List src={SERVICES.VIDEO} />
    </Box>

    <EndCardButton href="/films" text="Découvrir +" />
  </CustomCard>
)

const WebCard = () => (
  <CustomCard
    rightbgcolor="transparent"
    leftbgcolor={theme.palette.background.main}
    lineardeg="-140deg"
  >
    <CustomCardTitle className="no-select">
      Web
      <Box
        className={flashingStyles.flash}
        sx={{
          color: (theme) => theme.palette.text.secondary,
          marginLeft: ".25rem",
        }}
      >
        _
      </Box>
    </CustomCardTitle>

    <Box textAlign="left" flexGrow={1} letterSpacing={1}>
      <List src={SERVICES.WEB} />
    </Box>

    <EndCardButton href="/websites" text="Découvrir +" />
  </CustomCard>
)

const Stepper = ({ totalSteps, activeStep, setActiveStep }) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ color: (theme) => theme.palette.secondary.main }}
    >
      {[...Array(totalSteps).keys()].map((key) => {
        if (key === activeStep)
          return (
            <FiberManualRecordIcon
              sx={{ cursor: "pointer", fontSize: "1rem" }}
            />
          )
        return (
          <FiberManualRecordOutlinedIcon
            sx={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={(e) => setActiveStep(key)}
          />
        )
      })}
    </Stack>
  )
}

const Caroussel = () => {
  const [index, setIndex] = useState(0)
  const handleChangeIndex = (index) => {
    setIndex(index)
  }
  return (
    <>
      <SwipeableViews
        index={index}
        disableLazyLoading
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
        axis="x"
        springConfig={{
          duration: "1s",
          easeFunction: "cubic-bezier(0.3, 0, 0.3, 1)",
          delay: "0s",
        }}
      >
        <Stack
          role="tabpanel"
          id={`full-width-tabpanel-0`}
          aria-controls={`full-width-tab-0`}
          value={0}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", width: "90%", margin: "auto" }}
        >
          <VideoCard />
        </Stack>
        <Stack
          role="tabpanel"
          id={`full-width-tabpanel-1`}
          aria-controls={`full-width-tab-1`}
          value={0}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", width: "90%", margin: "auto" }}
        >
          <WebCard />
        </Stack>
      </SwipeableViews>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ color: (theme) => theme.palette.secondary.main }}
        flexDirection="row"
        gap={1}
        className={styles.shine}
      >
        <KeyboardArrowLeftIcon className={fadeStyles.fade} />
        <Typography fontStyle="italic" letterSpacing={1}>
          Faire défiler
        </Typography>
        <KeyboardArrowRightIcon className={fadeStyles.fade} />
      </Stack>

      <Stepper totalSteps={2} activeStep={index} setActiveStep={setIndex} />
    </>
  )
}

export default function ServicesSection(props) {
  const { refForScroll } = props
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

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
      hidden: { opacity: 0, y: key === 0 ? 0 : -25 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView, sm])
  const motionDivStyle0 = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }
  const motionDivStyle = {
    width: "100%",
    display: "flex",
  }

  return (
    <>
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "65px" }} />

      <CenteredMaxWidthContainer zIndex={1}>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="center"
          ref={ref}
          sx={{
            margin: { xs: "2rem 0 8rem", md: "6rem 0 12rem" },
            gap: { xs: 1, md: 2 },
          }}
        >
          <GradientTitleCard inversed="true" className="no-select">
            <StrokeText color={(theme) => theme.palette.secondary.main}>
              Quels
            </StrokeText>{" "}
            <Box component="span" className={styles.shine}>
              services ?
            </Box>
          </GradientTitleCard>

          <Stack
            width="100%"
            justifyContent="center"
            gap={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {sm ? (
              <motion.div
                initial="hidden"
                variants={variants(0)}
                animate={controls}
                style={motionDivStyle0}
              >
                <Caroussel />
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  variants={variants(1)}
                  animate={controls}
                  style={motionDivStyle}
                >
                  <VideoCard />
                </motion.div>

                <motion.div
                  initial="hidden"
                  variants={variants(2)}
                  animate={controls}
                  style={motionDivStyle}
                >
                  <WebCard />
                </motion.div>
              </>
            )}
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    </>
  )
}
