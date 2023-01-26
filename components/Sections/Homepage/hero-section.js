import { Box, Slide, Stack, Typography, Divider } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { useRouter } from "next/router"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

const CTAButton = ({ label, href }) => (
  <Stack width="50%" textAlign="center">
    <Link href={href} passHref>
      <Typography
        fontSize="1.5rem"
        color="secondary"
        className="flex-center"
        display="flex"
        gap={1}
        sx={{
          cursor: "pointer",
          transition: "0.3s ease-in-out",
          "& > .MuiSvgIcon-root": {
            transition: "0.3s ease-in-out",
          },
          "&:hover": {
            transform: "scale(1.1)",
            "& > .MuiSvgIcon-root": {
              transition: "0.3s ease-in-out",
              translate: "5px",
            },
          },
        }}
      >
        {label} <ArrowRightAltIcon />
      </Typography>
    </Link>
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
      gap="2rem"
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
      <Stack>
        <Stack alignItems="center">
          <Typography
            color="secondary"
            fontSize="10vw"
            lineHeight="10vw"
            fontFamily="Paradise Garden Personal Use"
            sx={{
              textShadow: `0px 0px 20px #000`,
            }}
          >
            Réalisateur
          </Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography color="secondary" fontSize="4vw" lineHeight="2vw">
            +
          </Typography>
        </Stack>
        {/* <Stack alignItems="center">
          <Typography
            color="#000"
            fontSize="40vw"
            lineHeight="8vw"
            sx={{
              translate: "0 -4vw",
              zIndex: -1,
              position: "absolute",
              color: "#fff",
              WebkitTextFillColor: "#000",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "rgb(255, 226, 183, 0.5)",
              textShadow: (theme) =>
                `0px 0px 20px ${theme.palette.secondary.main}`,
            }}
          >
            X
          </Typography>
        </Stack> */}
        <Stack alignItems="center">
          <Typography
            color="secondary"
            fontSize="10vw"
            lineHeight="10vw"
            fontFamily="Paradise Garden Personal Use"
            sx={{
              textShadow: `0px 0px 50px #000`,
            }}
          >
            Développeur web
          </Typography>
        </Stack>
      </Stack>

      <Stack textAlign="center" marginTop="2rem">
        <Typography
          textTransform="uppercase"
          color="secondary"
          fontSize="1.5rem"
          // letterSpacing={8}
          fontFamily="Kardust"
        >
          Quentin Hébert
        </Typography>
      </Stack>

      <Stack
        width="40%"
        minWidth="300px"
        margin="auto"
        padding="1rem 2rem"
        sx={{
          background: "#000",
          flexDirection: "row",
          borderRadius: "100px",
          boxShadow: (theme) =>
            `0px 0px 30px 5px ${theme.palette.secondary.main}`,
          textShadow: (theme) => `0px 0px 20px ${theme.palette.secondary.main}`,
        }}
      >
        <CTAButton label="Vidéo" href="/films" />
        <Divider orientation="vertical" />
        <CTAButton label="Web" href="/websites" />
      </Stack>

      <BouncingArrow scrollTo={scrollTo} refForScroll={refForScroll} />
    </Stack>
  )
}
