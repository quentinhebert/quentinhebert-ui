import { forwardRef } from "react"
import Dialog from "@mui/material/Dialog"
import { Slide, Stack } from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomModal(props) {
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        backgroundColor: "rgb(0,0,0, 0.8)",
        "& .MuiDialog-paper": {
          background: "none",
          borderRadius: "20px",
        },
      }}
    >
      <Stack
        sx={{
          minWidth: "200px",
          minHeight: "100px",
          padding: 4,
          background: (theme) =>
            `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
        }}
        {...props}
      />
    </Dialog>
  )
}
