import { Box, Slide, Stack, Typography } from "@mui/material"
import BodyText from "../Text/body-text"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import PillButton from "../Buttons/pill-button"
import { Fragment, useContext, useEffect, useState } from "react"
import EastIcon from "@mui/icons-material/East"
import YoutubePlayer from "../VideoPlayers/youtube-player"
import RedoIcon from "@mui/icons-material/Redo"
import styles from "../../styles/TextShine.module.css"
import MotionDivOnMount from "../Animation/motion-div-on-mount"
import { AppContext } from "../../contexts/AppContext"
import { background, ignoreNavbar } from "../../styles/helper"
import translations from "../../services/translation"

const Text = (props) => (
  <MotionDivOnMount hidden={{ x: 0, y: -20 }} visible={{ x: 0, y: 0 }}>
    <BodyText {...props} />
  </MotionDivOnMount>
)

export default function About_Main() {
  const [slide, setSlide] = useState(0)
  const [render, setRender] = useState(false)
  const handleNext = () => setSlide(slide + 1)

  const { appLoading, lang } = useContext(AppContext)

  const handleRestart = () => setSlide(0)

  useEffect(() => setRender(true), [])

  return (
    <Stack
      sx={{
        ...background("/medias/film_grain.jpg"),
        maxWidth: "100%",
        overflow: "hidden",
        ...ignoreNavbar,
      }}
    >
      <CenteredMaxWidthContainer
        percents="80%"
        pixels="1600px"
        sx={{
          gap: { xs: "8rem", lg: "2rem" },
          flexDirection: { xs: "column", lg: "row" },
          padding: { xs: "4rem 0 4rem", md: "8rem 0 4rem" },
        }}
      >
        <Slide direction="right" {...{ timeout: 500 }} in={!appLoading}>
          <Stack sx={{ width: { xs: "100%", lg: "48%" } }} gap={4}>
            <Typography
              variant="h1"
              color="secondary"
              sx={{
                fontSize: { xs: "4rem", md: "7rem" },
              }}
            >
              {translations.about.title[lang]}{" "}
              <Box component="span" fontSize="2rem" marginLeft={2}>
                {slide + 1} / {translations.about.slides[lang].length}
              </Box>
            </Typography>

            {translations.about.slides[lang].map((txt, key) => {
              if (key !== slide) return <Fragment key={key} />
              return <Text key={key}>{txt}</Text>
            })}

            <Stack className="row" alignItems="center" gap={4}>
              {slide !== 0 && (
                <Box>
                  <Typography
                    component="a"
                    className="cool-button"
                    onClick={handleRestart}
                    color="secondary"
                    sx={{ cursor: "pointer", fontSize: "1rem" }}
                  >
                    {translations.about.btn.restart[lang]}
                  </Typography>
                </Box>
              )}
              {slide !== 2 && (
                <PillButton onClick={handleNext} endIcon={<EastIcon />}>
                  {translations.about.btn.next[lang]}
                </PillButton>
              )}
            </Stack>
          </Stack>
        </Slide>

        <Slide direction="left" {...{ timeout: 500 }} in={!appLoading}>
          <Stack
            sx={{
              width: { xs: "90%", lg: "48%" },
              position: "relative",
              margin: "auto",
            }}
          >
            <Stack
              sx={{
                background: "linear-gradient(180deg, #252525 0%, #171615 100%)",
                borderRadius: "15px",
                padding: 0.25,
                width: "87%",
                alignSelf: "center",
              }}
            >
              <Stack
                sx={{
                  background: "#000",
                  borderRadius: "15px",
                  padding: ".5rem 0rem 1rem",
                }}
              >
                {render ? (
                  <YoutubePlayer
                    disableAutoplay
                    videoId={"wWpM97f-RHg"}
                    bgColor={(theme) => theme.palette.background.main}
                  />
                ) : null}
              </Stack>
            </Stack>
            <Box
              component="img"
              src="/medias/macbook-keyboard.png"
              mt={-0.5}
              ml="0.5rem"
            />
          </Stack>
        </Slide>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
