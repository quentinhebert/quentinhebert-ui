import { useState, useContext } from "react"
import { Box, FormHelperText, Stack } from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import { USERTYPES } from "../../enums/userTypes"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import { checkPhone, checkEmail, checkPassword } from "../../services/utils"
import AlertInfo from "../Other/alert-info"
import CustomSelect from "../Other/custom-select"
import { UserContext } from "../../contexts/UserContext"
import { AppContext } from "../../contexts/AppContext"
import RectangleButton from "../Buttons/rectangle-button"
import CustomOutlinedInput from "../Inputs/custom-outlined-input"
import CustomCheckbox from "../Inputs/custom-checkbox"
import CustomForm from "./custom-form"
import DualInputLine from "../Containers/dual-input-line"
import BodyText from "../Text/body-text"
import Span from "../Text/span"
import InTextLink from "../Links/in-text-link"
import { defaultConfig } from "../../config/defaultConfig"

export default function SignUpForm({
  handleClose,
  setIsCompleted,
  defaultValues,
  ...props
}) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // Check if user exists and if the user is admin
  const { user } = useContext(UserContext)
  const isAdmin = user && user.type === USERTYPES.ADMIN

  /********** MODEL **********/
  const initialUserData = {
    firstname: defaultValues?.firstname || "",
    lastname: defaultValues?.lastname || "",
    email: defaultValues?.email || "",
    password: defaultValues?.password || "",
    phone: defaultValues?.phone || "",
    type: isAdmin ? "" : USERTYPES.CLIENT,
  }
  // Set initial errors on false
  let errors = {}
  Object.keys(initialUserData).map((key) => {
    errors[key] = false
  })
  const initialSignUpErrors = errors

  // Clear all data & errors
  const clearData = () => {
    setUserData(initialUserData)
    setSignupErrors(initialSignUpErrors)
    setAccept({ policy: false })
    setSignupCompleted(false)
    if (!!setIsCompleted) setIsCompleted(false)
    setShowAlert({
      show: false,
      severity: null,
      text: null,
      title: null,
    })
  }

  /********** USE-STATES **********/
  const [accept, setAccept] = useState({ policy: false })
  const [signupCompleted, setSignupCompleted] = useState(false)
  const [userData, setUserData] = useState(initialUserData)
  const [signupErrors, setSignupErrors] = useState(initialSignUpErrors)
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  /********** VARAIABLES FOR LIVE CHECK **********/
  const liveCheck = {
    password:
      signupErrors.password ||
      (userData.password.trim() !== "" && !checkPassword(userData.password)),
    email:
      signupErrors.email ||
      (userData.email.trim() !== "" && !checkEmail(userData.email)),
    phone:
      signupErrors.phone ||
      (userData.phone.trim() !== "" && !checkPhone(userData.phone)),
  }

  /********** FUNCTIONS **********/
  const handleChange = (attribute) => (event) => {
    // Update user data
    setUserData({
      ...userData,
      [attribute]: event.target.value,
    })
    // On change we reset the localError of the input value, we let the live check take over
    setSignupErrors({
      ...signupErrors,
      [attribute]: false,
    })
  }

  const handleCheck = (attribute) => (e) => {
    setAccept({ ...accept, [attribute]: e.target.checked })
  }

  const handleSignUpComplete = () => {
    setSignupCompleted(true)
    if (!!setIsCompleted) setIsCompleted(true)
    setSnackSeverity("success")
    setSnackMessage("Inscription réussie !")
    setShowAlert({
      show: true,
      severity: "success",
      text: "Un lien de confirmation a été envoyé à l'adresse e-mail que vous avez renseignée. Cliquez sur le lien ou bien sur le bouton dans l'e-mail, pour vérifier qu'il s'agit bien de votre e-mail.",
      title: "Votre inscription est presque terminée",
    })
  }

  const handleSignUpIncomplete = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "L'inscription a échouée, veuillez vérifier tous les champs"
    )
  }

  const handleDuplicateSignup = () => {
    setShowAlert({
      show: true,
      title: "E-mail ou téléphone déjà existant",
      severity: "warning",
      text: "Votre e-mail ou votre numéro de téléphone existe déjà pour un autre utilisateur.",
    })
  }

  /* Check all data at once onSubmit button click */
  const checkAllData = () => {
    const localErrors = initialSignUpErrors

    // Let's check that all input values are not null and not empty string
    Object.keys(userData).map((key) => {
      if (!userData[key] || userData[key].trim() === "") localErrors[key] = true
      else localErrors[key] = false
    })

    // Count number of errors
    let count = Object.values(localErrors).filter((err) => err === true).length

    return { errors: localErrors, count }
  }

  const signUp = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    const { errors, count } = checkAllData()
    setSignupErrors(errors)

    // we dont send the createUser request if payload is invalid
    if (count > 0) return

    const res = await apiCall.users.create({ userData })
    if (res && res.ok) {
      handleSignUpComplete()
    } else {
      const jsonRes = await res.json()
      if (jsonRes.code === 1010) {
        handleDuplicateSignup()
      }
      handleSignUpIncomplete()
    }
  }

  const handleCloseAndClear = () => {
    clearData()
    handleClose()
  }

  /********** RENDER **********/
  return (
    <Stack gap={4}>
      <CustomForm>
        <DualInputLine>
          <CustomOutlinedInput
            required
            type="input"
            id="firstname"
            label="Prénom"
            value={userData.firstname}
            onChange={handleChange("firstname")}
            error={signupErrors.firstname}
            helperText={signupErrors.firstname && "Vérifiez ce champ"}
          />
          <CustomOutlinedInput
            required
            type="input"
            id="lastname"
            label="Nom"
            value={userData.lastname}
            onChange={handleChange("lastname")}
            error={signupErrors.lastname}
            helperText={signupErrors.lastname && "Vérifiez ce champ"}
          />
        </DualInputLine>

        <DualInputLine>
          <CustomOutlinedInput
            required
            type="email"
            id="email"
            label="E-mail"
            value={userData.email}
            onChange={handleChange("email")}
            error={liveCheck.email || signupErrors.email}
            helperText={liveCheck.email && "Cet e-mail n'est pas valide"}
          />
          <CustomOutlinedInput
            required
            type="phone"
            id="phone"
            label="Téléphone"
            value={userData.phone}
            onChange={handleChange("phone")}
            error={liveCheck.phone || signupErrors.phone}
            helperText={liveCheck.phone && "Ce téléphone n'est pas valide"}
          />
        </DualInputLine>

        <DualInputLine>
          <CustomOutlinedInput
            required
            type="input"
            label="Mot de passe"
            value={userData.password}
            onChange={handleChange("password")}
            error={liveCheck.password}
            helperText={
              liveCheck.password &&
              "Minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
            }
          />

          {isAdmin ? (
            <Stack flexDirection="column" width="100%">
              <CustomSelect
                required
                size="small"
                placeholder="Role"
                options={[
                  { id: "admin", label: "Admin" },
                  { id: "client", label: "Client" },
                  { id: "professional", label: "Employé" },
                ]}
                value={userData.type}
                setValue={(eventValue) =>
                  setUserData({ ...userData, type: eventValue })
                }
                error={signupErrors.type}
              />
              {signupErrors.type && (
                <FormHelperText
                  sx={{ color: (theme) => theme.palette.error.main }}
                >
                  Vous devez sélectionner un rôle
                </FormHelperText>
              )}
            </Stack>
          ) : null}
        </DualInputLine>

        <CustomCheckbox
          label={
            <Span>
              J'accepte les{" "}
              <Span className="cool-button">
                <InTextLink
                  text="CGU"
                  href={`${defaultConfig.webclientUrl}/terms-of-use`}
                  target="_blank"
                />
              </Span>{" "}
              et{" "}
              <Span className="cool-button">
                <InTextLink
                  text="CGV"
                  href={`${defaultConfig.webclientUrl}/terms-and-conditions`}
                  target="_blank"
                />
              </Span>{" "}
              du site *
            </Span>
          }
          onChange={handleCheck("policy")}
          value={accept.policy}
          labelcolor={(theme) => theme.palette.text.white}
          fontSize="1rem"
        />
        {showAlert.show ? <AlertInfo content={showAlert} /> : null}
      </CustomForm>

      <Stack flexDirection="row" gap={2} justifyContent="end">
        <RectangleButton onClick={handleCloseAndClear}>
          {signupCompleted ? "Fermer" : "Annuler"}
        </RectangleButton>
        <RectangleButton
          secondary="true"
          onClick={signUp}
          disabled={!accept.policy || signupCompleted}
        >
          Enregistrer
        </RectangleButton>
      </Stack>
    </Stack>
  )
}
