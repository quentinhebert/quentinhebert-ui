import { Box, Slide, Stack, Typography, Divider } from "@mui/material"
import BouncingArrow from "../../../Navigation/BouncingArrow"
import StrokeText from "../../../Text/stroke-text"
import styles from "../../../../styles/TextShine.module.css"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import MotionDivOnMount from "../../../Animation/motion-div-on-mount"
import { useContext } from "react"
import { AppContext } from "../../../../contexts/AppContext"
import Span from "../../../Text/span"
import translations from "../../../../services/translation"
import AnimatedScrollDownBtn from "../../../Animation/animated-scroll-down-btn"
import Image from "next/image"

export default function HeroSection(props) {
  const { refsForScroll } = props

  const { appLoading, lang } = useContext(AppContext)

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Stack
      zIndex={1}
      sx={{
        position: "relative",
        marginTop: "-82px",
        background: (theme) =>
          `linear-gradient(170deg, ${theme.palette.secondary.main} 0%, ${theme.palette.background.black} 60%)`,
        width: "100%",
        minHeight: "600px",
        height: { xs: "70vh", md: "100svh" },
        overflow: "hidden",
      }}
    >
      {/* Right Text */}
      <Slide direction="left" {...{ timeout: 1000 }} in={!appLoading}>
        <Stack
          sx={{
            alignSelf: "end",
            width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Stack padding="2rem">
            <Typography
              variant="h1"
              sx={{
                textAlign: "right",
                fontSize: {
                  xs: "18vw",
                  sm: "12vw",
                  md: "10vw",
                },
                lineHeight: {
                  xs: "18vw",
                  sm: "12vw",
                  md: "10vw",
                },
                marginRight: "-2rem",
              }}
            >
              <Span
                sx={{
                  background: (theme) =>
                    `-webkit-linear-gradient(-78deg, ${theme.palette.secondary.main}, ${theme.palette.tersary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  padding: "0 5%",
                }}
              >
                {translations.websites.hero.title[lang]}
              </Span>
              <br />
              <StrokeText className={styles.shine} padding="5%">
                {translations.websites.hero.subtitle[lang]}
              </StrokeText>
            </Typography>

            {/* CTA BUTTONS */}
            <CTAIsland>
              <CTAButton
                onClick={() => scrollTo(refsForScroll.portfolio)}
                label={translations.websites.hero.cta.btn1[lang]}
              />
              <Divider
                orientation="vertical"
                sx={{
                  borderColor: "rgb(256,256,256,0.3)",
                  borderWidth: "1px",
                  height: "auto",
                }}
              />
              <CTAButton
                delay={0.5}
                onClick={() => window.open("/medias/cv-web.pdf")}
                label={translations.websites.hero.cta.btn2[lang]}
              />
            </CTAIsland>
          </Stack>
        </Stack>
      </Slide>

      <Slide
        direction="right"
        {...(true ? { timeout: 1000 } : {})}
        in={!appLoading}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            pointerEvents: "none",
            minHeight: "600px",
            height: { xs: "calc(70% - 5vw)", sm: "calc(100svh - 5vw)" },
            zIndex: 1,
            width: {
              xs: "80%",
            },
            top: {
              xs: "18vw",
              sm: "-5vw",
              md: "5vw",
            },
            left: {
              xs: "-45vw",
              sm: "-35vw",
              md: "-25vw",
            },
          }}
        >
          <Image
            src="/medias/developper-alpha2.png"
            fill
            style={{ objectFit: "cover", objectPosition: "100% 0%" }}
          />
        </Box>
      </Slide>

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: 40,
          width: "100%",
        }}
      >
        <AnimatedScrollDownBtn
          scrollTo={scrollTo}
          refForScroll={refsForScroll.cta}
        />
      </Stack>
    </Stack>
  )
}

function CTAIsland({ ...props }) {
  return (
    <MotionDivOnMount
      hidden={{ opacity: 0, y: -5 }}
      visible={{ opacity: 1, y: 0 }}
      delay={0.5}
      style={{
        margin: "0 0 0 12%",
        maxWidth: "700px",
        width: { xs: "80%", sm: "100%" },
      }}
    >
      <Stack
        padding="1rem 2rem"
        sx={{
          width: "100%",
          background: "#000",
          flexDirection: "row",
          borderRadius: "100px",
          boxShadow: (theme) =>
            `0px 0px 30px 5px ${theme.palette.secondary.main}`,
          textShadow: (theme) => `0px 0px 20px ${theme.palette.secondary.main}`,
          marginTop: { xs: "8vh" },
        }}
        {...props}
      />
    </MotionDivOnMount>
  )
}
function CTAButton({ onClick, label, delay }) {
  return (
    <Stack width="50%" textAlign="center">
      <MotionDivOnMount
        hidden={{ opacity: 0, y: -5 }}
        visible={{ opacity: 1, y: 0 }}
        delay={delay || 0}
      >
        <Typography
          color="secondary"
          className="flex-center"
          display="flex"
          fontFamily="Trophy"
          gap={1}
          sx={{
            padding: "0 1rem",
            fontSize: { xs: ".6rem", sm: ".8rem", lg: "1.3rem" },
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
          onClick={onClick}
        >
          {label} <ArrowRightAltIcon />
        </Typography>
      </MotionDivOnMount>
    </Stack>
  )
}
