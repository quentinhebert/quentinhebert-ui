import { Box, Dialog, Slide, Stack, Typography } from "@mui/material"
import { forwardRef, useEffect, useRef, useState } from "react"
import PillButton from "../Buttons/pill-button"
import BrowserLayout from "../Layouts/BrowserLayout"
import BodyText from "../Text/body-text"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function BrowserUiModal({ open, handleClose, src, title }) {
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
  const [countdown, setCountdown] = useState(count[0])
  const [showMsg, setShowMsg] = useState(false)
  const [catchphrase, setCatchphrase] = useState("Décollage imminent")
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const [animPosition, setAnimPosition] = useState(null)
  const ref = useRef()

  async function chkFrame() {
    if (ref.current?.contentWindow?.length < 1) {
      setShowMsg(true)
      LaunchCountdown()
      return setTimeout(() => {
        window.open(formattedSrc, "_blank").focus()
      }, 6000)
    }
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
      setCatchphrase("Bon vol")
      setShowCloseBtn(true)
    }
  }, [countdown])

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
            transition: "3s ease-in-out",
          }}
        />

        {showMsg && (
          <Stack
            className="full-width full-height"
            alignItems="center"
            gap={4}
            padding="1rem 2rem"
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

            <Typography variant="h3">
              {catchphrase} !{" "}
              {countdown > 0 && (
                <Box
                  component="span"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {countdown}...
                </Box>
              )}
            </Typography>

            <Stack width={{ xs: "100%", lg: "50%" }}>
              <BodyText textAlign="center">
                Ce site ne peut maheureusement pas s'afficher dans le navigateur
                virtuel. Un nouvel onglet va s'ouvrir... Prêt au décollage ?
              </BodyText>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={2}>
              {showCloseBtn && (
                <PillButton
                  fontFamily="trophy"
                  textTransform="initial"
                  onClick={customHandleClose}
                >
                  Fermer
                </PillButton>
              )}
            </Stack>
          </Stack>
        )}
      </BrowserLayout>
    </Dialog>
  )
}
