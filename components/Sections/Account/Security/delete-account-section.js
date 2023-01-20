import { Button, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { logout } from "../../../../services/utils"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import CustomForm from "../../../Forms/custom-form"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import BodyText from "../../../Text/body-text"
import CustomOutlinedInput from "../../../Inputs/custom-outlined-input"

const CopyPaste = (props) => (
  <Stack
    component="span"
    sx={{
      display: "inline-flex",
      color: "gray",
      border: "1px solid gray",
      borderRadius: "5px",
      padding: "0 .5rem",
      margin: "0 .25rem",
    }}
    {...props}
  />
)

const DeleteButton = (props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      color: (theme) => theme.palette.error.main,
      backgroundColor: "transparent",
      border: (theme) => `2px solid ${theme.palette.error.main}`,
      borderRadius: "10px",
      letterSpacing: "1.5px",
      fontSize: props.fontSize || "",
      "&:hover": {
        border: (theme) => `2px solid ${theme.palette.error.main}`,
        backgroundColor: (theme) => theme.palette.error.main,
        color: (theme) => theme.palette.text.primary,
      },
    }}
    {...props}
  />
)

export default function DeleteAccountSection(props) {
  const {} = props

  const { user, setUser } = useContext(UserContext)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // USE-STATES
  const [loadingButton, setLoadingButton] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [success, setSuccess] = useState(null)

  const router = useRouter()

  const invalidConfirmation = confirmation !== user.email

  // HANDLERS
  const handleChange = (event) => {
    setConfirmation(event.target.value)
  }
  const handleSuccess = () => {
    setSuccess(true) // To disable the submit button
    setSnackSeverity("success")
    setSnackMessage(
      "Votre compte a bien été supprimé. Vous allez être redirigé dans 5 secondes..."
    )
    setTimeout(() => {
      logout() // remove tokens from cookies
      setUser(null)
      router.push("/")
    }, [5000])
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Une erreur est survenue lors de la mise à jour de votre mot de passe..."
    )
  }
  const handleInvalidConfirmation = async (response) => {
    setSnackSeverity("error")
    setSnackMessage(
      "Veuillez saisir votre adresse e-mail pour poursuivre l'opération"
    )
  }
  const handleDeleteUser = async () => {
    if (!invalidConfirmation) {
      const res = await apiCall.users.delete(user.id)
      if (res && res.ok) {
        handleSuccess()
      } else {
        handleError()
      }
    } else {
      handleInvalidConfirmation()
    }
  }

  if (!user) return <></>

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
          <ModalTitle>Supprimer mon compte</ModalTitle>

          <BodyText fontSize="1rem">
            Saisissez
            <CopyPaste>{user.email}</CopyPaste> puis cliquez sur{" "}
            <em>"Supprimer mon compte"</em> pour supprimer définitivement votre
            compte.
          </BodyText>

          <CustomOutlinedInput
            required
            type="input"
            id="confirmation"
            label="Saisissez votre adresse e-mail"
            value={confirmation || ""}
            onChange={handleChange}
          />

          <DeleteButton
            onClick={handleDeleteUser}
            disabled={loadingButton || invalidConfirmation || success}
          >
            Supprimer mon compte
          </DeleteButton>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}
