import { forwardRef } from "react"
import Dialog from "@mui/material/Dialog"
import { Slide, Stack, useMediaQuery } from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomModal({
  fullscreen,
  open,
  handleClose,
  background,
  ...props
}) {
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <Dialog
      fullScreen={fullscreen || sm}
      fullWidth
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      // keepMounted
      sx={{
        backgroundColor: "rgb(0,0,0, 0.9)",
        "& .MuiDialog-paper": {
          background: "none",
          borderRadius: "20px",
        },
      }}
    >
      <Stack
        sx={{
          padding: { xs: 2, md: 4 },
          margin: "auto 0",
          height: fullscreen ? "auto" : { xs: "100svh", md: "" },
          flexGrow: fullscreen ? 1 : null,
          background:
            background ||
            ((theme) =>
              `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`),
        }}
        {...props}
      />
    </Dialog>
  )
}
