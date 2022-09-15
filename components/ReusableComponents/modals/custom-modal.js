import { forwardRef } from "react"
import Dialog from "@mui/material/Dialog"
import { Slide, Stack, useMediaQuery } from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomModal(props) {
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  return (
    <Dialog
      fullScreen={sm}
      fullWidth
      open={props.open}
      onClose={props.handleClose}
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
          margin: "auto 0",
          height: { xs: "100vh", md: "" },
          background: (theme) =>
            `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
        }}
        {...props}
      />
    </Dialog>
  )
}
