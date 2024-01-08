import { Portal } from "@mui/material"
import Alert from "@mui/material/Alert"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import React, { useEffect, useState } from "react"

function getBgColor(severity) {
  switch (severity) {
    case "success":
      return "#125C27"
    case "error":
      return "#AF241C"
    case "warning":
      return "#C6900E"
    case "info":
      return "#076d9c"
    default:
      return ""
  }
}

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

function Snacks({ severity, message, setMessage }) {
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
            backgroundColor: getBgColor(severity),
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  )
}

export default Snacks
