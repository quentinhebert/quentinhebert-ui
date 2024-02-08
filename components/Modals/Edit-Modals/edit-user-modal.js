import { useState, useEffect, useContext } from "react"
import FormControl from "@mui/material/FormControl"
import {
  Avatar,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { ModalTitle } from "../Modal-Components/modal-title"
import apiCall from "../../../services/apiCalls/apiCall"
import AlertInfo from "../../Other/alert-info"
import { checkEmail, checkPhone } from "../../../services/utils"
import CustomModal from "../../Modals/custom-modal"
import CustomForm from "../../Forms/custom-form"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import { AppContext } from "../../../contexts/AppContext"
import CustomFilledSelect from "../../Inputs/custom-filled-select"
import CustomSelectOption from "../../Inputs/custom-select-option"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import CustomFilledPhoneInput from "../../Inputs/custom-filled-phone-input"
import PillButton from "../../Buttons/pill-button"
import CancelButton from "../../Buttons/cancel-button"
import { InvisibleAccordion } from "../../Containers/custom-accordion"

export default function EditUserForm({
  userId,
  openEditModal,
  handleCloseEditModal,
}) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // USE-STATES
  const [user, setUser] = useState(null)
  const [copyText, setCopyText] = useState(null)
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
    user?.phone !== null &&
    user?.phone?.trim() !== "" &&
    (updateErrors.phone || !checkPhone(user?.phone))

  // FETCH DATA
  useEffect(() => {
    if (userId) fetchUser()
  }, [userId])

  // Handle auto hide copy text msg
  useEffect(() => {
    if (!!copyText) setTimeout(() => setCopyText(null), 3000)
  }, [copyText])

  // HANDLE NO RENDER
  if (!user) return <></>

  // RENDER
  return (
    <CustomModal
      open={openEditModal}
      handleClose={handleCloseEditModal}
      StickyTop={
        <ModalTitle>
          Utilisateur
          <Typography
            color="text.grey"
            fontSize=".8rem"
            className="pointer"
            onClick={() => {
              navigator.clipboard.writeText(user.id)
              setCopyText(<>✅ ID copié</>)
            }}
            sx={{
              "&:hover": { color: (theme) => theme.palette.secondary.main },
            }}
          >
            {copyText || user.id || ""}
          </Typography>
        </ModalTitle>
      }
      StickyBottom={
        <Stack gap={2}>
          <PillButton onClick={handleSaveUser} disabled={loadingButton}>
            Enregistrer
          </PillButton>
          <CancelButton
            handleCancel={() => {
              handleCloseEditModal()
              fetchUser()
            }}
          />
        </Stack>
      }
    >
      <Stack gap={4} position="relative">
        <CustomForm>
          <FormControl fullWidth sx={{ gap: 2 }}>
            <Stack width="100%" flexDirection="row" alignItems="center" gap={2}>
              <Avatar
                src={user.avatar_path}
                sx={{
                  width: "150px",
                  height: "150px",
                  marginBottom: "1rem",
                  border: (theme) => `1px solid rgb(256,256,256, 0.5)`,
                }}
              />
              <Stack gap={1}>
                <NameInput
                  placeholder="Prénom"
                  value={user.firstname || ""}
                  onChange={handleChange("firstname")}
                />
                <NameInput
                  placeholder="Nom"
                  value={user.lastname || ""}
                  onChange={handleChange("lastname")}
                />
              </Stack>
            </Stack>

            <Typography variant="h6" color="#fff">
              Type d'utilisateur
            </Typography>
            <CustomFilledSelect
              borderColor="transparent"
              value={user.type}
              onChange={handleChange("type")}
            >
              {USER_TYPES.map((opt, key) => (
                <CustomSelectOption key={key} value={opt.id}>
                  {opt.label}
                </CustomSelectOption>
              ))}
            </CustomFilledSelect>

            <Divider />

            <Typography variant="h6" color="#fff">
              Coordonnées
            </Typography>
            <Stack gap={1}>
              <CustomFilledInput
                required
                type="email"
                id="email"
                label="E-mail"
                borderColor="transparent"
                value={user.email || ""}
                onChange={handleChange("email")}
                error={emailError || updateErrors.email}
                helperText={emailError && "Adresse e-mail invalide"}
              />
              <CustomFilledPhoneInput
                borderColor="transparent"
                value={user.phone || ""}
                handleChange={(newValue) =>
                  setUser({ ...user, phone: newValue })
                }
                error={phoneError || updateErrors.phone}
                helperText={phoneError && "Numéro de téléphone invalide"}
              />
            </Stack>

            <Divider />

            <InvisibleAccordion title="Entreprise" gap={1}>
              <CustomFilledInput
                borderColor="transparent"
                labelColor="grey"
                label="Raison sociale (optionnel)"
                value={user.company || ""}
                onChange={handleChange("company")}
              />
              <CustomFilledInput
                borderColor="transparent"
                labelColor="grey"
                label="N° TVA (optionnel)"
                value={user.vat_number || ""}
                onChange={handleChange("vat_number")}
              />
            </InvisibleAccordion>

            <Divider />

            <InvisibleAccordion title="Options" gap={1}>
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
            </InvisibleAccordion>

            <Divider />

            <InvisibleAccordion title="Actions" gap={1}>
              <PillButton
                startIcon={<SendIcon />}
                onClick={sendPasswordForgottenEmail}
              >
                Réinitialiser le mot de passe
              </PillButton>
              <PillButton startIcon={<SendIcon />} onClick={resendConfirmEmail}>
                Confirmer l'e-mail
              </PillButton>
            </InvisibleAccordion>
          </FormControl>
        </CustomForm>
      </Stack>
    </CustomModal>
  )

  // FUNCTIONS
  async function fetchUser() {
    const res = await apiCall.users.get(userId)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUser(jsonRes)
    }
  }
  function handleChange(attribute) {
    return (event) => {
      setUser({ ...user, [attribute]: event.target.value })
    }
  }
  function handleCheck() {
    return (attribute) => (event) => {
      setUser({ ...user, [attribute]: event.target.checked })
    }
  }
  function handleSuccess() {
    setSnackSeverity("success")
    setSnackMessage("Utilisateur modifié avec succès")
  }
  function handleError() {
    setSnackSeverity("error")
    setSnackMessage(
      "Un problème est survenu lors de la modification de l'utilisateur"
    )
  }
  function handleErrorDuplicate() {
    setSnackSeverity("error")
    setSnackMessage(
      "L'e-mail ou le téléphone existe déjà pour un autre utilisateur"
    )
  }
  async function handleSaveUser() {
    setLoadingButton(true)
    const res = await apiCall.users.update(user)
    if (res?.ok) {
      handleCloseEditModal()
      handleSuccess()
    } else if (res) {
      const jsonRes = await res.json()
      if (jsonRes.code === 1011) handleErrorDuplicate()
      else handleError()
    } else handleError()

    setLoadingButton(false)
  }
  async function handleEmailSent() {
    setSnackSeverity("success")
    setSnackMessage("E-mail envoyé à l'utilisateur avec succès")
  }
  async function handleEmailNotSent() {
    setSnackSeverity("error")
    setSnackMessage("Un problème est survenu lors de l'envoi de l'email")
  }
  async function resendConfirmEmail() {
    const res = await apiCall.users.resendConfirmEmail({
      email: user.email,
    })
    if (res && res.ok) handleEmailSent()
    else handleEmailNotSent()
  }
  async function sendPasswordForgottenEmail() {
    const res = await apiCall.users.security.password.forgotten({
      email: user.email,
    })
    if (res && res.ok) handleEmailSent()
    else handleEmailNotSent()
  }
}

const USER_TYPES = [
  { id: "admin", label: "Admin" },
  { id: "client", label: "Client" },
  { id: "professional", label: "Employé" },
]

// SUB-COMPONENTS
function NameInput({ ...props }) {
  return (
    <TextField
      required
      type="input"
      variant="standard"
      InputProps={{
        disableUnderline: true,
        sx: {
          color: (theme) => theme.palette.text.white,
          fontSize: "2rem",
          background: "rgb(256,256,256, 0.1)",
          padding: "0 1rem",
          borderRadius: 30,
        },
        endAdornment: (
          <InputAdornment position="end">
            {/* <EditIcon sx={{ color: "grey !important" }} /> */}
            <Typography color="grey" fontSize=".75rem">
              Modifier
            </Typography>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}
function InfoEmailConfirm({ user }) {
  return (
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
  )
}
function InfoBanned({ user }) {
  return (
    user.banned && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la checkbox est cochée, l'utilisateur ne sera plus autorisé à se connecter. Un message lui en informera s'il tente de se connecter.",
        }}
      />
    )
  )
}
function InfoPasswordForgotten({ user }) {
  return (
    user.password_forgotten && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la checkbox est cochée, cela signifie que l'utilisateur a cliqué sur le bouton \"Mot de passe oublié\". Si l'utilisateur réinitialise son mot de passe, cette checkbox sera décochée automatiquement.",
        }}
      />
    )
  )
}
