import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import SubmitButton from "../Buttons/submit-button"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { scrollTo } from "../../services/utils"
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax"
import BodyText from "../Text/body-text"

export default function ContactCTA({
  refsForScroll,
  src,
  smallText,
  catchPhrase,
  background,
  BtnProps,
  CatchPhraseProps,
  ...props
}) {
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))

  const backgroundLayer = {
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1, 1.1, "ease"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            background: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Stack
          sx={{
            background: "url(/medias/dust.gif)",
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            mixBlendMode: "multiply",
            opacity: 0.2,
          }}
        />
      </Stack>
    ),
  }

  const headlineLayer = {
    scale: [0.6, 1, "easeOutCubic"],
    opacity: [-0.5, 1.5, "ease"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <CenteredMaxWidthContainer height="100%" className="flex-center">
        <Stack
          gap={2}
          sx={{
            padding: 2,
          }}
        >
          <Stack>
            {!!smallText && (
              <BodyText textAlign="center" fontStyle="italic">
                {smallText}
              </BodyText>
            )}
            <Typography
              variant="h3"
              color="secondary"
              textAlign="center"
              sx={
                !!CatchPhraseProps?.sx
                  ? {
                      textShadow: "0 0 30px rgb(0,0,0,0.5)",
                      ...CatchPhraseProps?.sx,
                    }
                  : {
                      textShadow: "0 0 30px rgb(0,0,0,0.5)",
                    }
              }
            >
              {catchPhrase}
            </Typography>
          </Stack>

          <Box margin="auto">
            <SubmitButton
              onClick={() => scrollTo(refsForScroll.contact)}
              backgroundColor={(theme) => theme.palette.secondary.main}
              color={(theme) => theme.palette.text.black}
              {...BtnProps}
            >
              Contactez-moi <ArrowRightAltIcon />
            </SubmitButton>
          </Box>
        </Stack>
      </CenteredMaxWidthContainer>
    ),
  }

  return (
    <ParallaxProvider>
      <Stack
        padding={{ xs: "5rem 1rem", md: "10rem 4rem" }}
        ref={refsForScroll.cta}
        sx={{
          scrollMarginTop: { xs: "80px", md: "-20px" },
          background: background || "transparent",
        }}
      >
        <ParallaxBanner
          layers={[backgroundLayer, headlineLayer]}
          style={{
            width: "100%",
            minHeight: md ? "600px" : "250px",
            borderRadius: "50px",
            transform: "translateZ(0)",
          }}
        />
      </Stack>
    </ParallaxProvider>
  )
}
