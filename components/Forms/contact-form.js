import { useContext, useState } from "react"
import { Box, FormHelperText, Stack, Typography } from "@mui/material"
import { checkEmail } from "../../services/utils"
import apiCall from "../../services/apiCalls/apiCall"
import styles from "../../styles/WordsCaroussel.module.css"
import theme from "../../config/theme"
import { AppContext } from "../../contexts/AppContext"
import CustomFilledInput from "../Inputs/custom-filled-input"
import CustomFilledTextArea from "../Inputs/custom-filled-text-area"
import CustomForm from "./custom-form"
import DualInputLine from "../Containers/dual-input-line"
import RightSubmitButton from "../Buttons/right-submit-button"
import CustomFilledSelect from "../Inputs/custom-filled-select"
import CustomSelectOption from "../Inputs/custom-select-option"
import CustomCheckbox from "../Inputs/custom-checkbox"
import BodyText from "../Text/body-text"
import RedoRoundedIcon from "@mui/icons-material/RedoRounded"
import SendIcon from "@mui/icons-material/Send"

/** CONSTANTS **/

const BUDGET_OPTIONS = [
  "500€ - 1000€",
  "1000€ - 1500€",
  "1500€ - 3000€",
  "+3000€",
]
const jobs = {
  filmmaker: ["vidéaste", "réalisateur", "cadreur", "monteur"],
  developper: [
    "développeur front-end",
    "développeur back-end",
    "web-designer",
    "mec super sympa",
  ],
}

const WordCaroussel = ({ defaultService }) => (
  <BodyText>
    ...et vous cherchez un{" "}
    <Box
      component="div"
      display="inline"
      sx={{ color: (theme) => theme.palette.text.secondary }}
    >
      {defaultService === "film" && (
        <Stack className={styles.scroller}>
          <Box className={styles.wrapper}>
            {jobs.filmmaker.map((job, key) => (
              <Box key={key}>{job} ?</Box>
            ))}
          </Box>
        </Stack>
      )}
      {defaultService === "website" && (
        <Stack className={styles.scroller}>
          <Box className={styles.wrapper}>
            {jobs.developper.map((job, key) => (
              <Box key={key}>{job} ?</Box>
            ))}
          </Box>
        </Stack>
      )}
    </Box>
  </BodyText>
)

export default function ContactForm(props) {
  const { defaultService, defaultDirection } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialFormData = {
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    services: {
      film: defaultService && defaultService === "film" ? true : false,
      website: defaultService && defaultService === "website" ? true : false,
    },
  }
  const requiredFields = ["firstname", "email", "budget", "description"]

  const initialErrors = {
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    description: false,
    company: false,
    budget: false,
    services: false,
  }

  const [isFetching, setIsFetching] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrors)

  /********** HANDLERS **********/
  const handleResetForm = () => {
    setFormData(initialFormData)
  }
  const handleChange = (attribute) => (event) => {
    setFormData({
      ...formData,
      [attribute]: event.target.value,
    })
    // On change : we reset the localError of the input value, we let the live check take over
    setErrors({
      ...errors,
      [attribute]: false,
    })
  }
  const handleChangeServices = (service) => (event) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: event.target.checked,
      },
    })
  }
  const checkRequiredFields = () => {
    const localErrors = initialErrors
    requiredFields.map((field) => {
      if (formData[field].trim() === "") {
        localErrors[field] = true
      }
    })
    // Special check for the services
    if (!formData.services.film && !formData.services.website)
      localErrors.services = true
    // If at least one error, then we don't send the request
    let errorsCount = Object.values(localErrors).filter(
      (err) => err === true
    ).length
    setErrors(localErrors) // Update errors helper texts
    return { errorsCount }
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Reçu 5/5 ! 💬")
    handleResetForm()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue lors de l'envoi 🙁")
  }
  const handleSendRequest = async () => {
    const { errorsCount } = checkRequiredFields()
    if (errorsCount > 0) return // We don't send the request if missing fields
    setIsFetching(true)
    const res = await apiCall.application.contact.sendForm(formData)
    if (res && res.ok) handleSuccess()
    else handleError()
    setIsFetching(false)
  }

  /********** VARAIABLES FOR LIVE CHECK **********/
  const emailError =
    errors.email ||
    (formData.email.trim() !== "" && !checkEmail(formData.email))

  return (
    <CustomForm width="100%" gap={2} paddingBottom="1.5rem">
      <Stack
        width="100%"
        alignItems="center"
        padding="1rem 1rem 1rem 0"
        borderRadius="5px"
        flexDirection="row"
      >
        {!defaultService ||
        (defaultService !== "film" && defaultService !== "website") ? (
          <Stack>
            <Typography
              color={errors.services ? "error.main" : "#fff"}
              letterSpacing={1}
            >
              Vous cherchez un <em>freelance</em> pour réaliser un... *
            </Typography>

            <Stack flexDirection="row" gap={4}>
              <CustomCheckbox
                label="Film"
                checked={formData.services.film}
                // colors passed as strings otw DOM warnings if objects passed as props
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="kardust"
                fontSize="1.5rem"
                fontWeight="bold"
                onChange={handleChangeServices("film")}
              />
              <CustomCheckbox
                label="Site web"
                checked={formData.services.website}
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="kardust"
                fontSize="1.5rem"
                onChange={handleChangeServices("website")}
              />
            </Stack>
            {errors.services && (
              <FormHelperText
                margin="0"
                sx={{ color: (theme) => theme.palette.error.main }}
              >
                Veuillez cocher au moins une case
              </FormHelperText>
            )}
          </Stack>
        ) : (
          <WordCaroussel defaultService={defaultService} />
        )}
      </Stack>

      <Stack width="100%" alignItems="end" marginBottom={2}>
        <BodyText preventTransition gap={2} display="flex">
          Laissez-moi un message{" "}
          <RedoRoundedIcon
            sx={{ rotate: "45deg", margin: ".2rem .2rem 0 0" }}
          />
        </BodyText>
      </Stack>

      <Stack width="100%" sx={{ gap: { xs: 1, md: 2 } }}>
        <DualInputLine direction={defaultDirection}>
          <CustomFilledInput
            type="input"
            id="firstname"
            label="Prénom"
            placeholder={formData.services.film ? "Louis" : "Philippe"}
            value={formData.firstname}
            onChange={handleChange("firstname")}
            error={errors.firstname}
            helperText={errors.firstname && "Veuillez remplir ce champ"}
          />
          <CustomFilledInput
            type="input"
            id="lastname"
            label="Nom (Optionnel)"
            placeholder={formData.services.film ? "Vuitton" : "Etchebest"}
            value={formData.lastname}
            onChange={handleChange("lastname")}
            error={errors.lastname}
            helperText={errors.lastname && "Veuillez remplir ce champ"}
          />
        </DualInputLine>

        <DualInputLine direction={defaultDirection}>
          <CustomFilledInput
            type="email"
            id="email"
            label="E-mail"
            placeholder={
              formData.services.film
                ? "loulou@vuitton.com"
                : "philou@topchef.com"
            }
            value={formData.email}
            onChange={handleChange("email")}
            error={emailError || errors.email}
            helperText={emailError && "This email is not valid"}
          />
          <CustomFilledInput
            type="phone"
            id="phone"
            label="Téléphone (Optionnel)"
            placeholder="06XXXXXXXX"
            value={formData.phone}
            onChange={handleChange("phone")}
          />
        </DualInputLine>

        <DualInputLine direction={defaultDirection}>
          <CustomFilledInput
            type="input"
            id="company"
            label="Entreprise (Optionnel)"
            placeholder={
              formData.services.film ? "Louis Vuitton" : "Philippe Etchebest"
            }
            value={formData.company}
            onChange={handleChange("company")}
            error={errors.company}
            helperText={errors.company && "Veuillez remplir ce champ"}
          />
          <Stack width="100%">
            <CustomFilledSelect
              id="budget"
              value={formData.budget}
              onChange={handleChange("budget")}
              renderValue={
                // Trick for placeholder hiding
                formData.budget !== ""
                  ? undefined
                  : () => (
                      <Typography
                        color={errors.budget ? "error.main" : "secondary"}
                      >
                        Mon budget
                      </Typography>
                    )
              }
            >
              {BUDGET_OPTIONS.map((option, key) => (
                <CustomSelectOption value={option} key={key}>
                  {option}
                </CustomSelectOption>
              ))}
            </CustomFilledSelect>
            {errors.budget && (
              <FormHelperText
                margin={0}
                sx={{ color: (theme) => theme.palette.error.main }}
              >
                Veuillez sélectionner votre budget
              </FormHelperText>
            )}
          </Stack>
        </DualInputLine>

        <Stack width="100%">
          <CustomFilledTextArea
            id="description"
            label="À propos de mon projet..."
            placeholder={
              formData.services.film
                ? formData.services.website
                  ? "Film de 2 minutes sur un produit de notre nouvelle collection et landing page pour ce même produit."
                  : "Film de 2 minutes sur un produit de notre nouvelle collection."
                : "Site vitrine pour mettre en avant mon nouveau restaurant et ma carte du jour."
            }
            value={formData.description}
            onChange={handleChange("description")}
            sx={{
              "& .MuiInputLabel-root": {
                color: errors.description
                  ? (theme) => theme.palette.error.main
                  : (theme) => theme.palette.text.secondary,
              },
            }}
          />
          {errors.budget && (
            <FormHelperText
              margin={0}
              sx={{ color: (theme) => theme.palette.error.main }}
            >
              Veuillez remplir ce champ
            </FormHelperText>
          )}
        </Stack>
      </Stack>

      <RightSubmitButton onClick={handleSendRequest} disabled={isFetching}>
        {isFetching ? "Envoi en cours" : "Envoyer"}
        <SendIcon />
      </RightSubmitButton>
    </CustomForm>
  )
}
