import { useState, useEffect, useContext } from "react"
import { Stack } from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import CustomForm from "../ReusableComponents/forms/custom-form"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import { motion } from "framer-motion"
import AlertInfo from "../../components/Other/alert-info"
import { checkPassword } from "../../services/utils"
import PleaseWait from "../ReusableComponents/helpers/please-wait"
import dynamic from "next/dynamic"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import CustomOutlinedInput from "../ReusableComponents/forms/custom-outlined-input"
import { useRouter } from "next/router"
import { AppContext } from "../../contexts/AppContext"

const Custom401Layout = dynamic(() =>
  import("../Layouts/error/Custom401Layout")
)

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
  const handleSuccess = () => {
    setSnackMessage("Votre mot de passe a bien été changé")
    setSnackSeverity("success")

    setShowAlert({
      show: true,
      severity: "success",
      text: "Ton mot de passe a été réinitialisé avec succès. Tu vas être redirigé vers la page dans 5 secondes.",
    })
    setPasswordResetSuccess(true)

    setTimeout(() => {
      router.push("/")
    }, 5000)
  }
  const handleError = (jsonRes) => {
    setSnackMessage("Problème")
    setSnackSeverity("error")
    setShowAlert({
      show: true,
      severity: "warning",
      text: `Un problème est survenu lors de la réinitialisation de ton mot de passe. [CodeError: ${jsonRes.code}]`,
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
    if (res && res.ok) handleSuccess()
    else {
      const jsonRes = await res.json()
      handleError(jsonRes)
    }
  }

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has a good token to reset his/her password and not the one of someone else
  // Otherwise it will reset the password of the user the token is from
  useEffect(() => {
    initialCheck()
  }, [token])

  if (isFetching) return <PleaseWait />
  if (!userId && !isFetching) return <Custom401Layout />

  /********** RENDER **********/
  return (
    <AnimationRoot>
      <Stack width="100%" gap={4}>
        <ModalTitle>Réinitialisez votre mot de passe</ModalTitle>

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
                  <CustomSubmitButton href="/">Annuler</CustomSubmitButton>
                  <CustomSubmitButton
                    secondary="true"
                    onClick={resetPassword}
                    disabled={mainButtonDisabled}
                  >
                    Enregistrer
                  </CustomSubmitButton>
                </Stack>
              </Stack>
            </>
          )}
        </CustomForm>
      </Stack>
    </AnimationRoot>
  )
}
