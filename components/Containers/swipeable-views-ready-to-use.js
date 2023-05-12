import { Stack, Typography } from "@mui/material"
import SwipeableViews from "react-swipeable-views"
import Stepper from "../Navigation/stepper"
import styles from "../../styles/TextShine.module.css"
import SwipeIcon from "@mui/icons-material/Swipe"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"

export default function SwipeableViewsReadyToUse({
  index,
  setIndex,
  handleChangeIndex,
  totalSteps,
  ...props
}) {
  const { lang } = useContext(AppContext)
  return (
    <>
      <SwipeableViews
        index={index}
        disableLazyLoading
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
        axis="x"
        style={{ paddingBottom: "2rem" }}
        springConfig={{
          duration: "1s",
          easeFunction: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          delay: "0s",
        }}
        {...props}
      />

      <Stack gap={1}>
        <Stack
          className={`flex-center row gap-10 ${styles.shine}`}
          sx={{ color: (theme) => theme.palette.text.white }}
        >
          <SwipeIcon />
          <Typography fontStyle="italic" letterSpacing={1} fontSize=".8rem">
            {translations.swipe[lang]}
          </Typography>
        </Stack>
        <Stepper totalSteps={3} activeStep={index} setActiveStep={setIndex} />
      </Stack>
    </>
  )
}
