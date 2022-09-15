import { useState, useEffect } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { ModalTitle } from "../Modal-Components/modal-title"
import apiCall from "../../../services/apiCalls/apiCall"
import { ActionButtons } from "../Modal-Components/modal-action-buttons"
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

export default function EditUserForm(props) {
  // PROPS
  const {
    userId,
    openEditModal,
    handleCloseEditModal,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props

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
    const res = await apiCall.admin.getUser(userId)
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
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack("User updated successfully")
  }
  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack("A problem occurred while updating the user")
  }
  const handleErrorDuplicate = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack(
      "The email address or the phone already exists for anothe user"
    )
  }
  const handleSaveUser = async () => {
    setLoadingButton(true)
    const res = await apiCall.admin.updateUser(user)
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
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack("Email sent")
  }
  const handleEmailNotSent = async () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack("A problem occurred while sending the email")
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
          text: "If teh checkbox is unchecked, the user wont be allowed to log in anymore. The user will need to confirm his/her email with an automatic confirmation email. If the user has just created his/her account, the user has received an automatic email at the provided email. Attention, the automatic email can be received in the spams of the user. Otherwise, use the button to send an automatic confirmation email.",
        }}
      />
    )
  const InfoBanned = ({ user }) =>
    user.banned && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "If the checkbox is checked, the user will not be allowed to log in anymore. A message will be shown to the user if he/she tries to log in.",
        }}
      />
    )
  const InfoPasswordForgotten = ({ user }) =>
    user.password_forgotten && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: 'If the checkbox is checked, that means the user has clicked on the button "Password forgotten". If the user resets his/her password, this checkbox will be automatically unchecked.',
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
      <ModalTitle>Edit user</ModalTitle>

      <Stack direction="row" justifyContent="flex-end">
        <CustomSubmitButton
          startIcon={<RefreshIcon />}
          onClick={(e) => fetchUser()}
        >
          Refresh
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
              { id: "professional", label: "Employed" },
            ]}
            value={user.type}
            setValue={handleChange("type")}
          />

          <DualInputLine>
            <CustomOutlinedInput
              required
              type="input"
              id="firstname"
              label="Firstname"
              value={user.firstname || ""}
              onChange={handleChange("firstname")}
            />
            <CustomOutlinedInput
              required
              type="input"
              id="lastname"
              label="Lastname"
              value={user.lastname || ""}
              onChange={handleChange("lastname")}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomOutlinedInput
              required
              type="email"
              id="email"
              label="Email address"
              value={user.email || ""}
              onChange={handleChange("email")}
              error={emailError || updateErrors.email}
              helperText={emailError && "The email is not valid"}
            />
            <CustomOutlinedInput
              required
              type="phone"
              id="phone"
              label="Phone"
              value={user.phone || ""}
              onChange={handleChange("phone")}
              error={phoneError || updateErrors.phone}
              helperText={phoneError && "This phone is not valid"}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomSubmitButton
              maxWidth="100%"
              onClick={sendPasswordForgottenEmail}
              startIcon={<SendIcon />}
              fontSize="0.8rem"
            >
              Send an automatic password reset email
            </CustomSubmitButton>
            <CustomSubmitButton
              maxWidth="100%"
              onClick={resendConfirmEmail}
              startIcon={<SendIcon />}
              fontSize="0.8rem"
            >
              Send an automatic confirmation email
            </CustomSubmitButton>
          </DualInputLine>

          <Box>
            <CustomCheckbox
              required
              label="Email confirmed"
              onChange={handleCheck("email_confirmed")}
              value={user.email_confirmed || false}
              checked={user.email_confirmed || false}
              labelcolor={(theme) => theme.palette.text.white}
              fontSize="1rem"
            />
            <InfoEmailConfirm user={user} />

            <CustomCheckbox
              label="Banned"
              onChange={handleCheck("banned")}
              value={user.banned || false}
              checked={user.banned || false}
              labelcolor={(theme) => theme.palette.text.white}
              fontSize="1rem"
            />
            <InfoBanned user={user} />

            <CustomCheckbox
              label="Password forgotten"
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
