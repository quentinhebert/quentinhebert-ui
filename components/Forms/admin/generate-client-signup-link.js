import { useState, useContext } from "react"
import { Button, Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import { checkEmail } from "../../../services/utils"
import AlertInfo from "../../Other/alert-info"
import { errorCodes } from "../../../config/errorCodes"
import PillButton from "../../Buttons/pill-button"
import BottomButtons from "../../Buttons/bottom-buttons"

export default function GenerateClientSignupLink(props) {
  /********** PROPS **********/
  const { handleClose, handleCancel } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [email, setEmail] = useState("")
  const [duplicatedEmail, setDuplicatedEmail] = useState(false)
  const liveCheck = email.trim() !== "" && !checkEmail(email)

  /********** FUNCTIONS **********/
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("L'e-mail avec le lien d'inscription a bien été envoyé")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
  }
  const handleSend = async () => {
    setDuplicatedEmail(false)
    const res = await apiCall.users.sendClientSignupLink({ email })
    if (res && res.ok) handleSuccess()
    else if (res) {
      const jsonRes = await res.json()
      if (jsonRes.code === errorCodes.SEND_CLIENT_SIGNUP_LINK_DUPLICATED_EMAIL)
        setDuplicatedEmail(true)
    } else handleError()
  }

  /********** RENDER **********/
  return (
    <Stack width="100%" gap={4}>
      <CustomForm gap={4}>
        {duplicatedEmail && (
          <AlertInfo
            content={{
              show: true,
              severity: "error",
              title: "E-mail déjà existant",
              text: "Cet e-mail est lié à un utilisateur existant",
            }}
          />
        )}
        <CustomFilledInput
          label="Adresse e-mail du client"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={liveCheck}
          helperText={liveCheck && "Adresse e-mail non valide"}
        />

        <BottomButtons
          onClick={handleSend}
          disabled={liveCheck || !email || email.trim() === ""}
          label="Envoyer le lien par mail"
          handleCancel={handleCancel}
        />
      </CustomForm>
    </Stack>
  )
}
