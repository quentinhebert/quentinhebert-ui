import { Box, Slide, Stack, Typography, Divider } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { useRouter } from "next/router"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import AddIcon from "@mui/icons-material/Add"

const CTAButton = ({ label, href, delay }) => (
  <Stack width="50%" textAlign="center">
    <Link href={href} passHref>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 1 }}
      >
        <Typography
          color="secondary"
          className="flex-center"
          display="flex"
          fontFamily="Trophy"
          gap={1}
          sx={{
            padding: "0 1rem",
            fontSize: { xs: ".6rem", sm: ".8rem", md: "1.5rem" },
            cursor: "pointer",
            transition: "0.3s ease-in-out",
            "& > .MuiSvgIcon-root": {
              transition: "0.3s ease-in-out",
            },
            "&:hover": {
              transform: "scale(1.1)",
              "& > .MuiSvgIcon-root": {
                transition: "0.3s ease-in-out",
                translate: { xs: "5px", md: "10px", lg: "15px" },
              },
            },
          }}
        >
          {label} <ArrowRightAltIcon />
        </Typography>
      </motion.div>
    </Link>
  </Stack>
)
const CTAIsland = ({ ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 1 }}
    style={{ margin: "2rem 0" }}
  >
    <Stack
      margin="auto"
      padding="1rem 2rem"
      sx={{
        width: { xs: "60%", sm: "50%", lg: "40%" },
        minWidth: "300px",
        background: "#000",
        flexDirection: "row",
        borderRadius: "100px",
        boxShadow: (theme) =>
          `0px 0px 30px 5px ${theme.palette.secondary.main}`,
        textShadow: (theme) => `0px 0px 20px ${theme.palette.secondary.main}`,
      }}
      {...props}
    />
  </motion.div>
)
const JobTitle = ({ label }) => (
  <Stack alignItems="center">
    <Typography
      color="secondary"
      fontFamily="POPFINE"
      sx={{
        fontSize: { xs: "18vw", md: "10vw" },
        lineHeight: { xs: "18vw", md: "10vw" },
      }}
    >
      {label}
    </Typography>
  </Stack>
)
const Identity = ({ label }) => (
  <Stack textAlign="center">
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <Typography
        textTransform="uppercase"
        color="#fff"
        fontFamily="Kardust"
        sx={{
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          textShadow: (theme) => `0px 0px 40px ${theme.palette.secondary.main}`,
        }}
      >
        {label}
      </Typography>
    </motion.div>
  </Stack>
)

const year = new Date().getFullYear()

export default function HeroSection(props) {
  const { scrollTo, refForScroll } = props

  const router = useRouter()

  /********** ANIMATION **********/
  const [animationRef, inView] = useInView()
  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView, router])

  return (
    <Stack
      ref={animationRef}
      gap="1rem"
      sx={{
        background: (theme) => theme.palette.background.secondary,
        height: "100vh",
        minHeight: "-webkit-fill-available",
        marginTop: "-82px",
        minHeight: "650px",
        background:
          "linear-gradient(#000 0%, transparent 40%, #000 100%), url(/medias/film_grain.jpg)",
        backgroundSize: "cover",
        zIndex: 1,
        overflow: "hidden",
        padding: "8rem 2.5rem 2rem",
      }}
    >
      <Stack component="h1">
        <Slide direction="right" {...{ timeout: 500 }} in>
          <div>
            <JobTitle label="Réalisateur " />
          </div>
        </Slide>

        <motion.div
          initial={{ opacity: 0, rotate: "0deg" }}
          animate={{ opacity: 1, rotate: "360deg" }}
          transition={{ duration: 1, ease: [0.32, 0, 0.67, 0] }}
          style={{ marginBottom: "2rem" }}
        >
          <Stack alignItems="center">
            <AddIcon
              sx={{ color: "#fff", fontSize: { xs: "10vw", md: "3vw" } }}
            />
          </Stack>
        </motion.div>

        <Slide direction="left" {...{ timeout: 500 }} in>
          <div>
            <JobTitle label="Développeur web" />
          </div>
        </Slide>
      </Stack>

      <Identity label="Quentin Hébert" />

      <CTAIsland>
        <CTAButton label="Vidéo" href="/films" delay={1} />
        <Divider
          orientation="vertical"
          sx={{
            borderColor: "rgb(256,256,256,0.3)",
            borderWidth: "1px",
            height: "auto",
          }}
        />
        <CTAButton label="Web" href="/websites" delay={1.5} />
      </CTAIsland>

      <BouncingArrow scrollTo={scrollTo} refForScroll={refForScroll} />
    </Stack>
  )
}
