import { Slide, Stack, Typography, Divider } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"
import { useContext } from "react"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import AddIcon from "@mui/icons-material/Add"
import { Parallax } from "react-scroll-parallax"
import { AppContext } from "../../../contexts/AppContext"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import NextLink from "../../Helpers/next-link"

const CTAButton = ({ label, href, delay }) => (
  <Stack width="50%" textAlign="center">
    <NextLink href={href}>
      <MotionDivOnMount
        hidden={{ opacity: 0, y: -5 }}
        visible={{ opacity: 1, y: 0 }}
        delay={delay}
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
      </MotionDivOnMount>
    </NextLink>
  </Stack>
)
const CTAIsland = ({ ...props }) => (
  <MotionDivOnMount
    hidden={{ opacity: 0, y: -5 }}
    visible={{ opacity: 1, y: 0 }}
    delay={0.5}
    style={{ margin: "2rem 0", display: "flex", width: "100%" }}
  >
    <Stack
      margin="auto"
      padding="1rem 2rem"
      sx={{
        width: { xs: "70%", sm: "60%", lg: "50%" },
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
  </MotionDivOnMount>
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
    <MotionDivOnMount
      hidden={{ opacity: 0, y: -5 }}
      visible={{ opacity: 1, y: 0 }}
      delay={0.5}
    >
      <Typography
        textTransform="uppercase"
        color="text.white"
        fontFamily="Kardust"
        sx={{
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          textShadow: (theme) => `0px 0px 40px ${theme.palette.secondary.main}`,
        }}
      >
        {label}
      </Typography>
    </MotionDivOnMount>
  </Stack>
)

export default function HeroSection(props) {
  const { scrollTo, refForScroll } = props

  const { appLoading } = useContext(AppContext)

  return (
    <Stack
      bgcolor="background.black"
      gap="1rem"
      sx={{
        height: "100vh",
        minHeight: "-webkit-fill-available",
        marginTop: "-82px",
        minHeight: { xs: "600px", md: "800px" },
        backgroundSize: "cover",
        zIndex: 1,
        overflow: "hidden",
        padding: "8rem 2.5rem 2rem",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Parallax
        easing="easeInQuad"
        translateY={[0, 40]}
        scale={[1, 1.2]}
        style={{
          zIndex: -1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            height: "100vh",
            width: "100%",
            background: (theme) =>
              `linear-gradient(${theme.palette.background.black} 0%, transparent 40%, ${theme.palette.background.black} 80%), url(/medias/film_grain.jpg)`,
            backgroundSize: "cover",
          }}
        />
      </Parallax>

      <Stack component="h1">
        <Slide direction="right" {...{ timeout: 500 }} in={!appLoading}>
          <div>
            <JobTitle label="Réalisateur " />
          </div>
        </Slide>

        <MotionDivOnMount
          hidden={{ opacity: 0, rotate: "0deg" }}
          visible={{
            opacity: 1,
            rotate: "360deg",
          }}
        >
          <Stack alignItems="center">
            <AddIcon
              titleAccess="& "
              sx={{
                color: (theme) => theme.palette.text.white,
                fontSize: { xs: "10vw", md: "5vw", lg: "3vw" },
              }}
            />
          </Stack>
        </MotionDivOnMount>

        <Slide direction="left" {...{ timeout: 500 }} in={!appLoading}>
          <Stack sx={{ marginTop: { xs: "1.5rem", lg: "1.5vw" } }}>
            <JobTitle label="Développeur web" />
          </Stack>
        </Slide>
      </Stack>

      <Identity label="Quentin Hébert" />

      <CTAIsland>
        <CTAButton label="Vidéo" href="/films" delay={0.75} />
        <Divider
          orientation="vertical"
          sx={{
            borderColor: "rgb(256,256,256,0.3)",
            borderWidth: "1px",
            height: "auto",
          }}
        />
        <CTAButton label="Web" href="/websites" delay={1} />
      </CTAIsland>

      <Stack marginTop={4}>
        <BouncingArrow scrollTo={scrollTo} refForScroll={refForScroll} />
      </Stack>
    </Stack>
  )
}
