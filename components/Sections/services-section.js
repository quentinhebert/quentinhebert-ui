import { Box, Stack, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import TitleCard from "../ReusableComponents/cards/title-card"
import theme from "../../config/theme"
import CustomCard from "../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../ReusableComponents/cards/end-card-button"

const VideoCard = () => (
  <CustomCard
    rightbgcolor={`${theme.palette.background.main}`}
    leftbgcolor="#000"
    lineardeg="-50deg"
  >
    <CustomCardTitle
      title="Vidéo"
      icon={<VideocamIcon sx={{ marginRight: "1rem" }} />}
    />

    <Box textAlign="left" flexGrow={1} letterSpacing={1}>
      <Typography>- Film de mariage</Typography>
      <Typography>- Publicité d'entreprise</Typography>
      <Typography>- Clip musical, Aftermovie & Teaser</Typography>
      <Typography>- Portrait et Interview</Typography>
      <Typography>- Court-métrage</Typography>
    </Box>

    <EndCardButton href="/films" text="Découvrir +" />
  </CustomCard>
)

const WebCard = () => (
  <CustomCard
    rightbgcolor="#000"
    leftbgcolor={theme.palette.background.main}
    lineardeg="-140deg"
  >
    <CustomCardTitle
      title="Web"
      icon={<DesktopMacOutlinedIcon sx={{ marginRight: "1rem" }} />}
    />

    <Box textAlign="left" flexGrow={1} letterSpacing={1}>
      <Typography>- Site vitrine</Typography>
      <Typography>- Landing Page</Typography>
      <Typography>- Newsletters</Typography>
      <Typography>- Back-Office personnalisé</Typography>
      <Typography>- E-mails automatiques personnalisés</Typography>
      <Typography>- Base de données complexe et API sur-mesure</Typography>
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

      <CenteredMaxWidthContainer>
        <Stack
          width="100%"
          margin="6rem 0 4rem"
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{
            backgroundColor: "#000",
          }}
          ref={ref}
        >
          <TitleCard
            stroketext="mes"
            text="services"
            leftBgColor="#000"
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
