import { Box, Button, Stack, Typography } from "@mui/material"
import StrokeText from "../ReusableComponents/text/stroke-text"
import VideocamIcon from "@mui/icons-material/Videocam"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import Link from "next/link"
import TitleCard from "../ReusableComponents/cards/title-card"
import theme from "../../config/theme"

export default function ServicesSection(props) {
  const { refForScroll } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75 },
        },
        hidden: { opacity: 0, y: -20 },
      }
    return {
      visible: {
        opacity: 1,
        x: 1,
        transition: { duration: 0.75, delay: key / 20 },
      },
      hidden: { opacity: 0, x: key > 1 ? 50 : 50 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <>
      <Stack ref={refForScroll} sx={{ scrollMarginTop: "65px" }} />

      <CenteredMaxWidthContainer>
        <Stack
          width="100%"
          margin="6rem 0 4rem"
          sx={{
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
          ref={ref}
        >
          <TitleCard
            stroketext="mes"
            text="services"
            leftBgColor="#000"
            rightBgColor={theme.palette.background.main}
          />

          <Stack
            sx={{
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <motion.div
              initial="hidden"
              variants={variants(1)}
              animate={controls}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  textAlign: "center",
                  background: (theme) =>
                    `linear-gradient(-50deg, ${theme.palette.background.main} 0%, rgb(0,0,0,0.5) 100%)`,
                  color: "#fff",
                  padding: "2rem",
                  borderRadius: "10px",
                  gap: 4,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <VideocamIcon sx={{ marginRight: "1rem" }} /> Vidéo
                </Typography>
                <Box textAlign="left" flexGrow={1} letterSpacing={1}>
                  <Typography>- Film de mariage</Typography>
                  <Typography>- Publicité d'entreprise</Typography>
                  <Typography>- Clip musical, Aftermovie & Teaser</Typography>
                  <Typography>- Portrait et Interview</Typography>
                  <Typography>- Court-métrage</Typography>
                </Box>
                <Link href="/films" passHref>
                  <Button variant="outlined" color="secondary">
                    Découvrir +
                  </Button>
                </Link>
              </Stack>
            </motion.div>

            <motion.div
              initial="hidden"
              variants={variants(2)}
              animate={controls}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  textAlign: "center",
                  background: (theme) =>
                    `linear-gradient(50deg, ${theme.palette.background.main} 0%, rgb(0,0,0,0.5) 100%)`,
                  color: "#fff",
                  padding: "2rem",
                  borderRadius: "10px",
                  gap: 4,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <DesktopMacOutlinedIcon sx={{ marginRight: "1rem" }} /> Web
                </Typography>
                <Box textAlign="left" flexGrow={1} letterSpacing={1}>
                  <Typography>- Site vitrine</Typography>
                  <Typography>- Landing Page</Typography>
                  <Typography>- Newsletters</Typography>
                  <Typography>- Back-Office personnalisé</Typography>
                  <Typography>- E-mails automatiques personnalisés</Typography>
                  <Typography>
                    - Base de données complexe et API sur-mesure
                  </Typography>
                </Box>
                <Link href="/websites" passHref>
                  <Button variant="outlined" color="secondary">
                    Découvrir +
                  </Button>
                </Link>
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    </>
  )
}
