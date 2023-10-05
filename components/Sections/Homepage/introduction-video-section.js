import { Box, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { Parallax } from "react-scroll-parallax"
import Span from "../../Text/span"
import CustomReactPlayer from "../../VideoPlayers/custom-react-player"
import styles from "../../../styles/TypeWriter.module.css"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
import apiCall from "../../../services/apiCalls/apiCall"
import { VimeoYoutubeURLparser } from "../../../services/utils"

export default function IntroductionVideoSection({ topRef, ...props }) {
  const [youtubeId, setYoutubeId] = useState(null)
  const [vimeoId, setVimeoId] = useState(null)
  const [render, setRender] = useState(false)
  useEffect(() => {
    setRender(true)
  }, [])

  const fetchData = async () => {
    const res = await apiCall.application.introductionVideo.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      const url = jsonRes.url
      const { service, id } = VimeoYoutubeURLparser(url)
      switch (service) {
        case "youtube":
          setYoutubeId(id)
          break
        case "vimeo":
          setVimeoId(id)
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const { lang } = useContext(AppContext)

  /********** ANIMATION **********/
  const { appLoading } = useContext(AppContext)
  const [animationRef, inView] = useInView()
  const [itshere, setItshere] = useState(false)
  useEffect(() => {
    if (inView && !appLoading) setItshere(true)
    else setItshere(false)
  }, [inView, appLoading])

  return (
    <Stack
      ref={topRef}
      sx={{
        scrollMarginTop: (theme) => theme.navbar.marginTop,
        margin: "10rem auto",
        width: "100%",
      }}
    >
      <Parallax scale={[0.8, 1]} opacity={[-0.5, 3]}>
        <Stack
          sx={{
            width: "100%",
            gap: "2rem",
          }}
        >
          <Typography
            variant="h2"
            color="secondary"
            textAlign="center"
            className={styles.wrapper}
            ref={animationRef}
            fontSize={{ xs: "2.5rem", sm: "3.5rem" }}
          >
            <Span className={styles.wrapper}>
              <Span className={itshere ? styles.text : "null"}>
                {translations.homepage.introVideo.title.pt1[lang]}{" "}
                <Span
                  color="#FFF"
                  sx={{
                    textShadow: (theme) =>
                      `0 0 1rem ${theme.palette.secondary.main}`,
                  }}
                >
                  {translations.homepage.introVideo.title.pt2[lang]}
                </Span>{" "}
                {translations.homepage.introVideo.title.pt3[lang]}
              </Span>
            </Span>
          </Typography>

          <Stack
            sx={{
              width: { xs: "90%", lg: "65%" },
              position: "relative",
              margin: "auto",
            }}
          >
            <Stack
              sx={{
                background: "linear-gradient(180deg, #252525 0%, #171615 100%)",
                borderRadius: { xs: "15px", md: "20px" },
                padding: 0.25,
                width: "87%",
                alignSelf: "center",
              }}
            >
              <Stack
                sx={{
                  background: "#000",
                  borderRadius: { xs: "15px", md: "20px" },
                  padding: ".5rem 0rem 1rem",
                  overflow: "hidden",
                  transform: "translateZ(0)",
                }}
              >
                {render ? (
                  <CustomReactPlayer
                    youtubeId={youtubeId}
                    vimeoId={vimeoId}
                    disableAutoplay
                    triggerPlayInView
                  />
                ) : null}
              </Stack>
            </Stack>
            <Box component="img" src="/medias/macbook-keyboard.png" mt={-0.5} />
          </Stack>
        </Stack>
      </Parallax>
    </Stack>
  )
}
