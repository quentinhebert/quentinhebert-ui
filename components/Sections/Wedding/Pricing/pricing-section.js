import React, { useContext, useEffect } from "react"
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material"
import AnimateHeight from "react-animate-height"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthStack from "../../../Containers/centered-max-width-container"
import { AppContext } from "../../../../contexts/AppContext"
import translations from "../../../../services/translation"

export default function PricingSection(props) {
  const { refForScroll } = props

  const { lang } = useContext(AppContext)

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
    gap: "1rem",
  }

  return (
    <Stack
      zIndex={1}
      position="relative"
      ref={ref}
      sx={{
        background: (theme) => theme.palette.secondary.main,
      }}
    >
      {/* TOP Anchor */}
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "80px" }} />

      <Stack
        sx={{
          background: (theme) =>
            `linear-gradient(-180deg, rgb(0,0,0,0.4) 20%, ${theme.palette.background.black} 70%)`,
          paddingY: { xs: "2rem", md: "8rem" },
          paddingBottom: { xs: "2rem", md: "15rem" },
        }}
      >
        <CenteredMaxWidthStack pixels="1200px" percents="90%">
          <Stack width="100%" alignItems="start">
            <Stack width="100%" sx={{ padding: "2rem 1rem" }}>
              <motion.div
                initial="hidden"
                variants={variants(2)}
                animate={controls}
                style={motionDivStyle}
              >
                <Typography
                  variant="h2"
                  color="secondary"
                  sx={{
                    fontSize: { xs: "4rem", md: "5rem" },
                    lineHeight: { xs: "5rem", md: "6rem" },
                  }}
                >
                  {translations.wedding.pricing.title[lang]}
                </Typography>
              </motion.div>
            </Stack>

            <Stack
              flexDirection={{ xs: "column", md: "row" }}
              width="100%"
              gap="2rem"
            >
              <Card>
                <Title>Format court</Title>
                <Typography color="grey" fontStyle="italic" textAlign="center">
                  "Un format compact qui retrace les plus beaux moments du jour
                  J."
                </Typography>
                <Divider sx={{ my: { xs: 2, md: 4 } }} />
                <Feature icon="🎥">
                  <Strong>8h de présence</Strong> le jour J
                </Feature>
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(8 min)</Strong>
                </Feature>
                <Price>1800 €</Price>
              </Card>

              <Card>
                <Title>Format long</Title>
                <Typography color="grey" fontStyle="italic" textAlign="center">
                  "Un format gourmand, pour ceux qui aiment prendre leur temps."
                </Typography>
                <Divider sx={{ my: { xs: 2, md: 4 } }} />
                <Feature icon="🎥">
                  <Strong>+12h de présence</Strong> le jour J
                </Feature>
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(15 min)</Strong>
                </Feature>
                <Price>2500 €</Price>
              </Card>
            </Stack>
          </Stack>
        </CenteredMaxWidthStack>
      </Stack>
    </Stack>
  )
}

function Card({ ...props }) {
  return (
    <Stack
      bgcolor="black"
      width={{ xs: "100%", md: "50%" }}
      borderRadius="50px"
      padding="2rem"
      {...props}
    />
  )
}
function Title({ ...props }) {
  return (
    <Typography
      color="secondary"
      variant="h4"
      alignSelf="center"
      my={2}
      {...props}
    />
  )
}
function Price({ ...props }) {
  return (
    <>
      <Typography
        color="secondary"
        variant="h4"
        alignSelf="center"
        {...props}
      />
    </>
  )
}
function Feature({ icon, ...props }) {
  return (
    <>
      <Stack flexDirection="row" alignItems="center">
        <Typography fontSize="2rem" mr="1rem">
          {icon}
        </Typography>
        <Typography color="#fff" fontSize="1.5rem" {...props} />
      </Stack>
      <Divider sx={{ my: { xs: 2, md: 4 } }} />
    </>
  )
}
function Strong({ ...props }) {
  return (
    <Box
      component="span"
      sx={{
        fontWeight: "bold",
        color: (theme) => theme.palette.secondary.main,
      }}
      {...props}
    />
  )
}
