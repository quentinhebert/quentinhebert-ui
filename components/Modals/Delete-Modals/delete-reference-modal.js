import { Stack } from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import BodyText from "../../ReusableComponents/text/body-text"
import { AppContext } from "../../../contexts/AppContext"

export default function DeleteReferenceModal(props) {
  const { reference, open, handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)

  if (!reference) return <></>

  // HANDLERS
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("La référence a été supprimé !")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  const handleDelete = async () => {
    setIsLoading(true)
    const res = await apiCall.references.delete(reference)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new thumbnail uploaded but reference update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Supprimer la référence</ModalTitle>

      <BodyText>
        Voulez-vous vraiment supprimer la référence "{reference.label}"
      </BodyText>

      <CustomForm gap={3}>
        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <CustomSubmitButton onClick={handleCancel}>
            Annuler
          </CustomSubmitButton>
          <CustomSubmitButton
            secondary="true"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Supprimer"}
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}
