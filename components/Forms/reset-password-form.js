import { useState, useEffect, useContext } from "react"
import { Stack } from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import { motion } from "framer-motion"
import AlertInfo from "../../components/Other/alert-info"
import { checkPassword } from "../../services/utils"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AppContext } from "../../contexts/AppContext"
import PleaseWait from "../Helpers/please-wait"
import CustomForm from "./custom-form"
import RectangleButton from "../Buttons/rectangle-button"
import CustomOutlinedInput from "../Inputs/custom-outlined-input"
import { setRefreshToken, setToken } from "../../services/cookies"
import { UserContext } from "../../contexts/UserContext"

const Custom401_Main = dynamic(() => import("../Main/Errors/Custom401_Main.js"))

const AnimationRoot = (props) => (
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
    {...props}
  />
)

export default function ResetPasswordForm(props) {
  /********** PROPS **********/
  const { token } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [isFetching, setIsFetching] = useState(true)
  const [userId, setUserId] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [passwordResetSuccess, setPasswordResetSuccess] = useState("")
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: null,
    text: null,
  })
  const mainButtonDisabled = !(
    passwordConfirmation &&
    password &&
    passwordConfirmation.trim() !== "" &&
    password.trim() !== ""
  )

  const router = useRouter()

  /********** FUNCTIONS **********/
  const initialCheck = async () => {
    if (token) {
      const res = await apiCall.users.security.password.resetAccess(token)

      // We return a 401 if the token doesn't match any user who wants to reset his/her password
      if (!(res && res.ok)) {
        setIsFetching(false)
        return null
      }

      // We get the user id from the token
      const user = await res.json()
      if (user) setUserId(user.id)
      setIsFetching(false)
    }
  }
  const handleSuccess = async (res) => {
    const jsonRes = await res.json()
    setToken(jsonRes.token) // Cookies
    setRefreshToken(jsonRes.refreshToken) // Cookies
    setSnackMessage("Votre mot de passe a bien été changé")
    setSnackSeverity("success")

    setShowAlert({
      show: true,
      severity: "success",
      text: "Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page dans 5 secondes.",
    })
    setPasswordResetSuccess(true)

    const redirect = router.query?.redirect
    router.push(redirect || "/")
  }
  const handleError = async (res) => {
    const jsonRes = await res.json()
    setSnackMessage("Problème")
    setSnackSeverity("error")
    setShowAlert({
      show: true,
      severity: "warning",
      text: `Un problème est survenu lors de la réinitialisation de votre mot de passe. [CodeError: ${jsonRes.code}]`,
    })
  }
  const resetPassword = async () => {
    if (!userId && !token) return null
    if (!checkPassword(password)) return null
    if (password !== passwordConfirmation) return null
    const res = await apiCall.users.security.password.reset({
      token,
      password,
      id: userId,
    })
    if (res && res.ok) handleSuccess(res)
    else handleError(res)
  }

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has a good token to reset his/her password and not the one of someone else
  // Otherwise it will reset the password of the user the token is from
  useEffect(() => {
    initialCheck()
  }, [token])

  if (isFetching) return <PleaseWait />
  if (!userId && !isFetching) return <Custom401_Main />

  /********** RENDER **********/
  return (
    <AnimationRoot>
      <Stack width="100%" gap={4}>
        <ModalTitle>Choisissez votre mot de passe</ModalTitle>

        <CustomForm gap={4}>
          {passwordResetSuccess ? (
            <AlertInfo content={showAlert} />
          ) : (
            <>
              <Stack gap={2} width="100%">
                <CustomOutlinedInput
                  required
                  size="medium"
                  label="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={password.trim() !== "" && !checkPassword(password)}
                  helperText={
                    password.trim() !== "" &&
                    !checkPassword(password) &&
                    "Minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
                  }
                />
                <CustomOutlinedInput
                  required
                  size="medium"
                  label="Répétez le mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  error={
                    passwordConfirmation.trim() !== "" &&
                    password !== passwordConfirmation
                  }
                  helperText={
                    passwordConfirmation.trim() !== "" &&
                    password !== passwordConfirmation &&
                    "Les deux mots de passe ne correspondent pas"
                  }
                />
                {showAlert.show ? <AlertInfo content={showAlert} /> : null}
              </Stack>

              <Stack alignItems="end" width="100%">
                <Stack flexDirection="row" gap={2}>
                  <RectangleButton href="/">Annuler</RectangleButton>
                  <RectangleButton
                    secondary="true"
                    onClick={resetPassword}
                    disabled={mainButtonDisabled}
                  >
                    Enregistrer
                  </RectangleButton>
                </Stack>
              </Stack>
            </>
          )}
        </CustomForm>
      </Stack>
    </AnimationRoot>
  )
}
