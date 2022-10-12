import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
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
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews"
import Stepper from "../Navigation/stepper"
import SwipeIcon from "@mui/icons-material/Swipe"
import useSWR from "swr"
import apiCall from "../../services/apiCalls/apiCall"
import FlashingUnderscore from "../Animation/flashing-underscore"
import FlashingRec from "../Animation/FlashingRec"

async function fetchUpToDateServices() {
  const res = await apiCall.unauthenticated.getMyServices()
  const jsonRes = await res.json()
  return jsonRes
}

const ListItem = (props) => (
  <Typography
    className="no-select"
    display="flex"
    alignItems="center"
    justifyContent="left"
    marginBottom="0.5rem"
    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
    {...props}
  />
)

const ListIcon = () => (
  <>
    <svg width={0} height={0}>
      <linearGradient id="linearColors" x1={0} y1={1} x2={0.8} y2={0.2}>
        <stop offset={0} stopColor={theme.palette.tersary.main} />
        <stop offset={1} stopColor={theme.palette.secondary.main} />
      </linearGradient>
    </svg>
    <TaskAltOutlinedIcon
      // color="secondary"
      sx={{
        marginRight: "0.5rem",
        fontSize: { xs: "1.2rem", md: "1.4rem" },
        fill: "url(#linearColors)",
      }}
    />
  </>
)

const List = ({ items }) =>
  items.map((item, key) => (
    <ListItem key={key}>
      <ListIcon />
      {item}
    </ListItem>
  ))

const ServiceCard = ({ service, href, animationElement, orientation }) => {
  if (!service?.service_items) return null
  return (
    <CustomCard gradientOrientation={orientation}>
      <CustomCardTitle
        className="no-select"
        color={(theme) => theme.palette.secondary.main}
      >
        {service?.name || ""}
        {animationElement}
      </CustomCardTitle>

      <Box textAlign="left" flexGrow={1} letterSpacing={1}>
        <List items={service.service_items} />
      </Box>

      <EndCardButton href={href} text="Découvrir +" />
    </CustomCard>
  )
}

const Caroussel = ({ services }) => {
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
          easeFunction: "cubic-bezier(0.1, 0.8, 0.3, 1)",
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
          <ServiceCard
            service={services[0]}
            animationElement={<FlashingRec />}
            href="/films"
            orientation="left"
          />
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
          <ServiceCard
            service={services[1]}
            animationElement={<FlashingUnderscore />}
            href="/websites"
            orientation="right"
          />
        </Stack>
      </SwipeableViews>

      <Stack
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

      <Stepper totalSteps={2} activeStep={index} setActiveStep={setIndex} />
    </>
  )
}

export default function ServicesSection(props) {
  const { refForScroll } = props

  const { data, error, mutate } = useSWR(
    `/my-services`,
    async () => fetchUpToDateServices(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return null

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
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "60px" }} />

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
                <Caroussel services={data} />
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  variants={variants(1)}
                  animate={controls}
                  style={motionDivStyle}
                >
                  <ServiceCard
                    service={data[0]}
                    animationElement={<FlashingRec />}
                    href="/films"
                    orientation="left"
                  />
                </motion.div>

                <motion.div
                  initial="hidden"
                  variants={variants(2)}
                  animate={controls}
                  style={motionDivStyle}
                >
                  <ServiceCard
                    service={data[1]}
                    animationElement={<FlashingUnderscore />}
                    href="/websites"
                    orientation="right"
                  />
                </motion.div>
              </>
            )}
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    </>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateServices()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
