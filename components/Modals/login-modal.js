import * as React from "react"
import {
  Dialog,
  TextField,
  Stack,
  useMediaQuery,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import theme from "../../config/theme"
import { ModalTitle } from "./Modal-Components/modal-title"
import dynamic from "next/dynamic"
import { ActionButtons } from "./Modal-Components/modal-action-buttons"
import AlertInfo from "../Other/alert-info"
import withSnacks from "../hocs/withSnacks"
import { errorCodes } from "../../config/errorCodes"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { getUser } from "../../services/utils"
import { UserContext } from "../../contexts/UserContext"
import { setRefreshToken, setToken } from "../../services/cookies"
import CustomLink from "../ReusableComponents/custom-link"
import CustomForm from "../ReusableComponents/forms/custom-form"
import CustomFilledInput from "../ReusableComponents/forms/custom-filled-input"
import CustomFilledInputIcon from "../ReusableComponents/forms/custom-filled-input-icon"
import RightSubmitButton from "../ReusableComponents/forms/right-submit-button"
import LoginForm from "../Forms/login-form"

const SignUpForm = dynamic(() => import("../Forms/signup-form"))
const PasswordForgottenModal = dynamic(() =>
  import("./password-forgotten-modal")
)

function LoginModal(props) {
  /********** PROPS **********/
  const {
    openLogin,
    handleOpenLogin,
    handleCloseLogin,

    // hocs
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props

  /********** USER **********/
  const { setUser } = React.useContext(UserContext)

  /********** USE-STATES **********/
  const [passwordInput, setPasswordInput] = React.useState("")
  const [emailInput, setEmailInput] = React.useState("")
  const [openSignUp, setOpenSignUp] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [openPasswordForgotten, setOpenPasswordForgotten] =
    React.useState(false)
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  /********** FUNCTIONS **********/
  const resendConfirmEmail = async (confirmEmailToken) => {
    if (confirmEmailToken) {
      const res = await apiCall.users.resendConfirmEmail(confirmEmailToken)
      if (res && res.ok)
        setShowAlert({
          show: true,
          severity: "success",
          text: `A confirmation email has been sent to ${emailInput}.`,
          title: "Confirmation email re-sent",
        })
      else
        setShowAlert({
          show: true,
          severity: "warning",
          text: `Sorry, we cannot re-send the confirmation email to ${emailInput}.`,
          title: "Failed to send",
        })
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: `Sorry, we cannot re-send the confirmation email to ${emailInput}.`,
        title: "Failed to send",
      })
    }
  }

  const handleErrors = ({ errorCode, token }) => {
    if (errorCode === errorCodes.LOGIN_WRONG_PASSWORD)
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Your email or your password is incorrect.",
        title: "Wrong email or password",
      })
    else if (errorCode === errorCodes.LOGIN_EMAIL_NOT_CONFIRMED)
      setShowAlert({
        show: true,
        severity: "warning",
        title: "Email not confirmed",
        text: (
          <Stack justifyContent="center" alignItems="center">
            <Typography sx={{ margin: ".5rem auto" }}>
              Your email is not yet confirmed. A confirmation link has been sent
              to your email. Please check your spams. Click on the button or on
              the link in the email in order to confirm your email. Finally log
              in.
            </Typography>
            {token ? (
              <Typography sx={{ margin: ".5rem auto" }}>
                <Link
                  onClick={() => resendConfirmEmail(token)}
                  sx={{ cursor: "pointer" }}
                >
                  Click here
                </Link>{" "}
                to re-send a confirmation email.
              </Typography>
            ) : null}
          </Stack>
        ),
      })
    else if (errorCode === errorCodes.LOGIN_USER_BANNED)
      setShowAlert({
        show: true,
        severity: "warning",
        text: "This user has been banned.",
        title: "Banned user",
      })
    else
      setShowAlert({
        show: false,
        severity: null,
        text: null,
        title: null,
      })
  }

  const fetchUser = async () => {
    const userFromToken = getUser()
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      setUser(userData) // React context
      return true
    }
    return false
  }

  const login = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const res = await apiCall.unauthenticated.login({
      email: emailInput,
      password: passwordInput,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      handleSetTokens(jsonRes.token, jsonRes.refreshToken) // cookies
      if (await fetchUser()) {
        handleCloseLogin()
      }
    } else if (res) {
      const jsonRes = await res.json()
      // Special case here : we use a token generated by API on login bcs email//correct but it is not recommended to return a token if the frontend cannot log the user in
      let token = null
      if (
        jsonRes.code === errorCodes.LOGIN_EMAIL_NOT_CONFIRMED &&
        jsonRes.token
      )
        token = jsonRes.token
      handleErrors({ errorCode: jsonRes.code, token })
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Your email or your password is incorrect.",
        title: "Wrong email or password",
      })
    }
  }

  const handleSetTokens = (token, refreshToken) => {
    setToken(token) // Cookies
    setRefreshToken(refreshToken) // Cookies
  }

  const handleClickPasswordForgotten = () => {
    setOpenPasswordForgotten(true)
    handleCloseLogin()
  }

  const handleClosePasswordForgotten = () => {
    setOpenPasswordForgotten(false)
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  const handleOpenSignUp = () => {
    setOpenSignUp(true)
    handleCloseLogin()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  /********** RENDER **********/
  return (
    <>
      <Dialog
        open={openLogin}
        // onClose={handleCloseLogin}
        fullScreen={fullScreen}
        sx={{
          ".MuiPaper-root": {
            background: "blue",
            minWidth: "400px",
            gap: 2,
            padding: 2,
            width: fullScreen ? "100%" : "",
            justifyContent: fullScreen ? "center" : "",
            alignItems: fullScreen ? "center" : "",
          },
        }}
      >
        <ModalTitle text="Se connecter" />
        <LoginForm />
      </Dialog>

      {openSignUp ? (
        <SignUpForm
          openSignUp={openSignUp}
          handleCloseSignUp={handleCloseSignUp}
          handleOpenLogin={handleOpenLogin}
          setSeverity={setSeverity}
          setOpenSnackBar={setOpenSnackBar}
          setMessageSnack={setMessageSnack}
        />
      ) : null}

      {openPasswordForgotten ? (
        <PasswordForgottenModal
          defaultEmail={emailInput}
          openPasswordForgotten={openPasswordForgotten}
          handleClosePasswordForgotten={handleClosePasswordForgotten}
        />
      ) : null}
    </>
  )
}

/********** EXPORT **********/
export default withSnacks(LoginModal)
