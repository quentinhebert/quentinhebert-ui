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
import Span from "../Text/span"
import translations from "../../services/translation"

/** CONSTANTS **/
const BUDGET_OPTIONS = [
  "500€ - 1000€",
  "1000€ - 1500€",
  "1500€ - 3000€",
  "+3000€",
]

const WordCaroussel = ({ defaultService }) => {
  const { lang } = useContext(AppContext)
  return (
    <BodyText>
      {translations.contact.wordCarousel.text[lang]}{" "}
      <Box
        component="div"
        display="inline"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        {defaultService === "film" && (
          <Stack className={styles.scroller}>
            <Box className={styles.wrapper}>
              {translations.contact.wordCarousel.words.films[lang].map(
                (job, key) => (
                  <Box key={key}>{job} ?</Box>
                )
              )}
            </Box>
          </Stack>
        )}
        {defaultService === "website" && (
          <Stack className={styles.scroller}>
            <Box className={styles.wrapper}>
              {translations.contact.wordCarousel.words.websites[lang].map(
                (job, key) => (
                  <Box key={key}>{job} ?</Box>
                )
              )}
            </Box>
          </Stack>
        )}
      </Box>
    </BodyText>
  )
}
const OptionalLabel = () => {
  const { lang } = useContext(AppContext)
  return (
    <Span color="grey" fontStyle="italic">
      ({translations.contact.optional[lang]})
    </Span>
  )
}

export default function ContactForm({
  showServicesBoxes,
  defaultService,
  defaultDirection,
}) {
  const { setSnackSeverity, setSnackMessage, lang } = useContext(AppContext)

  const PLACEHOLDERS = {
    firstname: {
      default: {
        fr: "Nikos",
        en: "Bear",
      },
      film: {
        fr: "Louis",
        en: "Louis",
      },
      website: {
        fr: "Philippe",
        en: "Levi",
      },
    },
    lastname: {
      default: {
        fr: "Aliagas",
        en: "Grylls",
      },
      film: {
        fr: "Vuitton",
        en: "Vuitton",
      },
      website: {
        fr: "Etchebest",
        en: "Strauss",
      },
    },
    email: {
      default: {
        fr: "thevoice@tf1.fr",
        en: "man.vs.wild@channel4.com",
      },
      film: {
        fr: "marketting@lvmh.com",
        en: "marketting@lvmh.com",
      },
      website: {
        fr: "philou@topchef.com",
        en: "billiejean@levis.com",
      },
    },
    company: {
      default: {
        fr: "TELEVISION FRANCAISE 1 (TF1)",
        en: "Discovery Channel",
      },
      film: {
        fr: "LVMH MOET HENNESSY LOUIS VUITTON",
        en: "LVMH MOET HENNESSY LOUIS VUITTON",
      },
      website: {
        fr: "Philippe Etchebest Corporation",
        en: "Levi Strauss & Co.",
      },
    },
    description: {
      default: {
        fr: "Bonjour, j'aurais besoin d'un réalisateur pour ma nouvelle émission The Silence. Nous aurions également besoin d'un site web sur lequel l'audience pourrait voter en direct pour le candidat le plus silencieux.",
        en: "Hi there, I will need a camera operator and a director for the next season of Man vs. Wild, as well as a brand new landing page to promote the next season. Would you be available for a quick call ? Best regards.",
      },
      film: {
        fr: "Film de 2 minutes sur un produit de notre nouvelle collection.",
        en: "A two-minute-movie around a product of our new collection.",
      },
      website: {
        fr: "Site vitrine pour mettre en avant mon nouveau restaurant et ma carte du jour.",
        en: "Hello, we are contacting you beacause we need a new website for France. We are about to separate every  single version of our global website in order to propose very singular and distinct artistic directions. Looking forward from hearing from you.",
      },
    },
  }

  const initialFormData = {
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    services: {
      film: !!defaultService && defaultService === "film",
      website: !!defaultService && defaultService === "website",
    },
  }
  const requiredFields = ["firstname", "email", "description"]

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

  let selectedService = "default"
  if (formData.services.film && !formData.services.website)
    selectedService = "film"
  if (!formData.services.film && formData.services.website)
    selectedService = "website"

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
    setSnackMessage(translations.contact.snackMsg.success[lang])
    handleResetForm()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage(translations.contact.snackMsg.error[lang])
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
        {showServicesBoxes ||
        (defaultService !== "film" && defaultService !== "website") ? (
          <Stack>
            <Typography
              color={errors.services ? "error.main" : "#fff"}
              letterSpacing={1}
            >
              {translations.contact.products.label[lang]}
            </Typography>

            <Stack flexDirection="row" gap={4}>
              <CustomCheckbox
                label={translations.contact.products.film[lang]}
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
                label={translations.contact.products.website[lang]}
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
                {translations.contact.helperTexts.checkbox[lang]}
              </FormHelperText>
            )}
          </Stack>
        ) : (
          <WordCaroussel defaultService={defaultService} />
        )}
      </Stack>

      <Stack width="100%" alignItems="end" marginBottom={2}>
        <BodyText preventTransition gap={2} display="flex">
          {translations.contact.annotation[lang]}{" "}
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
            label={translations.contact.firstname.label[lang]}
            placeholder={PLACEHOLDERS.firstname[selectedService][lang]}
            value={formData.firstname}
            onChange={handleChange("firstname")}
            error={errors.firstname}
            helperText={errors.firstname && "Veuillez remplir ce champ"}
          />
          <CustomFilledInput
            type="input"
            id="lastname"
            label={
              <>
                {translations.contact.lastname.label[lang]} <OptionalLabel />
              </>
            }
            placeholder={PLACEHOLDERS.lastname[selectedService][lang]}
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
            label={translations.contact.email.label[lang]}
            placeholder={PLACEHOLDERS.email[selectedService][lang]}
            value={formData.email}
            onChange={handleChange("email")}
            error={emailError || errors.email}
            helperText={emailError && "This email is not valid"}
          />
          <CustomFilledInput
            type="phone"
            id="phone"
            label={
              <>
                {translations.contact.phone.label[lang]} <OptionalLabel />
              </>
            }
            placeholder="06XXXXXXXX"
            value={formData.phone}
            onChange={handleChange("phone")}
          />
        </DualInputLine>

        <DualInputLine direction={defaultDirection}>
          <CustomFilledInput
            type="input"
            id="company"
            label={
              <>
                {translations.contact.company.label[lang]} <OptionalLabel />
              </>
            }
            placeholder={PLACEHOLDERS.company[selectedService][lang]}
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
                      <Typography color="secondary">
                        {translations.contact.budget[lang]} <OptionalLabel />
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
          </Stack>
        </DualInputLine>

        <Stack width="100%">
          <CustomFilledTextArea
            id="description"
            label={translations.contact.description.label[lang]}
            placeholder={PLACEHOLDERS.description[selectedService][lang]}
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
        {isFetching
          ? translations.contact.btn.processing[lang]
          : translations.contact.btn.submit[lang]}
        <SendIcon />
      </RightSubmitButton>
    </CustomForm>
  )
}
