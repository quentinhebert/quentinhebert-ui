import { Dialog, Slide, Stack, Typography } from "@mui/material"
import Link from "next/link"
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

  const [loadError, setLoadError] = useState(false)
  const ref = useRef()
  const chkFrame = () => {
    if (ref.current?.contentWindow?.length < 1) setLoadError(true)
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
        {loadError && (
          <Stack
            className="flex-center full-width full-height"
            gap={4}
            padding={4}
          >
            <Typography variant="h3">Oops...</Typography>
            <BodyText>
              Il semblerait que ce site ne puisse pas s'afficher dans le
              navigateur virtuel. Ouvrez-le dans un nouvel onglet !
            </BodyText>
            <Link href={formattedSrc} passHref target="_blank">
              <PillButton>Afficher dans un nouvel onglet</PillButton>
            </Link>
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
            display: loadError ? "none" : "block",
          }}
        />
      </BrowserLayout>
    </Dialog>
  )
}
