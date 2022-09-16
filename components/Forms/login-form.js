import { useState, useContext, useEffect } from "react"
import {
  Stack,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import AlertInfo from "../Other/alert-info"
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
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/router"

export default function LoginForm(props) {
  /********** PROPS **********/
  const {
    redirect,
    handleClickPasswordForgotten,
    passwordForgottenDefaultEmail,
    setPasswordForgottenDefaultEmail,
  } = props

  const router = useRouter()

  /********** USER **********/
  const { setUser } = useContext(UserContext)

  /********** USE-STATES **********/
  const [passwordInput, setPasswordInput] = useState("")
  const [emailInput, setEmailInput] = useState(
    passwordForgottenDefaultEmail || ""
  )
  const [showPassword, setShowPassword] = useState(false)
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: key / 5 },
    },
    hidden: { opacity: 0, y: 0 },
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

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
        if (redirect) router.push(redirect)
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  /********** RENDER **********/
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 2 }}
      style={{
        width: "100%",
        padding: "2rem",
        border: `1px solid #fff`,
        borderRadius: "10px",
      }}
    >
      <Stack width="100%" gap={4} ref={ref}>
        <motion.div
          initial="hidden"
          variants={variants(0.5)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <ModalTitle>Se connecter</ModalTitle>
        </motion.div>

        <CustomForm gap={4}>
          <motion.div
            initial="hidden"
            variants={variants(2)}
            animate={controls}
            style={{ width: "100%" }}
          >
            <Stack gap={2} width="100%">
              <CustomFilledInput
                label="E-mail"
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                  setPasswordForgottenDefaultEmail
                    ? setPasswordForgottenDefaultEmail(e.target.value)
                    : null
                }}
              />
              <CustomFilledInputIcon
                className="input-no-underline"
                placeholder="Mot de passe"
                type={showPassword ? "text" : "password"}
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff
                          color="secondary"
                          sx={{ fontSize: "1.1rem" }}
                        />
                      ) : (
                        <Visibility
                          color="secondary"
                          sx={{ fontSize: "1.1rem" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {showAlert.show ? <AlertInfo content={showAlert} /> : null}
            </Stack>
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(3)}
            animate={controls}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Typography>
              <CustomLink
                sx={{ color: (theme) => theme.palette.text.white }}
                onClick={handleClickPasswordForgotten}
                className="cool-button"
              >
                Mot de passe oublié ?
              </CustomLink>
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(4)}
            animate={controls}
            style={{ width: "100%" }}
          >
            <RightSubmitButton
              onClick={login}
              disabled={
                !passwordInput ||
                !emailInput ||
                passwordInput.trim() === "" ||
                emailInput.trim() === ""
              }
            >
              Se connecter
            </RightSubmitButton>
          </motion.div>
        </CustomForm>
      </Stack>
    </motion.div>
  )
}
