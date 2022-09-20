import { useState } from "react"
import { Box, FormHelperText, Stack, Typography } from "@mui/material"
import { checkEmail } from "../../services/utils"
import apiCall from "../../services/apiCalls/apiCall"
import withSnacks from "../hocs/withSnacks"
import Input from "../ReusableComponents/forms/custom-filled-input"
import TextArea from "../ReusableComponents/forms/custom-filled-text-area"
import DualInputLine from "../ReusableComponents/forms/responsive-dual-input-container"
import RightSubmitButton from "../ReusableComponents/forms/right-submit-button"
import Select from "../ReusableComponents/forms/custom-filled-select"
import SelectOption from "../ReusableComponents/forms/custom-select-option"
import Form from "../ReusableComponents/forms/custom-form"
import CustomCheckbox from "../ReusableComponents/forms/custom-checkbox"
import styles from "../../styles/WordsCaroussel.module.css"
import theme from "../../config/theme"

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
  <Typography
    color="#fff"
    flexGrow={1}
    textAlign="right"
    sx={{
      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
      letterSpacing: { xs: 1.5, sm: 2, md: 2 },
    }}
  >
    Je recherche un{" "}
    <Box
      component="span"
      sx={{ color: (theme) => theme.palette.text.secondary }}
    >
      {defaultService === "film" && (
        <Stack className={styles.scroller}>
          <Box className={styles.wrapper}>
            {jobs.filmmaker.map((job, key) => (
              <Box key={key}>{job}</Box>
            ))}
          </Box>
        </Stack>
      )}
      {defaultService === "website" && (
        <Stack className={styles.scroller}>
          <Box className={styles.wrapper}>
            {jobs.developper.map((job, key) => (
              <Box key={key}>{job}</Box>
            ))}
          </Box>
        </Stack>
      )}
    </Box>
  </Typography>
)

function ContactForm(props) {
  const {
    defaultService,
    defaultDirection,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props

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
    setSeverity("success")
    setMessageSnack("Reçu 5/5 ! 💬")
    setOpenSnackBar("true")
    handleResetForm()
  }
  const handleError = () => {
    setSeverity("error")
    setMessageSnack("Une erreur est survenue lors de l'envoi 🙁")
    setOpenSnackBar("true")
  }
  const handleSendRequest = async () => {
    const { errorsCount } = checkRequiredFields()
    if (errorsCount > 0) return // We don't send the request if missing fields
    setIsFetching(true)
    const res = await apiCall.unauthenticated.sendContactForm(formData)
    if (res && res.ok) handleSuccess()
    else handleError()
    setIsFetching(false)
  }

  /********** VARAIABLES FOR LIVE CHECK **********/
  const emailError =
    errors.email ||
    (formData.email.trim() !== "" && !checkEmail(formData.email))

  return (
    <Form width="100%">
      <Stack
        width="100%"
        alignItems="center"
        padding="1rem 1rem 1rem 0"
        borderRadius="5px"
        flexDirection="row"
        sx={{
          background: (theme) =>
            `linear-gradient(100deg, transparent 20%, ${theme.palette.background.main} 100%)`,
        }}
      >
        {!defaultService ||
        (defaultService !== "film" && defaultService !== "website") ? (
          <Stack>
            <Typography
              color={errors.services ? "error.main" : "#fff"}
              letterSpacing={1}
            >
              Je recherche un <em>freelance</em> pour réaliser un... *
            </Typography>
            <Stack flexDirection="row" gap={4}>
              <CustomCheckbox
                label="Film"
                check={formData.services.film ? "true" : "false"}
                // colors passed as strings otw DOM warnings if objects passed as props
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="Ethereal"
                fontWeight="bold"
                onChange={handleChangeServices("film")}
              />
              <CustomCheckbox
                label="Site web"
                check={formData.services.website ? "true" : "false"}
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="Zacbel X"
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

      <DualInputLine direction={defaultDirection}>
        <Input
          required
          type="input"
          id="firstname"
          label="Prénom"
          placeholder={formData.services.film ? "Louis" : "Philippe"}
          value={formData.firstname}
          onChange={handleChange("firstname")}
          error={errors.firstname}
          helperText={errors.firstname && "Veuillez remplir ce champ"}
        />
        <Input
          type="input"
          id="lastname"
          label="Nom"
          placeholder={formData.services.film ? "Vuitton" : "Etchebest"}
          value={formData.lastname}
          onChange={handleChange("lastname")}
          error={errors.lastname}
          helperText={errors.lastname && "Veuillez remplir ce champ"}
        />
      </DualInputLine>

      <DualInputLine direction={defaultDirection}>
        <Input
          required
          type="email"
          id="email"
          label="E-mail"
          placeholder={
            formData.services.film ? "loulou@vuitton.com" : "philou@topchef.com"
          }
          value={formData.email}
          onChange={handleChange("email")}
          error={emailError || errors.email}
          helperText={emailError && "This email is not valid"}
        />
        <Input
          type="phone"
          id="phone"
          label="Téléphone"
          placeholder="06XXXXXXXX"
          value={formData.phone}
          onChange={handleChange("phone")}
        />
      </DualInputLine>

      <DualInputLine direction={defaultDirection}>
        <Input
          type="input"
          id="company"
          label="Entreprise"
          placeholder={
            formData.services.film ? "Louis Vuitton" : "Philippe Etchebest"
          }
          value={formData.company}
          onChange={handleChange("company")}
          error={errors.company}
          helperText={errors.company && "Veuillez remplir ce champ"}
        />
        <Stack>
          <Select
            required
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
                      Mon budget *
                    </Typography>
                  )
            }
          >
            {BUDGET_OPTIONS.map((option, key) => (
              <SelectOption value={option} key={key}>
                {option}
              </SelectOption>
            ))}
          </Select>
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
        <TextArea
          required
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

      <RightSubmitButton onClick={handleSendRequest} disabled={isFetching}>
        {isFetching ? "Envoi en cours" : "Envoyer"}
      </RightSubmitButton>
    </Form>
  )
}

export default withSnacks(ContactForm)
