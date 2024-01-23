import { useContext, useState } from "react"
import { Context } from "../../../module"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import AlertInfo from "../../../../../../Other/alert-info"
import { Box, Stack } from "@mui/material"
import CustomForm from "../../../../../../Forms/custom-form"
import PillButton from "../../../../../../Buttons/pill-button"
import CustomFilledInput from "../../../../../../Inputs/custom-filled-input"
import CancelButton from "../../../../../../Buttons/cancel-button"
import BodyText from "../../../../../../Text/body-text"
import { checkEmail } from "../../../../../../../services/utils"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../../../../contexts/AppContext"

export default function ModalSendQuote() {
  const { state, setState, fetchOrder } = useContext(Context)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)
  const [emailInput, setEmailInput] = useState("")

  const emailError = emailInput?.trim() !== "" && !checkEmail(emailInput)

  return (
    <>
      <ModalTitle>Envoyer le devis</ModalTitle>
      {!!state.selectedQuotation?.recipient_emails?.length && (
        <AlertInfo
          content={{
            show: true,
            js: (
              <span>
                Vous avez déjà envoyé le devis à :
                <ul>
                  {state.selectedQuotation.recipient_emails.map(
                    (email, key) => (
                      <>
                        <Box
                          key={key}
                          component="li"
                          onClick={() => setEmailInput(email)}
                          sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            "&:hover": {
                              color: (theme) => theme.palette.text.secondary,
                            },
                          }}
                        >
                          {email}
                        </Box>
                      </>
                    )
                  )}
                </ul>
              </span>
            ),
          }}
        />
      )}
      <CustomForm gap={4}>
        {!!state.selectedQuotation?.client?.email && (
          <>
            <PillButton
              textTransform="capitalize"
              onClick={() => {
                handleSend(
                  state.selectedQuotation.id,
                  state.selectedQuotation.client.email
                )
              }}
            >
              Envoyer à <br />
              {state.selectedQuotation.client.email}
            </PillButton>
            <BodyText>ou</BodyText>
          </>
        )}

        <CustomFilledInput
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          label="Destinataire (e-mail)"
          error={emailError}
          helperText={emailError && "Adresse e-mail invalide"}
        />
        <Stack className="row" gap={2}>
          <CancelButton
            handleCancel={() => setState({ ...state, openModal: false })}
          />
          <PillButton type="submit" onClick={handleSend}>
            Envoyer
          </PillButton>
        </Stack>
      </CustomForm>
    </>
  )

  async function handleSend() {
    const res = await apiCall.quotations.send({
      id: state.selectedQuotation.id,
      email: emailInput,
    })
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage(`Le devis a été envoyé à ${emailInput}`)
      fetchOrder()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
    }
  }
}
