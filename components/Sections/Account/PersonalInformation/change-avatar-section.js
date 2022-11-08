import { Stack, Avatar } from "@mui/material"
import { useContext, useEffect } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { compose } from "redux"
import withAddAvatar from "../../../hocs/withAddAvatar"
import withConfirmAction from "../../../hocs/withConfirmAction"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"
import CustomForm from "../../../Forms/custom-form"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import RectangleButton from "../../../Buttons/rectangle-button"

function ChangeAvatarSection(props) {
  const {
    setOpenAddNewPhotosModal,
    uploadSuccess,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { user, setUser } = useContext(UserContext)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

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
    setSnackSeverity("success")
    setSnackMessage("Your avatar has been deleted successfully")
    setUser({ ...user, avatar_path: null }) // Update user context
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("A problem occured while deleting your avatar")
  }
  const handleDeleteAvatar = () => {
    setActionToFire(() => () => deleteAvatar())
    setConfirmTitle("Confirmation")
    setConfirmContent({
      text: "Voulez-vous vraiment supprimer votre avatar ?",
    })
    setNextButtonText("Oui, je le veux ! 💍")
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
            <RectangleButton
              onClick={handleDeleteAvatar}
              disabled={!user.avatar_path}
            >
              Supprimer
            </RectangleButton>
            <RectangleButton
              secondary="true"
              onClick={(e) => setOpenAddNewPhotosModal(true)}
            >
              {user.avatar_path ? "Modifier" : "Ajouter"}
            </RectangleButton>
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}

export default compose(withAddAvatar, withConfirmAction)(ChangeAvatarSection)
