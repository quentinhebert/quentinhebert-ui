import { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
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
    service: {
      film: defaultService && defaultService === "film" ? true : false,
      website: defaultService && defaultService === "website" ? true : false,
    },
  }

  const [isFetching, setIsFetching] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    description: false,
    company: false,
    budget: false,
  })

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
  const handleChangeService = (service) => (event) => {
    setFormData({
      ...formData,
      service: {
        ...formData.service,
        [service]: event.target.checked,
      },
    })
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
        padding="1rem"
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
            <Typography color="#fff" letterSpacing={1}>
              Je recherche un <em>freelance</em> pour réaliser un... *
            </Typography>
            <Stack flexDirection="row" gap={4}>
              <CustomCheckbox
                label="Film"
                check={formData.service.film ? "true" : "false"}
                // colors passed as strings otw DOM warnings if objects passed as props
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="Ethereal"
                fontWeight="bold"
                onChange={handleChangeService("film")}
              />
              <CustomCheckbox
                label="Site web"
                check={formData.service.website ? "true" : "false"}
                labelcolor={theme.palette.text.secondary} // label
                checkedcolor={theme.palette.text.secondary} // checked
                checkboxcolor="#fff" // unchecked
                fontFamily="Zacbel X"
                onChange={handleChangeService("website")}
              />
            </Stack>
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
          placeholder={formData.service.film ? "Louis" : "Philippe"}
          value={formData.firstname}
          onChange={handleChange("firstname")}
          error={errors.firstname}
          helperText={errors.firstname && "Veuillez vérifier ce champ"}
        />
        <Input
          type="input"
          id="lastname"
          label="Nom"
          placeholder={formData.service.film ? "Vuitton" : "Etchebest"}
          value={formData.lastname}
          onChange={handleChange("lastname")}
          error={errors.lastname}
          helperText={errors.lastname && "Veuillez vérifier ce champ"}
        />
      </DualInputLine>

      <DualInputLine direction={defaultDirection}>
        <Input
          required
          type="email"
          id="email"
          label="E-mail"
          placeholder={
            formData.service.film ? "loulou@vuitton.com" : "philou@topchef.com"
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
            formData.service.film ? "Louis Vuitton" : "Philippe Etchebest"
          }
          value={formData.company}
          onChange={handleChange("company")}
          error={errors.company}
          helperText={errors.company && "Veuillez vérifier ce champ"}
        />
        <Select
          required
          id="budget"
          value={formData.budget}
          onChange={handleChange("budget")}
          renderValue={
            // Trick for placeholder hiding
            formData.budget !== ""
              ? undefined
              : () => <Typography color="secondary">Mon budget *</Typography>
          }
        >
          {BUDGET_OPTIONS.map((option, key) => (
            <SelectOption value={option} key={key}>
              {option}
            </SelectOption>
          ))}
        </Select>
      </DualInputLine>

      <TextArea
        required
        id="description"
        label="À propos de mon projet..."
        placeholder={
          formData.service.film
            ? formData.service.website
              ? "Film de 2 minutes sur un produit de notre nouvelle collection et landing page pour ce même produit."
              : "Film de 2 minutes sur un produit de notre nouvelle collection."
            : "Site vitrine pour mettre en avant mon nouveau restaurant et ma carte du jour."
        }
        value={formData.description}
        onChange={handleChange("description")}
      />

      <RightSubmitButton onClick={handleSendRequest} disabled={isFetching}>
        {isFetching ? "Envoi en cours" : "Envoyer"}
      </RightSubmitButton>
    </Form>
  )
}

export default withSnacks(ContactForm)
