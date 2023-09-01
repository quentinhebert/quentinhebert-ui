import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"

import apiCall from "../../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { logout } from "../../../../services/utils"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import CustomForm from "../../../Forms/custom-form"
import BodyText from "../../../Text/body-text"
import CustomFilledInput from "../../../Inputs/custom-filled-input"
import PillButton from "../../../Buttons/pill-button"

export default function DeleteAccountSection(props) {
  const {} = props

  const { user, setUser } = useContext(UserContext)
  const { handleError, handleSuccess } = useContext(AppContext)

  // USE-STATES
  const [loadingButton, setLoadingButton] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [success, setSuccess] = useState(null)

  const router = useRouter()

  const invalidConfirmation = confirmation !== user.email

  // HANDLERS
  function handleChange(event) {
    setConfirmation(event.target.value)
  }

  function handleInvalidConfirmation() {
    handleError(
      "Veuillez saisir votre adresse e-mail pour poursuivre l'opération"
    )
  }
  async function handleDeleteUser() {
    if (invalidConfirmation) return handleInvalidConfirmation()

    const res = await apiCall.users.delete(user.id)
    if (!res?.ok)
      return handleError(
        "Une erreur est survenue lors de la mise à jour de votre mot de passe..."
      )

    setSuccess(true) // To disable the submit button
    handleSuccess(
      "Votre compte a bien été supprimé. Vous allez être redirigé dans 5 secondes..."
    )

    setTimeout(() => {
      logout() // remove tokens from cookies
      setUser(null)
      router.push("/")
    }, [5000])
  }

  if (!user) return <></>

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
        <ModalTitle>Supprimer mon compte</ModalTitle>

        <BodyText fontSize="1rem">
          Saisissez
          <CopyPaste>{user.email}</CopyPaste> puis cliquez sur{" "}
          <em>"Supprimer mon compte"</em> pour supprimer définitivement votre
          compte.
        </BodyText>

        <CustomFilledInput
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
  )
}

function CopyPaste(props) {
  return (
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
}
function DeleteButton(props) {
  return (
    <PillButton
      width="100%"
      variant="contained"
      color="#fff"
      background={(theme) => theme.palette.error.main}
      startIcon={<DeleteIcon />}
      preventTransitionOut
      {...props}
    />
  )
}
