import { useEffect, useState } from "react"
import { Box, Button, Slide, Stack } from "@mui/material"
import BigTitle from "../../ReusableComponents/titles/big-title"
import BodyText from "../../ReusableComponents/text/body-text"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import styles from "../../../styles/TextShine.module.css"

const Keyword = ({ text }) => (
  <Box
    component="span"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      fontSize: { xs: "1.2rem", md: "1.75rem" },
      margin: "0 .25rem",
      fontWeight: "bold",
      // fontStyle: "italic",
      textTransform: "uppercase",
      background: (theme) =>
        `linear-gradient(50deg, ${theme.palette.text.secondary} 0%, ${theme.palette.text.primaryLight} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {text}
  </Box>
)

export default function FilmsFocusPart(props) {
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

  return (
    <Stack zIndex={1} position="relative">
      {/* Section Anchor */}
      <Stack ref={refsForScroll.focus} sx={{ scrollMarginTop: "65px" }} />

      <Stack
        sx={{
          background: (theme) =>
            `url(/medias/focus-film-bg.svg), linear-gradient(-50deg, ${theme.palette.background.main} 20%, transparent 60%)`,
          backgroundSize: "cover",
          backgroundPosition: "50% 10%",
          height: { xs: "500px", sm: "550px", md: "600px" },
          marginTop: "0.01px",
        }}
        ref={ref}
      >
        <motion.div initial="hidden" variants={variants} animate={controls}>
          <Stack width="100%" alignItems="end">
            <Stack
              sx={{
                padding: {
                  xs: "6rem 1rem 0",
                  sm: "4rem 1rem 0",
                  md: "4rem 1rem 2rem",
                },
                width: { xs: "65%", sm: "62%", md: "55%" },
                alignSelf: "end",
              }}
            >
              <BigTitle
                title="Focus"
                className={styles.shine}
                fontFamily="Ethereal"
                textAlign="center"
              />
              <BodyText
                // fontFamily="Ethereal"
                // fontWeight="bold"
                // textTransform="uppercase"
                textAlign="center"
                // color={(theme) => theme.palette.text.primaryLight}
                color="text.white"
                sx={{
                  marginTop: { xs: "3rem", md: 0 },
                  marginBottom: "2rem",
                }}
              >
                <Keyword text="Passionné" /> depuis {expNbYears} années, j'ai
                fait de la vidéo mon métier car c'est grâce au son et à l'image
                que je parviens à m'exprimer avec le plus de{" "}
                <Keyword text="sincérité" />.
                <p />
                J'ai appris en <Keyword text="autodidacte" />, poussé par
                l'envie de créer.
              </BodyText>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    // fontFamily: "Ethereal",
                    // fontWeight: "bold",
                    // letterSpacing: "1.5px",
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.main}`,
                  }}
                  onClick={(e) => scrollTo(refsForScroll.portfolio)}
                >
                  Voir mes réalisations
                </Button>
              </Box>
            </Stack>
          </Stack>
        </motion.div>

        <Slide direction="right" {...{ timeout: 2000 }} in={show}>
          <Box
            sx={{
              backgroundImage: "url(/medias/filmmaker-shadow-alpha.png)",
              backgroundImage: "url(/medias/back-profile.png)",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              position: "absolute",
              width: { xs: "35%", md: "50%" },
              height: { xs: "500px", sm: "550px", md: "600px" },
              mixBlendMode: "multiply",
            }}
          />
        </Slide>
      </Stack>
    </Stack>
  )
}
