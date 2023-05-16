import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import theme from "../../../config/theme"
import CustomCard from "../../Cards/custom-card"
import CustomCardTitle from "../../Titles/custom-card-title"
import EndCardButton from "../../Buttons/end-card-button"
import styles from "../../../styles/TextShine.module.css"
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews"
import Stepper from "../../Navigation/stepper"
import SwipeIcon from "@mui/icons-material/Swipe"
import useSWR from "swr"
import FlashingUnderscore from "../../Animation/flashing-underscore"
import FlashingRec from "../../Animation/FlashingRec"
import { fetchers } from "../../../services/public-fetchers"
import { HomePageContext } from "../../../contexts/PagesContexts"
import BodyText from "../../Text/body-text"
import AddIcon from "@mui/icons-material/Add"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import { moveDownVariants } from "../../Animation/variants"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

const ListItem = (props) => (
  <BodyText
    className="no-select"
    display="flex"
    alignItems="center"
    justifyContent="left"
    marginBottom="0.5rem"
    preventTransition
    {...props}
  />
)
const ListIcon = () => (
  <>
    {/* <svg width={0} height={0}>
      <linearGradient id="linearColors" x1={0} y1={1} x2={0.8} y2={0.2}>
        <stop offset={0} stopColor={theme.palette.tersary.main} />
        <stop offset={1} stopColor={theme.palette.secondary.main} />
      </linearGradient>
    </svg> */}
    <AddIcon
      color="secondary"
      sx={{
        marginRight: "0.5rem",
        fontSize: { xs: "1.2rem", md: "1.4rem" },
        // fill: "url(#linearColors)",
      }}
    />
  </>
)
const List = ({ items }) => {
  const { lang } = useContext(AppContext)
  return (
    <Box>
      {items.map((item, key) => (
        <ListItem key={key}>
          <ListIcon />
          {item[lang] || item.fr}
        </ListItem>
      ))}
    </Box>
  )
}

const ServiceCard = ({ service, href, animationElement, delay }) => {
  const { lang } = useContext(AppContext)
  if (!service?.service_items) return null
  return (
    <MotionDivOnMount
      hidden={moveDownVariants.hidden}
      visible={moveDownVariants.visible}
      WrapperProps={{
        sx: {
          height: { xs: "100%", lg: "auto" },
          padding: "2rem 0",
        },
      }}
      style={{ display: "flex", flexGrow: 1 }}
      delay={delay || 0}
    >
      <CustomCard
        height="auto"
        gap={4}
        padding={4}
        backgroundColor={(theme) => theme.palette.background.black}
      >
        <CustomCardTitle
          className="no-select"
          color={(theme) => theme.palette.secondary.main}
        >
          <Typography variant="h3" fontFamily="POPFINE" fontSize="3rem">
            {service?.name[lang] || service?.name?.fr || ""}
          </Typography>
          <Typography variant="h4" component="div">
            {animationElement}
          </Typography>
        </CustomCardTitle>

        <List items={service.service_items} />

        <EndCardButton
          href={href}
          text={translations.homepage.services.btn[lang]}
          icon={<ArrowRightAltIcon />}
        />
      </CustomCard>
    </MotionDivOnMount>
  )
}
const Caroussel = ({ services }) => {
  const [index, setIndex] = useState(0)
  const { lang } = useContext(AppContext)
  const handleChangeIndex = (index) => {
    setIndex(index)
  }
  return (
    <MotionDivOnMount
      hidden={moveDownVariants.hidden}
      visible={moveDownVariants.visible}
      className="flex column"
    >
      <Stack
        className={"flex-center row " + styles.shine}
        sx={{ color: (theme) => theme.palette.text.white }}
        gap={1}
      >
        <SwipeIcon sx={{ rotate: "180deg" }} />
        <Typography fontStyle="italic" letterSpacing={1} fontSize=".8rem">
          {translations.swipe[lang]}
        </Typography>
      </Stack>
      <Stepper totalSteps={2} activeStep={index} setActiveStep={setIndex} />

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
          className="flex-center full-height margin-auto"
          width="90%"
        >
          <ServiceCard
            service={services[0]}
            animationElement={<FlashingRec />}
            href="/films"
          />
        </Stack>
        <Stack
          role="tabpanel"
          id={`full-width-tabpanel-1`}
          aria-controls={`full-width-tab-1`}
          value={1}
          className="flex-center full-height margin-auto"
          width="90%"
        >
          <ServiceCard
            service={services[1]}
            animationElement={<FlashingUnderscore />}
            href="/websites"
          />
        </Stack>
      </SwipeableViews>
    </MotionDivOnMount>
  )
}

export default function ServicesSection(props) {
  const { refForScroll } = props

  const { lang } = useContext(AppContext)

  /********* StaticProps cached at build time **********/
  const { staticData } = useContext(HomePageContext)
  let data = staticData.services

  /********** SWR revalidation while first returning cached static data **********/
  const swr = useSWR(`services`, async () => fetchers.services(), {
    fallbackData: data, // cached data initially returned by SWR
    revalidateOnMount: true,
  })
  if (!!swr.data) data = swr.data // When user loads the page, data is updated by fallbackData (cached === static data), then updated by fetched up-to-date data

  const lg = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <>
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "60px" }} />

      <Stack
        sx={{
          zIndex: 1,
          background: (theme) =>
            `linear-gradient(${theme.palette.background.black} 50%, ${theme.palette.secondary.main} 100%)`,
        }}
      >
        <CenteredMaxWidthContainer percents={{ xs: "100%", sm: "80%" }}>
          <Stack
            className="flex-center full-width"
            margin={{ xs: "8rem 0 8rem", md: "6rem 0 12rem" }}
            gap={{ xs: 1, md: 2 }}
          >
            <Typography variant="h2" color="secondary">
              {translations.homepage.services.title[lang]}
            </Typography>
            <Stack
              className="full-width justify-center"
              gap={2}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              {lg ? (
                <Caroussel services={data} />
              ) : (
                <>
                  <ServiceCard
                    service={data[0]}
                    animationElement={<FlashingRec />}
                    href="/films"
                    orientation="left"
                    delay={0.25}
                  />
                  <ServiceCard
                    service={data[1]}
                    animationElement={<FlashingUnderscore />}
                    href="/websites"
                    orientation="right"
                    delay={0.5}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </CenteredMaxWidthContainer>
      </Stack>
    </>
  )
}
