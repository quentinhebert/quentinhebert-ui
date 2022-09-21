import { Portal } from "@mui/material"
import Alert from "@mui/material/Alert"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import React from "react"

function SlideTransition(props) {
  return <Slide {...props} direction="up" />
}

function Snacks(props) {
  const { severity, openSnackBar, message, setOpenSnackBar } = props

  const handleClose = () => {
    setOpenSnackBar(false)
  }

  return (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={severity}
          sx={{
            fontWeight: "bold",
          }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  )
}

export default Snacks
