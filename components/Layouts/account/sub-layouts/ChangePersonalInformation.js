import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { checkEmail, checkPhone } from "../../../../services/utils"
import withSnacks from "../../../hocs/withSnacks"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import AlertInfo from "../../../Other/alert-info"
import CenteredMaxWidthContainer from "../../../ReusableComponents/containers/centered-max-width-container"
import CustomForm from "../../../ReusableComponents/forms/custom-form"
import CustomOutlinedInput from "../../../ReusableComponents/forms/custom-outlined-input"
import CustomSubmitButton from "../../../ReusableComponents/forms/custom-submit-button"
import DualInputLine from "../../../ReusableComponents/forms/responsive-dual-input-container"

function ChangePersonalInformation(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } = props
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
    const res = await apiCall.users.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUser(jsonRes)
      setLocalUser(user)
    }
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
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack("Utilisateur modifié ✅")
  }
  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack("Une erreur est survenue lors de la modification 🙁")
  }
  const handleErrorDuplicate = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack(
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
          <ModalTitle>Modifier mes informations personnelles</ModalTitle>

          <Stack width="100%" gap={2}>
            <DualInputLine>
              <CustomOutlinedInput
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
              <CustomOutlinedInput
                required
                type="input"
                id="lastname"
                label="Nom"
                value={localUser.lastname || ""}
                onChange={handleChange("lastname")}
                error={updateErrors.lastname}
                helperText={
                  updateErrors.lastname && "Veuillez vérifier ce champ"
                }
              />
            </DualInputLine>

            <DualInputLine>
              <CustomOutlinedInput
                required
                type="email"
                id="email"
                label="E-mail"
                value={localUser.email || ""}
                onChange={handleChange("email")}
                error={emailError || updateErrors.email}
                helperText={emailError && "Cet adresse e-mail n'est pas valide"}
              />
              <CustomOutlinedInput
                type="phone"
                id="phone"
                label="Téléphone"
                value={localUser.phone || ""}
                onChange={handleChange("phone")}
                error={updateErrors.phone}
                helperText={
                  updateErrors.phone &&
                  "Ce numéro de téléphone n'est pas valide"
                }
              />
            </DualInputLine>
          </Stack>

          {showAlert.show ? <AlertInfo content={showAlert} /> : null}

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton onClick={fetchUser}>Reset</CustomSubmitButton>
            <CustomSubmitButton
              secondary="true"
              onClick={handleSaveUser}
              disabled={loadingButton}
            >
              Enregistrer
            </CustomSubmitButton>
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}

export default withSnacks(ChangePersonalInformation)
