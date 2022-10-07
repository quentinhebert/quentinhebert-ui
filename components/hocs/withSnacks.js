import React, { useState } from "react"
import Snacks from "../Navigation/snacks"

function withSnacks(WrappedComponent) {
  function SnacksEnhancer(props) {
    const {} = props
    const [severity, setSeverity] = useState("error")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [messageSnack, setMessageSnack] = useState("")

    return (
      <>
        <WrappedComponent
          {...props}
          setSeverity={setSeverity}
          setOpenSnackBar={setOpenSnackBar}
          setMessageSnack={setMessageSnack}
        />
        <Snacks
          severity={severity}
          openSnackBar={openSnackBar}
          message={messageSnack}
          setOpenSnackBar={setOpenSnackBar}
          setMessage={setMessageSnack}
        />
      </>
    )
  }
  return SnacksEnhancer
}

export default withSnacks
