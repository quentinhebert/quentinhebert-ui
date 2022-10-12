import { useEffect, useState } from "react"
import { Box, Button, Slide, Stack } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import theme from "../../../config/theme"
import BigTitle from "../../ReusableComponents/titles/big-title"
import BodyText from "../../ReusableComponents/text/body-text"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function FilmsExperiencePart(props) {
  const {} = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const [show, setShow] = useState(false)
  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 0.3 },
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

  return (
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        background: (theme) =>
          `url(/medias/exp-film-bg.svg), linear-gradient(220deg, ${theme.palette.background.main} 30%, rgb(0,0,0,0.5) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        height: { xs: "550px", sm: "700px", md: "800px" },
      }}
      ref={ref}
    >
      <motion.div initial="hidden" variants={variants} animate={controls}>
        <Stack width="100%" alignItems="start">
          <Stack
            width="75%"
            alignItems="start"
            sx={{
              padding: {
                xs: "1rem",
                sm: "2rem",
                md: "2rem 4rem",
                lg: "4rem",
              },
            }}
          >
            <BigTitle
              title="Exp ."
              color={theme.palette.text.secondary}
              fontFamily="Ethereal"
            />
            <Stack
              sx={{
                width: { xs: "95%", sm: "80%", md: "80%" },
              }}
            >
              <BodyText
                fontFamily="Ethereal"
                color={(theme) => theme.palette.text.secondary}
                fontWeight="bold"
              >
                D'abord pris de passion pour la réalisation de courts-métrages,
                j'apprends rapidement à diriger une équipe de tournage amateure.
                <p />
                Je prends goût à tous les corps du métier, mais c'est dans la
                direction photographique, le cadrage et le montage que je me
                sens le plus créatif.
                <p />
                Je réalise rapidement mes premiers clips musicaux et
                événementiels.
              </BodyText>

              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.text.primary,
                    fontFamily: "Ethereal",
                    textTransform: "initial",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                    fontWeight: "bold",
                    letterSpacing: { xs: "0.5px", md: "1.5px" },
                    border: `2px solid ${theme.palette.text.primary}`,
                    marginTop: { xs: "1.5rem", md: "3rem" },
                  }}
                  startIcon={<SaveAltIcon />}
                >
                  Télécharger mon CV
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>

      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={{
          position: "absolute",
          right: 0,
          width: "50%",
          mixBlendMode: "multiply",
        }}
      >
        <Box
          sx={{
            backgroundImage: "url(/medias/prout.png)",
            backgroundSize: "cover",
            backgroundPosition: "0% 50%",
            height: { xs: "500px", sm: "700px", md: "800px" },
          }}
        />
      </motion.div>
    </Stack>
  )
}
