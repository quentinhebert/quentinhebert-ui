import { Box, Dialog, Slide, Stack, Typography } from "@mui/material"
import { set } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/router"
import { forwardRef, useRef, useState } from "react"
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

  const onBtnClicks = {
    red: () => handleClose(),
  }

  const router = useRouter()
  const count = ["3...", "2...", "1...", "BON VOL !"]
  const [loadError, setLoadError] = useState(true)
  const [countdown, setCountdown] = useState(count[0])
  const [showMsg, setShowMsg] = useState(false)
  const ref = useRef()
  const chkFrame = async () => {
    if (ref.current?.contentWindow?.length < 1) {
      setShowMsg(true)
      LaunchCountdown()
      return setTimeout(() => {
        window.open(formattedSrc, "_blank").focus()
        // handleClose()
      }, 5000)
    }
    setLoadError(false)
  }

  async function LaunchCountdown() {
    let i = 0
    setInterval(() => {
      setCountdown(count[i])
      i += 1
    }, 1000)
  }

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: "rgb(0,0,0, 0.6)",
        "& .MuiDialog-paper": {
          background: "none",
          borderRadius: "20px",
        },
      }}
    >
      <BrowserLayout title={title} height="100%" onBtnClicks={onBtnClicks}>
        {showMsg && (
          <Stack
            className="flex-center full-width full-height"
            gap={4}
            padding={4}
          >
            <Typography variant="h3">
              Décollage imminent ! {countdown}
            </Typography>
            <Stack width={{ xs: "100%", lg: "50%" }}>
              <BodyText textAlign="center">
                Ce site ne peut maheureusement pas s'afficher dans le navigateur
                virtuel. Un nouvel onglet va s'ouvrir... Prêt au décollage ?
              </BodyText>
            </Stack>
            <Box component="img" src="/medias/rocket.png" />
          </Stack>
        )}
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
      </BrowserLayout>
    </Dialog>
  )
}
