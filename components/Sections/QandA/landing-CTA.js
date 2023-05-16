import { Box, Stack, Typography } from "@mui/material"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-parallax"
import PillButton from "../../Buttons/pill-button"
import EastIcon from "@mui/icons-material/East"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

export default function QandALandingCTA({ link, text, ...props }) {
  //   const bgImg = "/medias/film_grain.jpg"
  const bgImg = "/medias/test.jpg"

  const { lang } = useContext(AppContext)

  return (
    <Stack position="relative" zIndex={0}>
      <Parallax
        bgImage={bgImg}
        bgImageAlt="Portrait en noir et blanc de Quentin."
        strength={200}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1000px",
          padding: 0,
          margin: 0,
        }}
      />

      <Stack
        zIndex={1}
        gap={4}
        padding="6rem 0"
        sx={{
          background: (theme) =>
            `linear-gradient(140deg, rgb(0,0,0,0.8) 0%, rgb(0,0,0,0.2) 50%, rgb(0,0,0,0.8) 100%)`,
        }}
      >
        <Typography variant="h2" color="secondary" textAlign="center">
          {translations.QandA.landing.title[lang]}
        </Typography>
        <BodyText textAlign="center">
          {translations.QandA.landing.text[lang]}
        </BodyText>
        <Box width="250px" margin="auto">
          <PillButton
            endIcon={<EastIcon />}
            href="/questions-and-answers"
            sx={{
              "&& .MuiSvgIcon-root": {
                transition: ".3s ease",
              },
              "&:hover": {
                "&& .MuiSvgIcon-root": {
                  translate: ".5rem",
                },
              },
            }}
          >
            {translations.QandA.landing.btn[lang]}
          </PillButton>
        </Box>
      </Stack>
    </Stack>
  )
}
