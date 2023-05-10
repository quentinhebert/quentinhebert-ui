import {
  Box,
  CircularProgress,
  Dialog,
  Slide,
  Stack,
  Typography,
} from "@mui/material"
import { forwardRef, useContext, useEffect, useRef, useState } from "react"
import PillButton from "../Buttons/pill-button"
import BrowserLayout from "../Layouts/BrowserLayout"
import BodyText from "../Text/body-text"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function BrowserUiModal({ open, handleClose, src, title }) {
  const { lang } = useContext(AppContext)
  let formattedSrc = ""
  if (!src) return <></>
  if (src.startsWith("https://")) formattedSrc = src
  else formattedSrc = "https://" + src

  function customHandleClose() {
    setAnimPosition(0)
    handleClose()
  }

  const onBtnClicks = {
    red: () => customHandleClose(),
  }

  const labels = ["Décollage iminent !"]
  let count = []
  for (let i = 5; i >= 0; i -= 1) count.push(i)
  const [loadError, setLoadError] = useState(true)
  const [showLoading, setShowLoading] = useState(true)
  const [countdown, setCountdown] = useState(count[0])
  const [showMsg, setShowMsg] = useState(false)
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false)
  const [catchphrase, setCatchphrase] = useState("Décollage imminent")
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const [animPosition, setAnimPosition] = useState(null)
  const ref = useRef()

  async function chkFrame() {
    if (ref.current?.contentWindow?.length < 1) {
      setShowMsg(true)
      LaunchCountdown()
      return setTimeout(() => {
        window.open(formattedSrc, "_blank")?.focus()
      }, 6000)
    } else {
      setShowWelcomeMsg(true)
    }
    setShowLoading(false)
    setLoadError(false)
  }

  async function LaunchCountdown() {
    let i = 0
    const timer = setInterval(() => {
      if (countdown > 0) setCountdown(count[i])
      else clearInterval(timer)
      i += 1
    }, 1000)
  }

  useEffect(() => {
    if (countdown === 1) setAnimPosition(-40)

    if (countdown === 0) {
      setCatchphrase(
        translations.websites.portfolio.browserInBrowser.title[lang]
      )
      setShowCloseBtn(true)
    }
  }, [countdown])

  useEffect(() => {
    if (showWelcomeMsg) setTimeout(() => setShowWelcomeMsg(false), 1000)
  }, [showWelcomeMsg])

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: "rgb(0,0,0, 0.7)",
        "& .MuiDialog-paper": {
          backdropFilter: "blur(.2rem)",
          background: "none",
          borderRadius: "20px",
        },
      }}
    >
      <BrowserLayout title={title} height="100%" onBtnClicks={onBtnClicks}>
        <iframe
          loading="lazy"
          ref={ref}
          src={formattedSrc}
          onLoad={chkFrame}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            opacity: loadError ? 0 : 1,
            transition: "4s 1s ease", // duration delay mode
          }}
        />
        <Stack
          width="100%"
          height="100%"
          className="flex-center"
          zIndex={1}
          sx={{
            pointerEvents: "none",
            display: loadError ? "none" : "flex",
            opacity: showWelcomeMsg ? 1 : 0,
            transition: "opacity .4s ease",
          }}
        >
          <Typography variant="h3" color="secondary">
            {
              translations.websites.portfolio.browserInBrowser.startMessage[
                lang
              ]
            }
          </Typography>
        </Stack>

        {showLoading && !showMsg && (
          <Stack
            className="full-width flex-center"
            gap={4}
            padding="1rem 2rem"
            margin="auto"
          >
            <CircularProgress color="secondary" />
            <BodyText preventTransition>
              {translations.websites.portfolio.browserInBrowser.loading[lang]}
            </BodyText>
          </Stack>
        )}

        {showMsg && (
          <Stack
            className="full-width full-height"
            alignItems="center"
            gap={4}
            padding="3rem 2rem 1rem"
          >
            <Box
              sx={{
                position: "relative",
                height: "100px",
                width: "100px",
              }}
            >
              <Box
                component="img"
                src="/medias/rocket.png"
                width="70%"
                height="70%"
                sx={{
                  rotate: "-45deg",
                  position: "absolute",
                  top: `${animPosition || 3}vw`,
                  left: "15%",
                  transition: "2s",
                }}
              />
            </Box>

            <Typography variant="h3" color={(theme) => theme.palette.text.grey}>
              {catchphrase} !{" "}
              {countdown > 0 && (
                <Box
                  component="span"
                  mr={2}
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {countdown}...
                </Box>
              )}
            </Typography>

            <Stack width={{ xs: "100%", lg: "50%" }}>
              <BodyText textAlign="center">
                {
                  translations.websites.portfolio.browserInBrowser.errorMessage[
                    lang
                  ]
                }
              </BodyText>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={2}>
              {showCloseBtn && (
                <PillButton
                  fontFamily="trophy"
                  textTransform="initial"
                  onClick={customHandleClose}
                >
                  {translations.close[lang]}
                </PillButton>
              )}
            </Stack>
          </Stack>
        )}
      </BrowserLayout>
    </Dialog>
  )
}
