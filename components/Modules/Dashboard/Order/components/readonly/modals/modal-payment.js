import { useContext, useState } from "react"
import { Context } from "../../../module"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import CustomForm from "../../../../../../Forms/custom-form"
import CustomFilledInput from "../../../../../../Inputs/custom-filled-input"
import { Stack } from "@mui/material"
import CancelTextButton from "../../../../../../Buttons/cancel-text-button"
import PillButton from "../../../../../../Buttons/pill-button"
import { checkEmail } from "../../../../../../../services/utils"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../../../../contexts/AppContext"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export default function ModalPayment() {
  const { state, setState, handleCloseModal } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const [paymentEmail, setPaymentEmail] = useState(
    state.order.client?.email || ""
  )
  const [loading, setLoading] = useState(false)

  const emailError = paymentEmail.trim() !== "" && !checkEmail(paymentEmail)

  return (
    <>
      <ModalTitle>Envoyer un lien de paiement</ModalTitle>
      <CustomForm gap={4}>
        <CustomFilledInput
          inputRef={(input) => input && input.focus()}
          value={paymentEmail}
          onChange={(e) => setPaymentEmail(e.target.value)}
          label="Destinataire (e-mail)"
          error={emailError} // FIXME: email error is not correct => need to separate logic for different emails
          helperText={emailError && "Adresse e-mail invalide"}
          endAdornment={
            <Stack onClick={() => setPaymentEmail("")} className="pointer">
              <CloseRoundedIcon />
            </Stack>
          }
        />

        <Stack width="100%" gap="1rem">
          <PillButton onClick={generatePaymentLink} disabled={loading}>
            Envoyer
          </PillButton>
          <CancelTextButton
            handleCancel={() => setState({ ...state, openModal: false })}
            alignSelf="center"
          />
        </Stack>
      </CustomForm>
    </>
  )

  async function generatePaymentLink() {
    setLoading(true)
    if (paymentEmail.trim === "") setPaymentEmail(state.order.client?.email)
    const res = await apiCall.orders.sendPaymentLink({
      id: state.order.id,
      email: paymentEmail,
    })
    if (res && res.ok) {
      setSnackMessage("Lien de paiement envoyé")
      setSnackSeverity("success")
      handleCloseModal()
    } else {
      setSnackMessage("Erreur")
      setSnackSeverity("error")
    }
    setLoading(false)
  }
}
