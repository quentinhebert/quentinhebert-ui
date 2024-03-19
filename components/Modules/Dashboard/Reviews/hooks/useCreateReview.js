import { Stack } from "@mui/material"
import { useContext, useState } from "react"
import CustomModal from "../../../../Modals/custom-modal"
import { ModalTitle } from "../../../../Modals/Modal-Components/modal-title"
import PillButton from "../../../../Buttons/pill-button"
import CancelButton from "../../../../Buttons/cancel-button"
import apiCall from "../../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../../contexts/AppContext"
import CustomForm from "../../../../Forms/custom-form"
import ClientAutocomplete from "../../../../Forms/admin/client-autocomplete"

export default function useCreateReview({ refreshData }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpenCreateReviewModal = () => setOpen(true)
  const handleCancel = handleClose

  const initialData = {
    user_id: "",
  }
  const [processing, setProcessing] = useState(false)

  const [userValue, setUserValue] = useState({})
  const [userInputValue, setUserInputValue] = useState("")

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  async function handleCreateReview() {
    setProcessing(true)
    const res = await apiCall.reviews.create({ user_id: userValue.id })
    if (res && res.ok) {
      setSnackMessage("L'avis a bien été créé")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    handleClose()
    setProcessing(false)
    if (!!refreshData) refreshData()
  }

  const CreateReviewDialog = ({}) => {
    return (
      <CustomModal open={open} handleClose={handleClose} gap={6}>
        {/**** TITLE ****/}
        <ModalTitle>Créer un avis</ModalTitle>

        <CustomForm onSubmit={handleCreateReview}>
          <ClientAutocomplete
            placeholder="Rechercher un client"
            setValue={setUserValue}
            inputValue={userInputValue}
            setInputValue={setUserInputValue}
          />
        </CustomForm>

        {/**** BOTTOM BUTTONS ****/}
        <Stack gap={2} width="100%">
          <PillButton onClick={handleCreateReview} disabled={processing}>
            Ajouter
          </PillButton>
          <CancelButton variant="text" handleCancel={handleCancel} />
        </Stack>
      </CustomModal>
    )
  }

  return { handleOpenCreateReviewModal, CreateReviewDialog }
}
