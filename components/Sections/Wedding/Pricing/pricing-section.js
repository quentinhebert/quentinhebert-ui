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
                  Un format compact qui retrace les plus beaux moments du jour
                  J.
                </Typography>
                <Price>1800 €</Price>
                <Divider sx={{ my: { xs: 1, md: 2 } }} />
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(8 min)</Strong>
                </Feature>
                <Feature icon="🎥" noDivider={true}>
                  <Strong>8h de présence</Strong> le jour J *
                </Feature>
                <MoreText>
                  <MediumText>
                    Généralement de la cérémonie jusqu’au gâteau.
                  </MediumText>
                  <SmallText>
                    * Surfacturation au-delà de 8h (150€ / heure supplémentaire
                    entamée)
                  </SmallText>
                </MoreText>
                <Feature icon="🎤">
                  Enregistrement des discours <Strong>(option +250€)</Strong>
                </Feature>
                <Feature icon="🎞️">
                  Livraison des discours intégraux{" "}
                  <Strong>(option +400€)</Strong>
                </Feature>
                <Feature icon="⏱️" noDivider={true}>
                  Présence journée entière <Strong>(option +400€)</Strong>
                </Feature>
                <MoreText noDivider={true}>
                  <MediumText>
                    Des préparatifs à la soirée, pas de surfacturation.
                  </MediumText>
                </MoreText>
              </Card>

              <Card>
                <Title>Format long</Title>
                <Typography color="grey" fontStyle="italic" textAlign="center">
                  Un format gourmand, pour ceux qui aiment prendre leur temps.
                </Typography>
                <Price>2500 €</Price>
                <Divider sx={{ my: { xs: 1, md: 2 } }} />
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(15 min)</Strong>
                </Feature>
                <Feature icon="🎥" noDivider={true}>
                  <Strong>+12h de présence</Strong> le jour J *
                </Feature>
                <MoreText>
                  <MediumText>Des préparatifs à la soirée.</MediumText>
                  <SmallText>
                    * Pas de surfacturation en cas de dépassement
                  </SmallText>
                </MoreText>
                <Feature icon="🎤">
                  Enregistrement des discours <Strong>(inclus)</Strong>
                </Feature>
                <Feature icon="🎞️" noDivider>
                  Livraison des discours intégraux{" "}
                  <Strong>(option +400€)</Strong>
                </Feature>
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
      fontSize={"3rem !important"}
      alignSelf="center"
      my={2}
      {...props}
    />
  )
}
function Price({ ...props }) {
  return (
    <>
      <Typography color="secondary" variant="h4" alignSelf="center" mt={2}>
        <Box component="span" mr={1} sx={{ fontSize: "0.6rem" }}>
          À partir de
        </Box>
        <span {...props} />
      </Typography>
    </>
  )
}
function Feature({ icon, noDivider, ...props }) {
  return (
    <>
      <Stack flexDirection="row" alignItems="center">
        <Typography fontSize="2rem" mr="1rem">
          {icon}
        </Typography>
        <Typography color="#fff" fontSize="1.5rem" {...props} />
      </Stack>
      {!noDivider ? <Divider sx={{ my: { xs: 1, md: 2 } }} /> : <></>}
    </>
  )
}
function MoreText({ noDivider, ...props }) {
  return (
    <>
      <Stack pl={6} {...props} />
      {noDivider ? (
        <></>
      ) : (
        <Divider sx={{ pb: { xs: 1, md: 2 }, mb: { xs: 1, md: 2 } }} />
      )}
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
function SmallText({ ...props }) {
  return (
    <Typography
      mt={4}
      sx={{
        fontSize: "0.7rem",
        fontWeight: "light",
        color: "grey",
        fontStyle: "italic",
        textAlign: "justify",
      }}
      {...props}
    />
  )
}
function MediumText({ ...props }) {
  return (
    <Typography
      sx={{
        fontSize: "1rem",
        color: "#fff",
      }}
      {...props}
    />
  )
}
