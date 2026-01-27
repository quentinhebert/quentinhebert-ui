import React, { useContext, useEffect } from "react"
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
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
              flexDirection={{ xs: "column", lg: "row" }}
              width="100%"
              gap="2rem"
            >
              <Card>
                <Title>Le Grand Jour</Title>
                <Typography
                  color="grey"
                  fontStyle="italic"
                  textAlign="center"
                  minHeight={50}
                >
                  « Un voyage émotionnel à travers les plus beaux instants de
                  votre mariage. »
                </Typography>
                <Divider sx={{ my: { xs: 1, md: 2 } }} />
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(8 min)</Strong>
                </Feature>
                <Feature icon="🎥" noDivider>
                  <Strong>8h de présence</Strong> le jour J
                </Feature>
                <MoreText>
                  Généralement de la cérémonie jusqu’au gâteau. Surfacturation
                  au-delà de 8h (150€ / heure supplémentaire entamée).
                </MoreText>
                <Feature icon="🎤">Enregistrement des discours</Feature>
                <Feature icon="🎥" noDivider invisible>
                  <Strong>Séance couple - A Love Story</Strong>
                </Feature>
                <MoreText noDivider invisible>
                  Une journée de tournage supplémentaire, avant ou après votre
                  grand jour dans des décors poétiques, pour créer des séquences
                  dignes du cinéma.
                </MoreText>
                <Divider sx={{ margin: "4rem 0 1rem 0" }}>
                  <Typography color="secondary">OPTIONS</Typography>
                </Divider>
                <Feature icon="🎞️" noDivider option="+400€">
                  Livraison des discours intégraux
                </Feature>
                <Feature icon="⏱️" noDivider option="+400€">
                  Présence journée entière
                </Feature>
                <MoreText>
                  Des préparatifs à la soirée, pas de surfacturation.
                </MoreText>
                <FromPrice>1900 €</FromPrice>
              </Card>

              <Card>
                <Title>A Love Story</Title>
                <Typography
                  color="grey"
                  fontStyle="italic"
                  textAlign="center"
                  minHeight={50}
                >
                  « Une fresque romantique mêlant authenticité et cinéma. »
                </Typography>
                <Divider sx={{ my: { xs: 1, md: 2 } }} />
                <Feature icon="🍿">
                  Teaser <Strong>(2 min)</Strong>
                </Feature>
                <Feature icon="🎬">
                  Film <Strong>(12 min)</Strong>
                </Feature>
                <Feature icon="🎥" noDivider={true}>
                  <Strong>+12h de présence</Strong> le jour J
                </Feature>
                <MoreText>
                  Du début des préparatifs à la soirée. Pas de surfacturation en
                  cas de dépassement.
                </MoreText>
                <Feature icon="🎤">Enregistrement des discours</Feature>
                <Feature icon="🎥" noDivider>
                  <Strong>Séance couple</Strong> - A Love Story
                </Feature>
                <MoreText noDivider>
                  Une journée de tournage supplémentaire, avant ou après votre
                  grand jour dans des décors poétiques, pour créer des séquences
                  dignes du cinéma.
                </MoreText>
                <Divider sx={{ margin: "4rem 0 1rem 0" }}>
                  <Typography color="secondary">OPTIONS</Typography>
                </Divider>
                <Feature icon="🎞️" noDivider option="+400€">
                  Livraison des discours intégraux
                </Feature>
                <Feature icon="⏱️" noDivider option="+400€" invisible>
                  Présence journée entière
                </Feature>
                <MoreText invisible>
                  Des préparatifs à la soirée, pas de surfacturation.
                </MoreText>
                <FromPrice>3000 €</FromPrice>
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
      width={{ xs: "100%", lg: "50%" }}
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
      fontWeight="bold !important"
      letterSpacing="-0.15rem"
      {...props}
    />
  )
}
function FromPrice({ ...props }) {
  return (
    <>
      <Typography
        color="secondary"
        variant="h3"
        fontSize="4rem !important"
        alignSelf="center"
        mt={2}
      >
        <Box component="span" mr={1} sx={{ fontSize: "1.3rem" }}>
          À partir de
        </Box>
        <span {...props} />
      </Typography>
    </>
  )
}
function Feature({ icon, noDivider, option, invisible, ...props }) {
  return (
    <>
      <Grid
        container
        width="100%"
        sx={{ visibility: invisible ? "hidden" : "visible" }}
      >
        <Grid item xs={1} display="flex" alignItems="center">
          <Typography fontSize="2rem" mr="1rem">
            {icon}
          </Typography>
        </Grid>
        <Grid item xs={8} display="flex" alignItems="center" paddingLeft={2}>
          <Typography
            color="#fff"
            fontSize="1.5rem"
            lineHeight="1.7rem"
            {...props}
          />
        </Grid>
        <Grid
          item
          xs={3}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <Typography color="#fff" fontSize="1rem" fontStyle="italic">
            {!!option ? option : "Inclus"}
          </Typography>
        </Grid>
      </Grid>
      {!noDivider ? <Divider sx={{ my: { xs: 1, md: 2 } }} /> : <></>}
    </>
  )
}
function MoreText({ noDivider, invisible, ...props }) {
  return (
    <>
      <Grid
        container
        width="100%"
        sx={{ visibility: invisible ? "hidden" : "visible" }}
      >
        <Grid item xs={1} />
        <Grid item xs={8} display="flex" alignItems="center" paddingLeft={2}>
          <Typography
            color="#fff"
            fontSize="0.8rem"
            sx={{
              fontSize: "0.7rem",
              fontWeight: "light",
              color: "grey",
              fontStyle: "italic",
              textAlign: "justify",
            }}
            {...props}
          />
        </Grid>
        <Grid item xs={3} />
      </Grid>
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
