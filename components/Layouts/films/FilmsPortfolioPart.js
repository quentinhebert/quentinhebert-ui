import React, { useEffect, useState } from "react"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import AnimateHeight from "react-animate-height"
import PortfolioImageList from "./PortfolioImageList"
import BodyText from "../../ReusableComponents/text/body-text"
import CenteredMaxWidthStack from "../../ReusableComponents/containers/centered-max-width-container"
import styles from "../../../styles/TextShine.module.css"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function FilmsPortfolioPart(props) {
  const { refForScroll } = props
  const [height, setHeight] = useState(0)

  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"))
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))

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
    flexDirection: "column",
    gap: "2rem",
  }

  return (
    <Stack
      zIndex={1}
      position="relative"
      ref={ref}
      marginTop="0.1px"
      sx={{
        background: (theme) => theme.palette.secondary.main,
      }}
    >
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />

      <Stack
        sx={{
          background: (theme) =>
            `linear-gradient(-180deg, #000 20%, rgb(0,0,0,0.4) 100%)`,
          paddingBottom: { xs: "2rem", md: "6rem" },
        }}
      >
        <CenteredMaxWidthStack pixels="1200px">
          <Stack width="100%" alignItems="start">
            <Stack
              width="100%"
              sx={{ padding: { xs: "2rem 0", md: "6rem 2rem 4rem" } }}
            >
              <motion.div
                initial="hidden"
                variants={variants(2)}
                animate={controls}
                style={motionDivStyle}
              >
                <Typography
                  color="secondary"
                  variant="h3"
                  fontFamily="Ethereal"
                  fontWeight="bold"
                >
                  Mes réalisations
                </Typography>
                <BodyText
                  color="text.white"
                  textAlign="center"
                  className={styles.shine}
                >
                  Pas de place pour le bla-bla !
                  <br />
                  Ici, nous savons exactement ce que vous venez voir. Pas lire.
                </BodyText>
              </motion.div>
            </Stack>
          </Stack>

          <AnimateHeight duration={500} height={height}>
            <PortfolioImageList setHeight={setHeight} height={height} />
          </AnimateHeight>
        </CenteredMaxWidthStack>
      </Stack>
    </Stack>
  )
}
