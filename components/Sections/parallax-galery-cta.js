import { Box, Stack, Typography } from "@mui/material"
import { absoluteFullScreen, flexCenter } from "../../styles/helper"
import ParallaxGallery from "../Images/parallax-gallery"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import SubmitButton from "../Buttons/submit-button"
import { scrollTo } from "../../services/utils"

export default function ParallaxGaleryCTA({ refForScroll, topRef, ...props }) {
  return (
    <Stack className="relative" ref={topRef}>
      <Stack
        sx={{
          width: "100%",
          height: "100px",
          background: (theme) => theme.palette.background.black,
          zIndex: "1",
        }}
      />
      <ParallaxGallery />
      <Stack
        sx={{
          width: "100%",
          height: "100px",
          background: (theme) => theme.palette.background.black,
          zIndex: "1",
        }}
      />

      <Stack
        sx={{
          ...absoluteFullScreen,
          ...flexCenter,
        }}
      >
        <Stack
          sx={{
            background:
              "linear-gradient(90deg, transparent 0%, rgb(0,0,0,0.6) 30%, rgb(0,0,0,0.6) 70%, transparent 100%)",
            height: "100%",
            ...flexCenter,
            paddingX: { xs: "10vw", md: "20vw" },
          }}
        >
          <Stack zIndex={2}>
            <Typography
              variant="h3"
              color="secondary"
              textAlign="center"
              zIndex={1}
              sx={{
                textShadow: "0 0 40px rgb(0,0,0,0.8)",
              }}
            >
              Ensemble, donnons vie à vos projets.
            </Typography>
            <Box margin="auto">
              <SubmitButton
                onClick={() => scrollTo(refForScroll)}
                backgroundColor={(theme) => theme.palette.secondary.main}
                color={(theme) => theme.palette.text.black}
              >
                Contactez-moi <ArrowRightAltIcon />
              </SubmitButton>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
