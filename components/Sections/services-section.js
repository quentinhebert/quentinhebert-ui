import { Box, Stack, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import TitleCard from "../ReusableComponents/cards/title-card"
import theme from "../../config/theme"
import CustomCard from "../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../ReusableComponents/cards/end-card-button"
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined"

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
      display="flex"
      alignItems="center"
      justifyContent="left"
      key={key}
      marginBottom="0.5rem"
    >
      <TaskAltOutlinedIcon color="secondary" sx={{ marginRight: "0.5rem" }} />
      {item}
    </Typography>
  ))

const VideoCard = () => (
  <CustomCard
    rightbgcolor={`${theme.palette.background.main}`}
    leftbgcolor="transparent"
    lineardeg="-50deg"
  >
    <CustomCardTitle
      title="Vidéo"
      icon={<VideocamIcon sx={{ fontSize: "2rem", marginRight: "1rem" }} />}
    />

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
    <CustomCardTitle
      title="Web"
      icon={
        <DesktopMacOutlinedIcon
          sx={{ fontSize: "2rem", marginRight: "1rem" }}
        />
      }
    />

    <Box textAlign="left" flexGrow={1} letterSpacing={1}>
      <List src={SERVICES.WEB} />
    </Box>

    <EndCardButton href="/websites" text="Découvrir +" />
  </CustomCard>
)

export default function ServicesSection(props) {
  const { refForScroll } = props

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
  }

  return (
    <>
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "65px" }} />

      <CenteredMaxWidthContainer zIndex={1}>
        <Stack
          width="100%"
          margin="6rem 0 4rem"
          alignItems="center"
          justifyContent="center"
          gap={2}
          ref={ref}
        >
          <TitleCard
            stroketext="mes"
            text="services"
            leftBgColor="transparent"
            rightBgColor={theme.palette.background.main}
          />

          <Stack
            width="100%"
            gap={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
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
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    </>
  )
}