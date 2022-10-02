import { Button, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withSnacks from "../../hocs/withSnacks"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { logout } from "../../../services/utils"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import BodyText from "../../ReusableComponents/text/body-text"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"

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
        border: (theme) => theme.palette.error.main,
        backgroundColor: (theme) => theme.palette.error.main,
        color: (theme) => theme.palette.text.primary,
      },
    }}
    {...props}
  />
)

function DeleteAccount(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } = props

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
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack(
      "Votre compte a bien été supprimé. Vous allez être redirigé dans 5 secondes..."
    )
    setTimeout(() => {
      logout() // remove tokens from cookies
      setUser(null)
      router.push("/")
    }, [5000])
  }
  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack(
      "Une erreur est survenue lors de la mise à jour de votre mot de passe..."
    )
  }
  const handleInvalidConfirmation = async (response) => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack(
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

export default withSnacks(DeleteAccount)
