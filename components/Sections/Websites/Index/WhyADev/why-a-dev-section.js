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
        position: "absolute",
        top: "50%",
        translate: "0 -25%",
        right: right ? "2rem" : "",
        left: left ? "2rem" : "",
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
        transition: ".4s ease-in-out",
        "& .MuiSvgIcon-root": {
          transition: ".2s ease-in-out",
        },
        "&:hover": {
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
        {WhySteps.map((step, key) => (
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
              sx={{ width: { xs: "80%", lg: "90%" } }}
            >
              {step}
            </Stack>
          </motion.div>
        ))}
      </SwipeableViews>

      <Stepper
        totalSteps={WhySteps.length}
        activeStep={index}
        setActiveStep={setIndex}
      />

      <ArrowBtn left onClick={handlePrevious} index={index} steps={WhySteps} />
      <ArrowBtn right onClick={handleNext} index={index} steps={WhySteps} />
    </Stack>
  )
}

const BrowserNav = () => (
  <Stack
    sx={{
      padding: 2,
      background: (theme) => theme.palette.background.main,
    }}
  >
    <Stack flexDirection="row" gap={1}>
      <Box
        width="20px"
        height="20px"
        bgcolor="red"
        sx={{ borderRadius: "100%" }}
      />
      <Box
        width="20px"
        height="20px"
        bgcolor="orange"
        sx={{ borderRadius: "100%" }}
      />
      <Box
        width="20px"
        height="20px"
        bgcolor="green"
        sx={{ borderRadius: "100%" }}
      />
    </Stack>
  </Stack>
)

export default function WhyADevSection(props) {
  const { topRef } = props

  return (
    <Stack
      justifyContent="center"
      ref={topRef}
      position="relative"
      sx={{ scrollMarginTop: -1 }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          background: (theme) =>
            `linear-gradient(${theme.palette.secondary.main} 0%, #000 70%)`,
          padding: {
            xs: "1rem",
            sm: "2rem",
            md: "4rem",
            lg: "8rem",
            xl: "10rem",
          },
        }}
      >
        <Stack
          sx={{
            height: "100%",
            borderRadius: "1rem",
            overflow: "hidden",
            background: (theme) => theme.palette.background.main,
          }}
        >
          <BrowserNav />

          <Stack
            sx={{
              padding: "2rem 0",
              background:
                "linear-gradient( rgb(0,0,0,0.9) 0%, rgb(0,0,0,0.7) 100%)",
            }}
          >
            <Caroussel />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
