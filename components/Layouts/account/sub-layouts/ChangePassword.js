import { Stack, InputAdornment, IconButton, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { checkPassword } from "../../../../services/utils"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { errorCodes } from "../../../../config/errorCodes"
import CenteredMaxWidthContainer from "../../../ReusableComponents/containers/centered-max-width-container"
import CustomForm from "../../../ReusableComponents/forms/custom-form"
import CustomSubmitButton from "../../../ReusableComponents/forms/custom-submit-button"
import CustomOutlinedInput from "../../../ReusableComponents/forms/custom-outlined-input"
import DualInputLine from "../../../ReusableComponents/forms/responsive-dual-input-container"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"

export default function ChangePassword(props) {
  const {} = props

  const { user, setUser } = useContext(UserContext)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // USE-STATES
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPasswords, setShowNewPasswords] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [updateErrors, setUpdateErrors] = useState({
    password: false,
    newPassword: false,
  })

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
  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser()
  }, [user.id])

  // Handling LIVE & RESPONSE ERRORS
  const passwordError = user.password?.trim() !== "" && updateErrors.password
  const newPasswordError =
    user.newPassword?.trim() !== "" && !checkPassword(user.newPassword)
  const newPasswordConfirmationError =
    user.newPasswordConfirmation?.trim() !== "" &&
    user.newPasswordConfirmation !== user.newPassword

  // HANDLERS
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowNewPasswords = () => {
    setShowNewPasswords(!showNewPasswords)
  }
  const handleChange = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.value })
    setUpdateErrors({ ...updateErrors, [attribute]: false })
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Your password has been changed successfully")
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("A problem occured while changing your password")
  }
  const handleCustomError = async (response) => {
    if (response.code === errorCodes.LOGIN_WRONG_PASSWORD) {
      // Snacks
      setSnackSeverity("error")
      setSnackMessage("Your current password is incorrect")
      // Custom front error
      setUpdateErrors({ ...updateErrors, password: true })
    }
  }
  const handleClearErrors = () => {
    setUpdateErrors({
      password: false,
      newPassword: false,
    })
  }
  const handleSaveUser = async () => {
    setLoadingButton(true)
    const res = await apiCall.users.auth.password.update(user)
    if (res && res.ok) {
      handleSuccess()
      await fetchUser() // Clear input fields
      handleClearErrors()
    } else if (res) {
      const jsonRes = await res.json()
      handleCustomError(jsonRes)
    } else {
      handleError()
    }
    setLoadingButton(false)
  }

  // SUB-COMPONENTS
  const CustomError = ({ text }) => {
    return (
      <Typography
        variant="body2"
        fontSize="0.8rem"
        sx={{ marginTop: "0.5rem", color: (theme) => theme.palette.error.main }}
      >
        {text}
      </Typography>
    )
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
          <ModalTitle>Modifier mon mot de passe</ModalTitle>

          <Stack width="100%" gap={2}>
            <CustomOutlinedInput
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
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <DualInputLine>
              <CustomOutlinedInput
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
                    >
                      {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <CustomOutlinedInput
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
                    >
                      {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </DualInputLine>
          </Stack>

          <Stack flexDirection="row" gap={2} justifyContent="center">
            <CustomSubmitButton onClick={fetchUser}>Reset</CustomSubmitButton>
            <CustomSubmitButton
              secondary="true"
              onClick={handleSaveUser}
              disabled={
                loadingButton ||
                newPasswordError ||
                newPasswordConfirmationError
              }
            >
              Enregistrer
            </CustomSubmitButton>
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}
