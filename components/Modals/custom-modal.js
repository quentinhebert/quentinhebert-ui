import Dialog from "@mui/material/Dialog"
import { Slide, Stack, useMediaQuery } from "@mui/material"
import { forwardRef } from "react"

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
      keepMounted
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
          gap: 4,
          margin: "auto 0",
          // height: fullscreen ? "auto" : { xs: "100%", md: "" },
          flexGrow: fullscreen ? 1 : null,
          background: background || ((theme) => theme.palette.background.main),
        }}
        {...props}
      />
    </Dialog>
  )
}
