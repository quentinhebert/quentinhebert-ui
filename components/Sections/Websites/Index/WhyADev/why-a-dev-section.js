import { Box, Stack } from "@mui/material"
import SwipeableViews from "../../../../Other/SwipeableViews"
import { useContext, useEffect, useState } from "react"
import Stepper from "../../../../Navigation/stepper"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { WebsitesHomePageContext } from "../../../../../contexts/PagesContexts"
import { fetchers } from "../../../../../services/public-fetchers"
import useSWR from "swr"
import { formatDescription, formatTitle, ParseJsx } from "./why-a-dev--style"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { autoPlay } from "react-swipeable-views-utils"
import BrowserLayout from "../../../../Layouts/BrowserLayout"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Step = ({ slide }) => (
  <Stack alignItems="center" justifyContent="center">
    <ParseJsx jsx={formatTitle(slide.title)} />

    <ParseJsx jsx={formatDescription(slide.description)} />
  </Stack>
)
const ArrowBtn = ({ left, right, index, steps, ...props }) => {
  const hasPrevious = !!left && index !== 0
  const hasNext = !!right && index < steps.length - 1
  return (
    <Stack
      sx={{
        display: { xs: "none", md: "flex" },
        background: "transparent",
        boxShadow: (theme) =>
          `0px 0px 30px 1px ${theme.palette.secondary.main}`,
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        cursor: "pointer",
        rotate: !!left ? "180deg" : "",
        opacity: hasPrevious || hasNext ? 1 : 0,
        pointerEvents: hasPrevious || hasNext ? "auto" : "none",
        transition: ".5s ease-in-out, box-shadow .2s",
        "& .MuiSvgIcon-root": {
          transition: ".2s ease-in-out",
        },
        "&:hover": {
          boxShadow: (theme) =>
            `0px 0px 15px 1px ${theme.palette.secondary.main}`,
          "& .MuiSvgIcon-root": {
            translate: "5px",
          },
        },
      }}
      {...props}
    >
      <ArrowRightAltIcon color="secondary" />
    </Stack>
  )
}
const Caroussel = () => {
  /********* StaticProps cached at build time **********/
  const { staticData } = useContext(WebsitesHomePageContext)
  let data = staticData.websiteSlides

  /********** SWR revalidation while first returning cached static data **********/
  const swr = useSWR(`websiteSlides`, async () => fetchers.websiteSlides(), {
    fallbackData: data, // cached data initially returned by SWR
    revalidateOnMount: true,
  })
  if (!!swr.data) data = swr.data // When user loads the page, data is updated by fallbackData (cached === static data), then updated by fetched up-to-date data

  const [index, setIndex] = useState(0)
  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  const WhySteps = []

  data.map((slide) => {
    WhySteps.push(<Step slide={slide} />)
  })

  const [ref, inView] = useInView()
  function handleNext() {
    if (index === WhySteps.length - 1) return
    return setIndex(index + 1)
  }
  function handlePrevious() {
    if (index === 0) return
    return setIndex(index - 1)
  }
  // Auto swipe to tease second slide (when element is in viewport)
  useEffect(() => {
    if (index === 0 && inView) {
      setTimeout(() => {
        setIndex(1)
      }, 10000)
    }
  }, [inView])

  return (
    <Stack ref={ref} gap={2} position="relative">
      <AutoPlaySwipeableViews
        axis="x" // horizontal
        autoplay={true} // enables autoplay
        interval={10000} // interval between slides autonext
        threshold={3} // power needed to swipe
        resistance // bounds outside on first and last elements
        disableLazyLoading // loads all slides at first render
        enableMouseEvents // enables mouse interractions with slides
        springConfig={{
          duration: "1s",
          easeFunction: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          delay: "0s",
        }}
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        {WhySteps.map((step, key) => (
          <Stack
            key={key}
            role="tabpanel"
            id={`full-width-tabpanel-${key}`}
            aria-controls={`full-width-tab-${key}`}
            value={0}
            alignItems="center"
            justifyContent="center"
            sx={{ width: { xs: "80%", lg: "90%" } }}
          >
            {step}
          </Stack>
        ))}
      </AutoPlaySwipeableViews>

      <Stack className="row" gap={8} width="100%" justifyContent="center">
        <ArrowBtn
          left
          onClick={handlePrevious}
          index={index}
          steps={WhySteps}
        />
        <Stepper
          totalSteps={WhySteps.length}
          activeStep={index}
          setActiveStep={setIndex}
        />
        <ArrowBtn right onClick={handleNext} index={index} steps={WhySteps} />
      </Stack>
    </Stack>
  )
}
const GradientBg = (props) => (
  <Stack justifyContent="center" position="relative" {...props} />
)

export default function WhyADevSection(props) {
  const { topRef } = props

  return (
    <GradientBg ref={topRef}>
      <BrowserLayout>
        <Caroussel />
      </BrowserLayout>
    </GradientBg>
  )
}
