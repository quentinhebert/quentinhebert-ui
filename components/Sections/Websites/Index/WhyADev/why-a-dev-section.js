import { Stack, Typography } from "@mui/material"
import styles from "../../../../../styles/TextShine.module.css"
import SwipeableViews from "../../../../Other/SwipeableViews"
import { useContext, useEffect, useState } from "react"
import Stepper from "../../../../Navigation/stepper"
import SwipeIcon from "@mui/icons-material/Swipe"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { WebsitesHomePageContext } from "../../../../../contexts/PagesContexts"
import { fetchers } from "../../../../../services/public-fetchers"
import useSWR from "swr"
import { formatDescription, formatTitle, ParseJsx } from "./why-a-dev--style"

const Step = ({ slide }) => (
  <Stack alignItems="center" justifyContent="center">
    <ParseJsx jsx={formatTitle(slide.title)} />

    <ParseJsx jsx={formatDescription(slide.description)} />
  </Stack>
)

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

export default function WhyADevSection(props) {
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
