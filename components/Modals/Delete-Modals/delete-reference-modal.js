import { Stack } from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import BodyText from "../../Text/body-text"
import { AppContext } from "../../../contexts/AppContext"
import CustomModal from "../custom-modal"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import CustomForm from "../../Forms/custom-form"
import RectangleButton from "../../Buttons/rectangle-button"

export default function DeleteReferenceModal(props) {
  const { reference, open, handleClose, fetch } = props

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
    fetch()
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
          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton
            secondary="true"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Supprimer"}
          </RectangleButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}
