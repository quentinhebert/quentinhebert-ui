import { Box, Slide, Stack, Typography } from "@mui/material"
import PillButton from "../../../Buttons/pill-button"
import BouncingArrow from "../../../Navigation/BouncingArrow"
import StrokeText from "../../../Text/stroke-text"
import styles from "../../../../styles/TextShine.module.css"

export default function HeroSection(props) {
  const { refsForScroll } = props

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Stack
      zIndex={1}
      position="relative"
      sx={{
        background: (theme) =>
          `linear-gradient(220deg, #000 40%, ${theme.palette.background.main} 100%)`,
        width: "100%",
        minHeight: { xs: "500px", md: "600px" },
        height: { xs: "calc(70vh - 80px)", md: "calc(100vh - 80px)" },
        alignItems: "end",
        position: "relative",
      }}
    >
      {/* Right Text */}
      <Slide direction="left" {...{ timeout: 1000 }} in>
        <Stack
          sx={{
            position: "relative",
            zIndex: 0,
            padding: {
              xs: "7rem 1.5rem 0 1rem",
              sm: "7rem 1.5rem 0 1rem",
              md: "7rem 1.5rem 0 5rem",
            },
          }}
        >
          <Typography
            variant="h1"
            color="secondary"
            fontFamily="Zacbel X"
            sx={{
              textAlign: "right",
              fontSize: {
                xs: "13vw",
                sm: "11vw",
              },
              lineHeight: {
                xs: "13vw",
                sm: "11vw",
              },
            }}
          >
            Developpeur
            <br />
            <StrokeText className={styles.shine}>Freelance</StrokeText>
          </Typography>

          <Stack
            justifyContent="right"
            sx={{
              fontFamily: "Helmet",
              position: "relative",
              width: "100%",
              gap: { xs: 1, md: 2 },
              flexDirection: "row",
              marginTop: "3rem",
            }}
          >
            <PillButton
              animDelay={0.2}
              background="transparent"
              boxShadow="!important"
              scaleUpOnHover
              color={(theme) => theme.palette.secondary.main}
              border={(theme) => `3px solid ${theme.palette.secondary.main}`}
              fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.25vw" }}
              padding={{ xs: "0.2rem 1.5rem", md: "0.5vw 2vw" }}
              borderRadius="30vw"
              onClick={() => scrollTo(refsForScroll.portfolio)}
            >
              Mes projets
            </PillButton>
            <PillButton
              animDelay={0.5}
              boxShadow="!important"
              scaleUpOnHover
              border={(theme) => `3px solid ${theme.palette.secondary.main}`}
              fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.25vw" }}
              padding={{ xs: "0.2rem 1.5rem", md: "0.5vw 2vw" }}
              borderRadius="30vw"
              onClick={() => scrollTo(refsForScroll.portfolio)}
            >
              Mon Cv
            </PillButton>
          </Stack>
        </Stack>
      </Slide>

      <Slide
        direction="right"
        {...(true ? { timeout: 1000 } : {})}
        in
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            backgroundImage: "url(/medias/developper-alpha.png)",
            backgroundSize: {
              xs: "200%",
              sm: "200%",
              md: "170%",
              lg: "150%",
              xl: "120%",
            },
            backgroundPosition: {
              xs: "30% 10rem",
              sm: "50% -10vw",
              md: "50% 20%",
              lg: "30% 30%",
              xl: "30% 10%",
            },
            backgroundRepeat: "no-repeat",
            width: "100%",
            minHeight: { xs: "500px", md: "600px" },
            height: { xs: "calc(70vh - 80px)", md: "calc(100vh - 80px)" },
            zIndex: 1,
          }}
        />
      </Slide>

      <Box
        width="100%"
        height="100%"
        sx={{
          zIndex: 11,
        }}
      ></Box>

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        sx={{
          width: "100%",
          minHeight: { xs: "500px", md: "600px" },
          height: { xs: "100vh", md: "100vh" },
        }}
      >
        <BouncingArrow
          text=""
          scrollTo={scrollTo}
          refForScroll={refsForScroll.whyADev}
        />
      </Stack>
    </Stack>
  )
}
