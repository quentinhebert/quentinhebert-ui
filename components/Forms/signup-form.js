import { useState, useContext } from "react"
import { Box, Divider, FormHelperText, Grid, Stack } from "@mui/material"
import apiCall from "../../services/apiCalls/apiCall"
import { USERTYPES } from "../../enums/userTypes"
import {
  checkPhone,
  checkEmail,
  checkPassword,
  checkVATnumber,
} from "../../services/utils"
import AlertInfo from "../Other/alert-info"
import CustomSelect from "../Other/custom-select"
import { UserContext } from "../../contexts/UserContext"
import { AppContext } from "../../contexts/AppContext"
import CustomCheckbox from "../Inputs/custom-checkbox"
import CustomForm from "./custom-form"
import DualInputLine from "../Containers/dual-input-line"
import BodyText from "../Text/body-text"
import Span from "../Text/span"
import InTextLink from "../Links/in-text-link"
import { defaultConfig } from "../../config/defaultConfig"
import BottomButtons from "../Buttons/bottom-buttons"
import { useGoogleLogin } from "@react-oauth/google"
import CustomFilledInput from "../Inputs/custom-filled-input"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

const OAUTH_TYPES = { GOOGLE: "Google", FACEBOOK: "Facebook", APPLE: "Apple" }
const STEPS = ["name", "contact", "company", "password"]

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

  // Google Login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await apiCall.users.auth.google.getInfo({
        googleAccessToken: tokenResponse.access_token,
      })
      if (res && res.ok) {
        setIsOauth(true)
        setStep(STEPS[1])
        setOauthType(OAUTH_TYPES.GOOGLE)
        const jsonRes = await res.json()
        setUserData({
          ...userData,
          email: jsonRes.email,
          firstname: jsonRes.given_name,
          lastname: jsonRes.family_name,
        })
      }
    },
    onError: () => {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    },
  })

  const handleFacebookLogin = async (response) => {
    if (!!response) {
      setIsOauth(true)
      setStep(STEPS[1])
      setOauthType(OAUTH_TYPES.FACEBOOK)
      setUserData({
        ...userData,
        email: response.email,
        firstname: response.first_name,
        lastname: response.last_name,
      })
    }
  }

  /********** MODEL **********/
  const initialUserData = {
    firstname: defaultValues?.firstname || "",
    lastname: defaultValues?.lastname || "",
    email: defaultValues?.email || "",
    password: defaultValues?.password || "",
    phone: defaultValues?.phone || "",
    company: defaultValues?.company || "",
    vat_number: defaultValues?.vat_number || "",
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
    setIsOauth(false)
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
  const [step, setStep] = useState(STEPS[0])
  const [isOauth, setIsOauth] = useState(false)
  const [oauthType, setOauthType] = useState(null)
  const [accept, setAccept] = useState({ policy: false })
  const [signupCompleted, setSignupCompleted] = useState(false)
  const [userData, setUserData] = useState(initialUserData)
  const [signupErrors, setSignupErrors] = useState(initialSignUpErrors)
  const [isCompany, setIsCompany] = useState(false)
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  /********** VARAIABLES FOR LIVE CHECK **********/
  const liveCheck = {
    password:
      !isOauth &&
      (signupErrors.password ||
        (userData.password.trim() !== "" && !checkPassword(userData.password))),
    email:
      signupErrors.email ||
      (userData.email?.trim() !== "" && !checkEmail(userData.email)),
    phone:
      signupErrors.phone ||
      (userData.phone.trim() !== "" && !checkPhone(userData.phone)),
    vat_number:
      signupErrors.vat_number ||
      (userData.vat_number.trim() !== "" &&
        !checkVATnumber(userData.vat_number)),
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
  const checkAllData = (props) => {
    const localErrors = initialSignUpErrors

    const notRequiredFields = props || ["phone", "company"]

    if (!isCompany || (isCompany && userData.vat_number?.trim() === ""))
      notRequiredFields.push("vat_number")

    // Let's check that all input values are not null and not empty string
    Object.keys(userData).map((key) => {
      if (
        !notRequiredFields.includes(key) &&
        (!userData[key] || userData[key].trim() === "")
      )
        localErrors[key] = true
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

  const signUpOauth = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    const { errors, count } = checkAllData(["phone", "password", "company"])
    setSignupErrors(errors)

    // we dont send the createUser request if payload is invalid
    if (count > 0) return

    const res = await apiCall.users.createOauth({ userData })
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
    if (!!handleClose) handleClose()
  }

  /********** RENDER **********/
  return (
    <Stack gap={4}>
      {!isOauth && step === STEPS[0] && !isAdmin && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <OauthBtn
                onClick={() => handleGoogleLogin()}
                bgcolor={(theme) => theme.palette.background.main}
                src="/medias/google-logo.png"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FacebookLogin
                appId={defaultConfig.facebookAppId}
                callback={handleFacebookLogin}
                fields="first_name,last_name,email,picture"
                render={(renderProps) => (
                  <OauthBtn
                    onClick={renderProps.onClick}
                    bgcolor="#3b5998"
                    src="/medias/facebook-logo.png"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider>
            <BodyText>OU</BodyText>
          </Divider>
        </>
      )}

      <CustomForm minWidth={{ xs: "250px", md: "300px" }}>
        {isOauth && (
          <AlertInfo
            content={{
              show: true,
              title: `Connexion avec un service tiers : ${oauthType}`,
              text: `Une fois votre compte créé, vous pourrez vous connecter avec ${oauthType}.`,
              severity: "info",
            }}
          />
        )}

        {showAlert.show ? <AlertInfo content={showAlert} /> : null}

        {step === STEPS[0] && (
          <>
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
            <CustomFilledInput
              type="input"
              id="firstname"
              label="Prénom"
              value={userData.firstname}
              onChange={handleChange("firstname")}
              error={signupErrors.firstname}
              helperText={signupErrors.firstname && "Vérifiez ce champ"}
              disabled={isOauth && userData.firstname?.trim() !== ""}
            />
            <CustomFilledInput
              type="input"
              id="lastname"
              label="Nom"
              value={userData.lastname}
              onChange={handleChange("lastname")}
              error={signupErrors.lastname}
              helperText={signupErrors.lastname && "Vérifiez ce champ"}
              disabled={isOauth && userData.lastname?.trim() !== ""}
            />

            <BottomButtons
              mt={2}
              type="submit"
              onClick={() => setStep(STEPS[1])}
              label="Suivant"
              disabled={
                userData.firstname?.trim() === "" ||
                userData.lastname?.trim() === ""
              }
              cancelLabel={signupCompleted ? "Fermer" : "Annuler"}
              handleCancel={handleCloseAndClear}
            />
          </>
        )}

        {step === STEPS[1] && (
          <>
            <CustomFilledInput
              type="email"
              id="email"
              label="E-mail"
              value={userData.email}
              onChange={handleChange("email")}
              error={liveCheck.email || signupErrors.email}
              helperText={liveCheck.email && "Cet e-mail n'est pas valide"}
              disabled={isOauth && userData.email?.trim() !== ""}
            />
            <CustomFilledInput
              type="phone"
              id="phone"
              label={<Span color="grey">Téléphone (optionnel)</Span>}
              value={userData.phone}
              onChange={handleChange("phone")}
              error={liveCheck.phone || signupErrors.phone}
              helperText={liveCheck.phone && "Ce téléphone n'est pas valide"}
              borderColor="gray"
            />

            <BottomButtons
              mt={2}
              type="submit"
              onClick={() => setStep(STEPS[2])}
              label="Suivant"
              disabled={userData.email?.trim() === ""}
              cancelLabel={"Précédent"}
              handleCancel={() => setStep(STEPS[0])}
            />
          </>
        )}

        {step === STEPS[2] && (
          <>
            <Stack
              gap={2}
              width="100%"
              bgcolor="background.main"
              padding="1rem"
              borderRadius="10px"
            >
              <CustomCheckbox
                label="Je suis une entreprise"
                onChange={(e) => setIsCompany(e.target.checked)}
                value={isCompany}
                labelcolor={(theme) => theme.palette.text.white}
                fontSize="1rem"
              />
              {isCompany && (
                <>
                  <CustomFilledInput
                    label="Nom de l'entreprise (optionnel)"
                    value={userData.company}
                    onChange={handleChange("company")}
                  />
                  <CustomFilledInput
                    label="N° TVA intracommunautaire"
                    value={userData.vat_number}
                    onChange={handleChange("vat_number")}
                    error={liveCheck.vat_number || signupErrors.vat_number}
                    helperText={
                      liveCheck.vat_number && "Ce N° TVA n'est pas valide"
                    }
                    placeholder="FRXXXXXXXXXXX"
                  />
                </>
              )}
            </Stack>

            <BottomButtons
              mt={4}
              type="submit"
              onClick={() => {
                if (!isOauth) setStep(STEPS[3])
                else setStep(STEPS[4])
              }}
              label="Suivant"
              disabled={
                liveCheck.vat_number && userData.vat_number?.trim() !== ""
              }
              cancelLabel="Précédent"
              handleCancel={() => setStep(STEPS[1])}
            />
          </>
        )}

        {!isOauth && step === STEPS[3] && (
          <>
            <CustomFilledInput
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

            <BottomButtons
              mt={4}
              type="submit"
              onClick={() => setStep(STEPS[4])}
              label="Suivant"
              disabled={liveCheck.password || userData.password?.trim() === ""}
              cancelLabel="Précédent"
              handleCancel={() => setStep(STEPS[2])}
            />
          </>
        )}

        {step === STEPS[4] && !signupCompleted && (
          <>
            <CustomCheckbox
              label={
                <Span fontSize=".8rem">
                  J'accepte les{" "}
                  <Span sx={{ textDecoration: "underline", fontSize: ".8rem" }}>
                    <InTextLink
                      text="Conditions Générales d'Utilisation"
                      href={`${defaultConfig.webclientUrl}/terms-of-use`}
                      target="_blank"
                    />
                  </Span>{" "}
                  et{" "}
                  <Span sx={{ textDecoration: "underline", fontSize: ".8rem" }}>
                    <InTextLink
                      text="Conditions Générales de Vente"
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

            <BottomButtons
              mt={2}
              type="submit"
              onClick={isOauth ? signUpOauth : signUp}
              label="Créer mon compte"
              disabled={!accept.policy}
              cancelLabel="Précédent"
              handleCancel={() => setStep(STEPS[3])}
            />
          </>
        )}
      </CustomForm>
    </Stack>
  )
}

function OauthBtn({ onClick, bgcolor, src }) {
  return (
    <Stack
      onClick={onClick}
      padding={1.5}
      flexDirection="row"
      gap={2}
      alignItems="center"
      sx={{
        borderRadius: "10px",
        border: "1px solid transparent",
        bgcolor,
        cursor: "pointer",
        "&:hover": {
          border: `1px solid #fff`,
        },
      }}
    >
      <Box component="img" src={src} width="30px" height="30px" margin="auto" />
    </Stack>
  )
}
