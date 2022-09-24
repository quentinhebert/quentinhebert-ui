import { Stack, Avatar } from "@mui/material"
import { useEffect } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withSnacks from "../../hocs/withSnacks"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { compose } from "redux"
import withAddAvatar from "../../hocs/withAddAvatar"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"

function ChangeAvatar(props) {
  const {
    user,
    setUser,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    uploadSuccess,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  // Fetch data
  async function fetchUser() {
    const res = await apiCall.users.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUser(jsonRes)
    }
  }
  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser()
  }, [user.id, uploadSuccess])

  // FUNCTIONS
  const deleteAvatar = async () => {
    // Prepare the payload
    let formData = new FormData()
    formData.append("avatar", null)
    // Send the image to the API
    const res = await apiCall.users.updateAvatar({ formData, user })
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  // HANDLERS
  const handleSuccess = () => {
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack("Your avatar has been deleted successfully")
    setUser({ ...user, avatar_path: null }) // Update user context
  }
  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack("A problem occured while deleting your avatar")
  }
  const handleDeleteAvatar = () => {
    setActionToFire(() => () => deleteAvatar())
    setConfirmTitle("Confirmation")
    setConfirmContent({
      text: "Do you really want to delete your avatar ?",
    })
    setNextButtonText("Yes, I really do !")
    setOpenConfirmModal(true)
  }

  return (
    <CenteredMaxWidthContainer>
      <CustomForm>
        <Stack
          gap={4}
          padding={4}
          width="100%"
          alignItems="center"
          borderRadius="10px"
          sx={{ backgroundColor: (theme) => theme.palette.background.main }}
        >
          <ModalTitle>Modifier mon avatar</ModalTitle>

          <Avatar
            alt="Avatar"
            src={user.avatar_path}
            sx={{ width: 100, height: 100 }}
          />

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton
              onClick={handleDeleteAvatar}
              disabled={!user.avatar_path}
            >
              Supprimer
            </CustomSubmitButton>
            <CustomSubmitButton
              secondary="true"
              onClick={(e) => setOpenAddNewPhotosModal(true)}
            >
              {user.avatar_path ? "Modifier" : "Ajouter"}
            </CustomSubmitButton>
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}

export default compose(
  withSnacks,
  withAddAvatar,
  withConfirmAction
)(ChangeAvatar)
