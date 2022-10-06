import { Stack } from "@mui/material"
import { useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import BodyText from "../../ReusableComponents/text/body-text"

export default function DeleteFilmModal(props) {
  const {
    film,
    open,
    handleClose,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
  } = props

  const [isLoading, setIsLoading] = useState(false)

  if (!film) return <></>

  // HANDLERS
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSeverity("success")
    setMessageSnack("Le film a été mis à jour !")
    setOpenSnackBar(true)
    handleClose()
  }
  const handleError = () => {
    setSeverity("error")
    setMessageSnack("An error occurred while updating the category...")
    setOpenSnackBar(true)
  }
  const handleDelete = async () => {
    setIsLoading(true)
    const res = await apiCall.admin.deleteFilm(film)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new thumbnail uploaded but film update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Supprimer le film</ModalTitle>

      <BodyText>Voulez-vous vraiment supprimer le film "{film.title}"</BodyText>

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