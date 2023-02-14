import { useEffect, useState } from "react"
import { Box, Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import PillButton from "../../../Buttons/pill-button"
import BodyText from "../../../Text/body-text"

const Keyword = ({ text }) => (
  <Box
    component="span"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      fontSize: { xs: "1rem", md: "1.25rem" },
      margin: { md: "0 .1rem", md: "0 .25rem" },
      fontWeight: "bold",
      textTransform: "uppercase",
      textShadow: "rgb(0,0,0,0.5) 1px 1px 15px",
    }}
  >
    {text}
  </Box>
)

export default function FocusSection(props) {
  const { refsForScroll } = props

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const [show, setShow] = useState(false)
  const variants = {
    title: {
      visible: {
        opacity: 1,
        transition: { duration: 1 },
      },
      hidden: { opacity: 0 },
    },
    text: {
      visible: {
        opacity: 1,
        transition: { duration: 1, delay: 0.75 },
      },
      hidden: { opacity: 0 },
    },
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      setShow(true)
    } else {
      controls.start("hidden")
      setShow(false)
    }
  }, [controls, inView])

  const expNbYears = new Date().getFullYear() - 2011 // J'ai réalisé mes premiers clips de musique en 5ème (collège) à l'âge de 13 ans

  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))

  return (
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        background: (theme) => theme.palette.secondary.main,
      }}
    >
      {/* Section Anchor */}
      <Stack
        ref={refsForScroll.focus}
        sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
      />

      <Stack
        ref={ref}
        justifyContent="center"
        sx={{
          background: (theme) =>
            `linear-gradient(-180deg, rgb(0,0,0,0.4) 40%, #000 100%)`,
          minHeight: { xs: "600px", sm: "550px", md: "600px" },
          height: "80vh",
          marginTop: "0.01px",
        }}
      >
        <Slide direction="left" {...{ timeout: 2000 }} in={show}>
          <Stack
            width="100%"
            alignItems="end"
            sx={{ padding: { xs: "2rem", md: "4rem" } }}
          >
            <motion.div
              initial="hidden"
              variants={variants.title}
              animate={controls}
              style={{
                width: md ? "60%" : "70%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <Typography
                variant="h2"
                textAlign="center"
                color="secondary"
                sx={{
                  fontSize: { xs: "4rem", md: "5rem" },
                  textShadow: "0px 0px 20px rgb(0,0,0,0.5)",
                }}
              >
                Focus
              </Typography>
            </motion.div>

            <motion.div
              initial="hidden"
              variants={variants.text}
              animate={controls}
              style={{
                width: md ? "60%" : "70%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <BodyText textAlign="center" color="#fff" fontWeight="bold">
                <Keyword text="Passionné" /> depuis {expNbYears} années, j'ai
                fait de la vidéo mon métier car c'est grâce au son et à l'image
                que je parviens à m'exprimer avec le plus de{" "}
                <Keyword text="sincérité" />
                .
                <p />
                J'ai appris en <Keyword text="autodidacte" />, poussé par
                l'envie de créer.
              </BodyText>

              <Box sx={{ textAlign: "center" }}>
                <PillButton onClick={(e) => scrollTo(refsForScroll.portfolio)}>
                  Voir mes réalisations
                </PillButton>
              </Box>
            </motion.div>
          </Stack>
        </Slide>

        <Slide direction="right" {...{ timeout: 2000 }} in={show}>
          <Box
            sx={{
              backgroundImage: "url(/medias/filmmaker-shadow-alpha.png)",
              backgroundImage: "url(/medias/back-profile.png)",
              backgroundSize: "cover",
              backgroundPosition: "50% 30%",
              position: "absolute",
              width: { xs: "35%", md: "50%" },
              minHeight: { xs: "600px", sm: "550px", md: "600px" },
              height: "70vh",
              mixBlendMode: "multiply",
            }}
          />
        </Slide>
      </Stack>
    </Stack>
  )
}
