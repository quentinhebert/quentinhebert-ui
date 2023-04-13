import { Slide, Stack, Typography, Divider } from "@mui/material"
import BouncingArrow from "../../Navigation/BouncingArrow"
import { useContext } from "react"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import AddIcon from "@mui/icons-material/Add"
import { Parallax } from "react-scroll-parallax"
import { AppContext } from "../../../contexts/AppContext"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import NextLink from "../../Helpers/next-link"
import { scrollTo } from "../../../services/utils"
import {
  absoluteFullScreen,
  background,
  heroScreen,
  ignoreNavbar,
} from "../../../styles/helper"
import translations from "../../../services/translation"

export default function HeroSection(props) {
  const { refForScroll } = props

  const { appLoading, lang } = useContext(AppContext)

  return (
    <Root>
      <Background />

      <Stack component="h1">
        <Slide direction="right" {...{ timeout: 500 }} in={!appLoading}>
          <div>
            <JobTitle label={translations.homepage.hero.activity1[lang]} />
          </div>
        </Slide>

        <PlusIcon />

        <Slide direction="left" {...{ timeout: 500 }} in={!appLoading}>
          <Stack sx={{ marginTop: { xs: "1.5rem", lg: "1.5vw" } }}>
            <JobTitle label={translations.homepage.hero.activity2[lang]} />
          </Stack>
        </Slide>
      </Stack>

      <Identity label="Quentin Hébert" />

      <CTAIsland>
        <CTAButton
          label={translations.homepage.hero.btn1[lang]}
          href="/films"
          delay={0.75}
        />
        <CustomDivider />
        <CTAButton
          label={translations.homepage.hero.btn2[lang]}
          href="/websites"
          delay={1}
        />
      </CTAIsland>

      <Stack marginTop={4}>
        <BouncingArrow scrollTo={scrollTo} refForScroll={refForScroll} />
      </Stack>
    </Root>
  )
}

function Root(props) {
  return (
    <Stack
      className="relative flex-center no-overflow"
      bgcolor="background.black"
      gap="1rem"
      sx={{
        ...ignoreNavbar,
        ...heroScreen,
        minHeight: { xs: "600px", md: "800px" },
        zIndex: 1,
      }}
      {...props}
    />
  )
}
function CTAButton({ label, href, delay }) {
  return (
    <Stack width="50%" textAlign="center">
      <NextLink href={href}>
        <MotionDivOnMount
          preventOut
          hidden={{ opacity: 0, y: -5 }}
          visible={{ opacity: 1, y: 0 }}
          delay={delay}
        >
          <Typography
            color="secondary"
            className="flex-center pointer"
            display="flex"
            fontFamily="Trophy"
            gap={1}
            sx={{
              padding: "0 1rem",
              fontSize: { xs: ".6rem", sm: ".8rem", md: "1.5rem" },
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
}
function CTAIsland({ ...props }) {
  return (
    <MotionDivOnMount
      preventOut
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
}
function JobTitle({ label }) {
  return (
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
}
function Identity({ label }) {
  return (
    <Stack textAlign="center">
      <MotionDivOnMount
        preventOut
        hidden={{ opacity: 0, y: -5 }}
        visible={{ opacity: 1, y: 0 }}
      >
        <Typography
          textTransform="uppercase"
          color="text.white"
          fontFamily="Kardust"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            textShadow: (theme) =>
              `0px 0px 40px ${theme.palette.secondary.main}`,
          }}
        >
          {label}
        </Typography>
      </MotionDivOnMount>
    </Stack>
  )
}
function PlusIcon() {
  return (
    <MotionDivOnMount
      preventOut
      hidden={{ opacity: 0, rotate: "0deg" }}
      visible={{
        opacity: 1,
        rotate: "360deg",
        transition: { duration: 1 },
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
  )
}
function Background() {
  return (
    <Parallax
      easing="easeInQuad"
      translateY={[0, 40]}
      scale={[1, 1.2]}
      style={{
        zIndex: -1,
        ...absoluteFullScreen,
      }}
    >
      <Stack
        sx={{
          ...background("/medias/film_grain.jpg"),
          ...heroScreen,
        }}
      />
    </Parallax>
  )
}
function CustomDivider() {
  return (
    <Divider
      orientation="vertical"
      sx={{
        borderColor: "rgb(256,256,256,0.3)",
        borderWidth: "1px",
        height: "auto",
      }}
    />
  )
}
