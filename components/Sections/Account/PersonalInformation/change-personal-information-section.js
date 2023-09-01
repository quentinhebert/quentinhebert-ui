import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"

import DualInputLine from "../../../Containers/dual-input-line"
import CustomForm from "../../../Forms/custom-form"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import apiCall from "../../../../services/apiCalls/apiCall"
import { checkEmail } from "../../../../services/utils"
import AlertInfo from "../../../Other/alert-info"
import PillButton from "../../../Buttons/pill-button"
import CustomFilledInput from "../../../Inputs/custom-filled-input"

export default function ChangePersonalInformationSection({}) {
  const { user, setUser } = useContext(UserContext)
  const { handleError, handleSuccess } = useContext(AppContext)

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

  // INITIAL FETCH
  useEffect(() => {
    if (user.id) fetchUser()
  }, [user.id])

  const emailError =
    updateErrors.email ||
    (localUser && localUser.email.trim() !== "" && !checkEmail(localUser.email))

  return (
    <CustomForm>
      <Stack
        gap={4}
        padding={{ xs: "2rem 1rem", md: "2rem" }}
        width="100%"
        alignItems="center"
        borderRadius="10px"
        sx={{ backgroundColor: (theme) => theme.palette.background.main }}
      >
        <ModalTitle>Modifier mes informations personnelles</ModalTitle>

        <Stack width="100%" gap={{ xs: 1, md: 2 }}>
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

  // FETCH DATA
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
  // HANDLERS
  function handleChange(attribute) {
    return (event) => {
      setLocalUser({ ...localUser, [attribute]: event.target.value })
      setUpdateErrors({ ...updateErrors, [attribute]: false })
    }
  }
  async function handleSaveUser() {
    setLoadingButton(true)
    const res = await apiCall.users.update(localUser)

    if (!res?.ok)
      return handleError("Une erreur est survenue lors de la modification 🙁")

    const jsonRes = await res.json()
    if (jsonRes.code === 1011)
      return handleError(
        "L'adresse e-mail ou le numéro de téléphone existe déjà pour un autre utilisateur ❌"
      )

    // Handle use case when user has updated email
    if (jsonRes.change_email_sent)
      setShowAlert({
        severity: "info",
        show: true,
        title: "Vous venez de recevoir un e-mail...",
        text: "Un e-mail de confirmation vient de vous être envoyé pour finaliser la modification de votre adresse e-mail. N'oubliez pas de vérifier vos spams 😉",
      })

    handleSuccess("Modifications enregistrées ✅")
    setLoadingButton(false)
    await fetchUser()
  }
}
