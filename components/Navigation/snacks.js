import { Portal } from "@mui/material"
import Alert from "@mui/material/Alert"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import React, { useEffect, useState } from "react"

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

function Snacks(props) {
  const { severity, message, setMessage } = props

  const [openSnackBar, setOpenSnackBar] = useState(false)

  useEffect(() => {
    if (message !== "") setOpenSnackBar(true)
  }, [message])

  const handleClose = () => {
    setOpenSnackBar(false)
    setTimeout(() => {
      setMessage("")
    }, 500)
  }

  return (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackBar}
        autoHideDuration={5000}
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
