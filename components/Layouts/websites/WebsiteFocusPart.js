import { useEffect, useState } from "react"
import { Box, Button, Slide, Stack } from "@mui/material"
import BigTitle from "../../ReusableComponents/titles/big-title"
import BodyText from "../../ReusableComponents/text/body-text"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"

const Keyword = ({ text }) => (
  <Box
    component="span"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      fontSize: { xs: "1.2rem", md: "1.5rem" },
      fontWeight: "bold",
      fontStyle: "italic",
    }}
  >
    {text}
  </Box>
)

export default function WebsiteFocusPart(props) {
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

  const expNbYears = new Date().getFullYear() - 2019 // J'ai réalisé mes premiers clips de musique en 5ème (collège) à l'âge de 13 ans

  return (
    <Stack zIndex={1} position="relative">
      {/* Section Anchor */}
      <Stack
        ref={refsForScroll.focus}
        sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
      />

      <Stack
        sx={{
          marginTop: "0.01px",
          padding: "4rem",
          background: (theme) =>
            `linear-gradient(360deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 60%)`,
        }}
        ref={ref}
      >
        <motion.div initial="hidden" variants={variants} animate={controls}>
          <Stack width="100%" alignItems="center">
            <BigTitle
              title="Full-Stack ?"
              sx={{
                background: (theme) =>
                  `linear-gradient(${theme.palette.text.secondary} 20%, #000 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "8rem",
              }}
              fontFamily="Zacbel X"
              textAlign="center"
            />

            <CenteredMaxWidthContainer>
              <BodyText
                textAlign="center"
                color={(theme) => theme.palette.text.primaryLight}
                sx={{
                  margin: "2rem auto",
                }}
              >
                Attiré par le <Keyword text="design graphique" /> et la{" "}
                <Keyword text="logique algorithmique" />, je deviens développeur
                web à l'issue de mon diplôme d'
                <Keyword text="ingénieur informatique" />.
                <p />
                J'exerce ce métier depuis maintenant {expNbYears} ans.
                <p />
                J'aide les artistes et les entreprises à{" "}
                <Keyword text="mieux vendre" /> leurs produits et leurs services
                au travers de <Keyword text="sites qui leur ressemblent" />.
              </BodyText>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    fontWeight: "bold",
                    letterSpacing: "1.5px",
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.main}`,
                  }}
                  onClick={(e) => scrollTo(refsForScroll.portfolio)}
                >
                  Voir mes réalisations
                </Button>
              </Box>
            </CenteredMaxWidthContainer>
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  )
}
