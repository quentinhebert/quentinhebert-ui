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
      fontSize: { xs: "1rem", md: "1.75rem" },
      margin: { md: "0 .1rem", md: "0 .25rem" },
      fontWeight: "bold",
      textTransform: "uppercase",
      textShadow: "rgb(0,0,0,0.3) 2px 2px 10px",
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
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
    hidden: { opacity: 0 },
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
        <Stack
          width="100%"
          alignItems="end"
          sx={{ padding: { xs: "2rem", md: "4rem" } }}
        >
          <motion.div
            initial="hidden"
            variants={variants}
            animate={controls}
            style={{
              width: md ? "60%" : "70%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <Typography
              fontFamily="Ethereal"
              fontWeight="bold"
              textAlign="center"
              sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#000" }}
            >
              Focus
            </Typography>

            <BodyText textAlign="center" color="#000" fontWeight="bold">
              <Keyword text="Passionné" /> depuis {expNbYears} années, j'ai fait
              de la vidéo mon métier car c'est grâce au son et à l'image que je
              parviens à m'exprimer avec le plus de <Keyword text="sincérité" />
              .
              <p />
              J'ai appris en <Keyword text="autodidacte" />, poussé par l'envie
              de créer.
            </BodyText>

            <Box sx={{ textAlign: "center" }}>
              <PillButton onClick={(e) => scrollTo(refsForScroll.portfolio)}>
                Voir mes réalisations
              </PillButton>
            </Box>
          </motion.div>
        </Stack>

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
