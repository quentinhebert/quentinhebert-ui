import {
  Box,
  Dialog,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import React from "react"
import apiCall from "../../services/apiCalls/apiCall"
import AlertInfo from "../Other/alert-info"
import { ActionButtons } from "./Modal-Components/modal-action-buttons"
import { ModalTitle } from "./Modal-Components/modal-title"
import theme from "../../config/theme"

function PasswordForgottenModal(props) {
  /********** PROPS **********/
  const { openPasswordForgotten, handleClosePasswordForgotten, defaultEmail } =
    props

  /********** USE-STATES **********/
  const [emailInput, setEmailInput] = React.useState(defaultEmail || "")
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  const handleSendPasswordForgotten = async () => {
    const userData = { email: emailInput }
    const res = await apiCall.unauthenticated.passwordForgotten({ userData })
    if (res && res.ok) {
      setShowAlert({
        show: true,
        severity: "info",
        text: "An automatic confirmation email for password reset has just been sent to your email.",
        title: "Sent !",
      })
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "A problem occurred while sending the automatic email to the address you have provided",
        title: "Oops...",
      })
    }
  }

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  /********** RENDER **********/
  return (
    <>
      <Dialog
        open={openPasswordForgotten}
        onClose={handleClosePasswordForgotten}
        fullScreen={fullScreen}
        sx={{
          ".MuiPaper-root": { bgcolor: "#000" },
        }}
      >
        <ModalTitle text="Password forgotten" />

        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ margin: "1rem auto", width: "400px" }}
        >
          <TextField
            label="Email address"
            color="primary"
            sx={{ width: "calc(100% - 3rem)" }}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Box sx={{ width: "calc(100% - 3rem)" }}>
            {showAlert.show ? <AlertInfo content={showAlert} /> : null}
          </Box>
          <ActionButtons
            middleButtonText="Cancel"
            middleButtonOnClick={handleClosePasswordForgotten}
            rightButtonText="Send"
            rightButtonOnClick={handleSendPasswordForgotten}
            rightButtonDisabled={!emailInput || emailInput.trim() === ""}
          />
        </Stack>
      </Dialog>
    </>
  )
}

export default PasswordForgottenModal
