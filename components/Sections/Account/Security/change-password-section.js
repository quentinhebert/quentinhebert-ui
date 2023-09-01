import { Stack, InputAdornment, IconButton, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { checkPassword } from "../../../../services/utils"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { errorCodes } from "../../../../config/errorCodes"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"
import CustomForm from "../../../Forms/custom-form"
import DualInputLine from "../../../Containers/dual-input-line"
import PillButton from "../../../Buttons/pill-button"
import CustomFilledInput from "../../../Inputs/custom-filled-input"

export default function ChangePasswordSection(props) {
  const {} = props

  const { user, setUser } = useContext(UserContext)
  const { handleError, handleSuccess } = useContext(AppContext)

  // USE-STATES
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPasswords, setShowNewPasswords] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [updateErrors, setUpdateErrors] = useState({
    password: false,
    newPassword: false,
  })

  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser()
  }, [user.id])

  // Handling LIVE & RESPONSE ERRORS
  const passwordError = user.password?.trim() !== "" && updateErrors.password
  const newPasswordError =
    !!user?.newPassword &&
    user.newPassword?.trim() !== "" &&
    !checkPassword(user.newPassword)
  const newPasswordConfirmationError =
    user.newPasswordConfirmation?.trim() !== "" &&
    user.newPasswordConfirmation !== user.newPassword

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
        <ModalTitle>Modifier mon mot de passe</ModalTitle>

        <Stack width="100%" gap={{ xs: 1, md: 2 }}>
          <CustomFilledInput
            label="Mot de passe actuel"
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password || ""}
            onChange={handleChange("password")}
            error={passwordError}
            helperText={passwordError && "Votre mot de passe est incorrect"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  color="secondary"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <DualInputLine>
            <CustomFilledInput
              label="Nouveau mot de passe"
              type={showNewPasswords ? "text" : "password"}
              id="new_password"
              value={user.newPassword || ""}
              onChange={handleChange("newPassword")}
              error={newPasswordError}
              helperText={
                newPasswordError &&
                "Minimum 8 caracters, 1 lowercase, 1 uppercase, 1 number and 1 special caracter"
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPasswords}
                    edge="end"
                    color="secondary"
                  >
                    {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <CustomFilledInput
              label="Confirm the new password"
              type={showNewPasswords ? "text" : "password"}
              id="new_password_confirmation"
              value={user.newPasswordConfirmation || ""}
              onChange={handleChange("newPasswordConfirmation")}
              error={newPasswordConfirmationError}
              helperText={
                newPasswordConfirmationError &&
                "Les deux mots de passe ne correspondent pas"
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPasswords}
                    edge="end"
                    color="secondary"
                  >
                    {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </DualInputLine>
        </Stack>

        <Stack width="100%" gap={1} justifyContent="center">
          <PillButton
            secondary="true"
            onClick={handleSaveUser}
            disabled={
              loadingButton || newPasswordError || newPasswordConfirmationError
            }
          >
            Mettre à jour mon mot de passe
          </PillButton>
          <Button
            variant="text"
            onClick={fetchUser}
            color="secondary"
            sx={{ borderRadius: "30px", textTransform: "capitalize" }}
          >
            Effacer tout
          </Button>
        </Stack>
      </Stack>
    </CustomForm>
  )

  // Fetch data
  async function fetchUser() {
    const res = await apiCall.users.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      // We add some usefull attributes to the current user object (empty strings to clear all fields when user is fetched)
      setUser({
        ...jsonRes,
        password: "",
        newPassword: "",
        newPasswordConfirmation: "",
      })
    }
  }
  // HANDLERS
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  function handleClickShowNewPasswords() {
    setShowNewPasswords(!showNewPasswords)
  }
  function handleChange(attribute) {
    return (event) => {
      setUser({ ...user, [attribute]: event.target.value })
      setUpdateErrors({ ...updateErrors, [attribute]: false })
    }
  }
  async function handleCustomError(response) {
    if (response.code === errorCodes.LOGIN_WRONG_PASSWORD) {
      // Snacks
      handleError("Your current password is incorrect")
      // Custom front error
      setUpdateErrors({ ...updateErrors, password: true })
    }
  }
  function handleClearErrors() {
    setUpdateErrors({
      password: false,
      newPassword: false,
    })
  }
  async function handleSaveUser() {
    setLoadingButton(true)
    const res = await apiCall.users.security.password.update(user)
    if (res && res.ok) {
      handleSuccess("Ton mot de passe a été mis à jour")
      await fetchUser() // Clear input fields
      handleClearErrors()
    } else if (res) {
      const jsonRes = await res.json()
      handleCustomError(jsonRes)
    } else handleError("Le mot de passe n'a pas pu être mis à jour...")

    setLoadingButton(false)
  }
}
