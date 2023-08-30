import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ClearIcon from "@mui/icons-material/Clear"

import DualInputLine from "../../../Containers/dual-input-line"
import CustomForm from "../../../Forms/custom-form"
import CustomOutlinedInput from "../../../Inputs/custom-outlined-input"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import apiCall from "../../../../services/apiCalls/apiCall"
import { checkEmail } from "../../../../services/utils"
import AlertInfo from "../../../Other/alert-info"
import PillButton from "../../../Buttons/pill-button"
import CustomFilledInput from "../../../Inputs/custom-filled-input"

export default function ChangePersonalInformationSection(props) {
  const {} = props

  const { user, setUser } = useContext(UserContext)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [loadingButton, setLoadingButton] = useState(false)
  const [localUser, setLocalUser] = useState(user) // Prevent from live changing navbar firstname...
  const [updateErrors, setUpdateErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
  })
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  async function fetchUser() {
    setLoadingButton(true)
    const res = await apiCall.users.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUser(jsonRes)
      setLocalUser(user)
    }
    setLoadingButton(false)
  }

  // FETCH DATA
  useEffect(() => {
    if (user.id) fetchUser()
  }, [user.id])

  const emailError =
    updateErrors.email ||
    (localUser && localUser.email.trim() !== "" && !checkEmail(localUser.email))

  const handleChange = (attribute) => (event) => {
    setLocalUser({ ...localUser, [attribute]: event.target.value })
    setUpdateErrors({ ...updateErrors, [attribute]: false })
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Utilisateur modifié ✅")
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue lors de la modification 🙁")
  }
  const handleErrorDuplicate = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "L'adresse e-mail ou le numéro de téléphone existe déjà pour un autre utilisateur ❌"
    )
  }

  const handleSaveUser = async () => {
    setLoadingButton(true)
    const res = await apiCall.users.update(localUser)
    if (res && res.ok) {
      const jsonRes = await res.json()
      handleSuccess()
      await fetchUser()
      if (jsonRes.change_email_sent) {
        setShowAlert({
          severity: "info",
          show: true,
          title: "Vous venez de recevoir un e-mail...",
          text: "Un e-mail de confirmation vient de vous être envoyé pour finaliser la modification de votre adresse e-mail. N'oubliez pas de vérifier vos spams 😉",
        })
      }
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

  return (
    <CustomForm>
      <Stack
        gap={4}
        padding={4}
        width="100%"
        alignItems="center"
        borderRadius="10px"
        sx={{ backgroundColor: (theme) => theme.palette.background.main }}
      >
        <ModalTitle>Modifier mes informations personnelles</ModalTitle>

        <Stack width="100%" gap={2}>
          <DualInputLine>
            <CustomFilledInput
              required
              type="input"
              id="firstname"
              label="Prénom"
              value={localUser.firstname || ""}
              onChange={handleChange("firstname")}
              error={updateErrors.firstname}
              helperText={
                updateErrors.firstname && "Veuillez vérifier ce champ"
              }
            />
            <CustomFilledInput
              required
              type="input"
              id="lastname"
              label="Nom"
              value={localUser.lastname || ""}
              onChange={handleChange("lastname")}
              error={updateErrors.lastname}
              helperText={updateErrors.lastname && "Veuillez vérifier ce champ"}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomFilledInput
              required
              type="email"
              id="email"
              label="E-mail"
              value={localUser.email || ""}
              onChange={handleChange("email")}
              error={emailError || updateErrors.email}
              helperText={emailError && "Cet adresse e-mail n'est pas valide"}
            />
            <CustomFilledInput
              type="phone"
              id="phone"
              label="Téléphone"
              value={localUser.phone || ""}
              onChange={handleChange("phone")}
              error={updateErrors.phone}
              helperText={
                updateErrors.phone && "Ce numéro de téléphone n'est pas valide"
              }
            />
          </DualInputLine>
        </Stack>

        {showAlert.show ? <AlertInfo content={showAlert} /> : null}

        <Stack gap={1} justifyContent="end" width="100%">
          <PillButton
            onClick={handleSaveUser}
            disabled={loadingButton}
            preventTransitionOut
          >
            Enregistrer
          </PillButton>
          <Stack
            onClick={fetchUser}
            color="#fff"
            className="flex-center pointer"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            <Typography>Annuler</Typography>
          </Stack>
        </Stack>
      </Stack>
    </CustomForm>
  )
}
