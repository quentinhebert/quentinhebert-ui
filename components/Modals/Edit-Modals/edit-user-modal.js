import { useState, useEffect, useContext } from "react"
import FormControl from "@mui/material/FormControl"
import { Avatar, Box, Stack } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { ModalTitle } from "../Modal-Components/modal-title"
import apiCall from "../../../services/apiCalls/apiCall"
import AlertInfo from "../../Other/alert-info"
import { checkEmail, checkPhone } from "../../../services/utils"
import RefreshIcon from "@mui/icons-material/Refresh"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import CustomSelect from "../../Other/custom-select"
import DualInputLine from "../../ReusableComponents/forms/responsive-dual-input-container"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomCheckbox from "../../ReusableComponents/forms/custom-checkbox"
import { AppContext } from "../../../contexts/AppContext"

export default function EditUserForm(props) {
  // PROPS
  const { userId, openEditModal, handleCloseEditModal } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // USE-STATES
  const [user, setUser] = useState(null)
  const [loadingButton, setLoadingButton] = useState(false)
  const [updateErrors, setUpdateErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
  })
  const emailError =
    updateErrors.email ||
    (user && user.email.trim() !== "" && !checkEmail(user.email))
  const phoneError =
    updateErrors.phone ||
    (user && user.phone.trim() !== "" && !checkPhone(user.phone))

  // FUNCTIONS
  async function fetchUser() {
    const res = await apiCall.users.get(userId)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUser(jsonRes)
    }
  }
  const handleChange = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.value })
  }
  const handleCheck = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.checked })
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Utilisateur modifié avec succès")
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Un problème est survenu lors de la modification de l'utilisateur"
    )
  }
  const handleErrorDuplicate = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "L'e-mail ou le téléphone existe déjà pour un autre utilisateur"
    )
  }
  const handleSaveUser = async () => {
    setLoadingButton(true)
    const res = await apiCall.users.update(user)
    if (res && res.ok) {
      handleCloseEditModal()
      handleSuccess()
    } else if (res) {
      const jsonRes = await res.json()
      if (jsonRes.code === 1011) {
        handleErrorDuplicate()
      } else {
        handleError()
      }
    } else {
      handleError()
    }
    setLoadingButton(false)
  }
  const handleEmailSent = async () => {
    setSnackSeverity("success")
    setSnackMessage("Email envoyé avec succès")
  }
  const handleEmailNotSent = async () => {
    setSnackSeverity("error")
    setSnackMessage("Un problème est survenu lors de l'envoi de l'email")
  }
  const resendConfirmEmail = async () => {
    const res = await apiCall.admin.resendUserConfirmEmail(user)
    if (res && res.ok) handleEmailSent()
    else handleEmailNotSent()
  }
  const sendPasswordForgottenEmail = async () => {
    const res = await apiCall.admin.sendUserPasswordForgotten(user)
    if (res && res.ok) handleEmailSent()
    else handleEmailNotSent()
  }

  // SUB-COMPONENTS
  const InfoEmailConfirm = ({ user }) =>
    !!user &&
    !user.email_confirmed && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la checkbox n'est pas cochée, l'utilisateur ne pourra plus se connecter. L'utilisateur devra confirmer son e-mail via un email automatique de confirmation. Si l'utilisateur vient de créer son compte, l'utilisateur a reçu un e-mail de confirmation à l'adresse e-mail qu'il a renseignée. Attention, l'e-mail de confirmation peut être reçu dans les spams. Autrement, veuillez utiliser le bouton d'envoi d'e-mail de confirmation d'e-mail",
        }}
      />
    )
  const InfoBanned = ({ user }) =>
    user.banned && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la checkbox est cochée, l'utilisateur ne sera plus autorisé à se connecter. Un message lui en informera s'il tente de se connecter.",
        }}
      />
    )
  const InfoPasswordForgotten = ({ user }) =>
    user.password_forgotten && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la checkbox est cochée, cela signifie que l'utilisateur a cliqué sur le bouton \"Mot de passe oublié\". Si l'utilisateur réinitialise son mot de passe, cette checkbox sera décochée automatiquement.",
        }}
      />
    )

  // FETCH DATA
  useEffect(() => {
    if (userId) fetchUser()
  }, [userId])

  // HANDLE NO RENDER
  if (!user) return <></>

  // RENDER
  return (
    <CustomModal open={openEditModal} handleClose={handleCloseEditModal}>
      <ModalTitle>Modifier l'utilisateur</ModalTitle>

      <Stack direction="row" justifyContent="flex-end">
        <CustomSubmitButton
          startIcon={<RefreshIcon />}
          onClick={(e) => fetchUser()}
        >
          Rafraîchir
        </CustomSubmitButton>
      </Stack>

      <CustomForm>
        <Avatar
          src={user.avatar_path}
          sx={{
            width: "150px",
            height: "150px",
            marginBottom: "1rem",
            border: (theme) => `1px solid rgb(256,256,256, 0.5)`,
          }}
        />
        <FormControl fullWidth sx={{ gap: 2 }}>
          <CustomOutlinedInput
            disabled
            type="input"
            id="id"
            label="ID"
            value={user.id || ""}
          />

          <CustomSelect
            required
            size="small"
            placeholder="Type"
            options={[
              { id: "admin", label: "Admin" },
              { id: "client", label: "Client" },
              { id: "professional", label: "Employé" },
            ]}
            value={user.type}
            setValue={handleChange("type")}
          />

          <DualInputLine>
            <CustomOutlinedInput
              required
              type="input"
              id="firstname"
              label="Prénom"
              value={user.firstname || ""}
              onChange={handleChange("firstname")}
            />
            <CustomOutlinedInput
              required
              type="input"
              id="lastname"
              label="Nom"
              value={user.lastname || ""}
              onChange={handleChange("lastname")}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomOutlinedInput
              required
              type="email"
              id="email"
              label="E-mail"
              value={user.email || ""}
              onChange={handleChange("email")}
              error={emailError || updateErrors.email}
              helperText={emailError && "The email is not valid"}
            />
            <CustomOutlinedInput
              required
              type="phone"
              id="phone"
              label="Téléphone"
              value={user.phone || ""}
              onChange={handleChange("phone")}
              error={phoneError || updateErrors.phone}
              helperText={phoneError && "This phone is not valid"}
            />
          </DualInputLine>

          <CustomSubmitButton
            maxWidth="100%"
            onClick={sendPasswordForgottenEmail}
            startIcon={<SendIcon />}
            fontSize="0.8rem"
          >
            Envoyer un e-mail de réinitialisation de mot de passe
          </CustomSubmitButton>
          <CustomSubmitButton
            maxWidth="100%"
            onClick={resendConfirmEmail}
            startIcon={<SendIcon />}
            fontSize="0.8rem"
          >
            Envoyer un email de confirmation d'e-mail
          </CustomSubmitButton>

          <Box>
            <CustomCheckbox
              required
              label="E-mail confirmé"
              onChange={handleCheck("email_confirmed")}
              value={user.email_confirmed || false}
              checked={user.email_confirmed || false}
              labelcolor={(theme) => theme.palette.text.white}
              fontSize="1rem"
            />
            <InfoEmailConfirm user={user} />

            <CustomCheckbox
              label="Banni"
              onChange={handleCheck("banned")}
              value={user.banned || false}
              checked={user.banned || false}
              labelcolor={(theme) => theme.palette.text.white}
              fontSize="1rem"
            />
            <InfoBanned user={user} />

            <CustomCheckbox
              label="Mot de passe oublié"
              onChange={handleCheck("password_forgotten")}
              checked={user.password_forgotten || false}
              value={user.password_forgotten || false}
              labelcolor={(theme) => theme.palette.text.white}
              fontSize="1rem"
            />
            <InfoPasswordForgotten user={user} />
          </Box>
        </FormControl>
      </CustomForm>

      <Stack flexDirection="row" gap={2} justifyContent="end">
        <CustomSubmitButton onClick={handleCloseEditModal}>
          Annuler
        </CustomSubmitButton>
        <CustomSubmitButton
          secondary="true"
          onClick={handleSaveUser}
          disabled={loadingButton}
        >
          Enregistrer
        </CustomSubmitButton>
      </Stack>
    </CustomModal>
  )
}
