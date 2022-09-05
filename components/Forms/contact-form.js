import { useState } from "react"
import { Stack, Typography } from "@mui/material"
import { USERTYPES } from "../../enums/userTypes"
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
import CenteredMaxWidthContainer from "../ReusableComponents/containers/centered-max-width-container"
import CustomCheckbox from "../ReusableComponents/forms/custom-checkbox"

/** CONSTANTS **/

const BUDGET_OPTIONS = [
  "500€ - 1000€",
  "1000€ - 1500€",
  "1500€ - 3000€",
  "+3000€",
]

function ContactForm(props) {
  const { defaultService } = props

  const { setSeverity, setOpenSnackBar, setMessageSnack } = props
  const [loadingButton, setLoadingButton] = useState(false)
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
    description: false,
    company: false,
    budget: false,
  })
  const [clientData, setClientData] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    type: USERTYPES.CLIENT,
    description: "",
    budget: "",
    service: {
      film: defaultService && defaultService === "film" ? true : false,
      website: defaultService && defaultService === "website" ? true : false,
    },
  })

  /********** HANDLERS **********/
  const handleChange = (attribute) => (event) => {
    setClientData({
      ...clientData,
      [attribute]: event.target.value,
    })
    // On change we reset th localError of the input value, we let the live check take over
    setErrors({
      ...errors,
      [attribute]: false,
    })
  }
  const handleChangeService = (service) => (event) => {
    setClientData({
      ...clientData,
      service: {
        ...clientData.service,
        [service]: event.target.checked,
      },
    })
  }
  const handleSuccess = () => {
    setSeverity("success")
    setMessageSnack("Your message has been sent successfully.")
    setOpenSnackBar("true")
  }
  const handleError = () => {
    setSeverity("error")
    setMessageSnack("An error occurred while sending the contact form.")
    setOpenSnackBar("true")
  }
  const handleResetForm = () => {
    setClientData({
      firstname: "",
      lastname: "",
      company: "",
      email: "",
      phone: "",
      type: USERTYPES.CLIENT,
      description: "",
      budget: null,
      service: {
        film: defaultService && defaultService === "film" ? true : false,
        website: defaultService && defaultService === "website" ? true : false,
      },
    })
  }
  const handleSendRequest = async () => {
    // const res = await apiCall.unauthenticated.sendContactForm(clientData)
    // if (res && res.ok) {
    //   handleSuccess()
    //   handleResetForm()
    // } else {
    //   handleError()
    // }
    console.log(clientData)
  }

  /********** VARAIABLES FOR LIVE CHECK **********/
  const emailError =
    errors.email ||
    (clientData.email.trim() !== "" && !checkEmail(clientData.email))

  return (
    <CenteredMaxWidthContainer marginTop="2rem">
      <Form>
        <Stack
          sx={{
            width: "100%",
            flexDirection: { xs: "column", lg: "row" },
            background: (theme) =>
              `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,0.9) 80%)`,
            padding: "1rem",
            borderRadius: "5px",
          }}
          alignItems="center"
        >
          {!defaultService ||
          (defaultService !== "film" && defaultService !== "website") ? (
            <>
              <Typography
                color="#fff"
                flexGrow={1}
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  letterSpacing: { xs: 1.5, sm: 2, md: 2 },
                }}
              >
                Je recherche un <em>freelance</em> pour réaliser un... *
              </Typography>
              <Stack flexDirection="row" gap={4}>
                <CustomCheckbox
                  label="Film"
                  check={clientData.service.film ? "true" : "false"}
                  labelcolor={(theme) => theme.palette.text.secondary} // label
                  checkedcolor={(theme) => theme.palette.text.secondary} // checked
                  checkboxcolor="#fff" // unchecked
                  fontFamily="Ethereal"
                  fontWeight="bold"
                  onChange={handleChangeService("film")}
                />
                <CustomCheckbox
                  label="Site web"
                  check={clientData.service.website ? "true" : "false"}
                  labelcolor={(theme) => theme.palette.text.secondary} // label
                  checkedcolor={(theme) => theme.palette.text.secondary} // checked
                  checkboxcolor="#fff" // unchecked
                  fontFamily="Zacbel X"
                  onChange={handleChangeService("website")}
                />
              </Stack>
            </>
          ) : (
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
              <em>
                {defaultService === "film" && "vidéaste"}
                {defaultService === "website" && "développeur"} freelance
              </em>
              ...
            </Typography>
          )}
        </Stack>

        <DualInputLine>
          <Input
            required
            type="input"
            id="firstname"
            label="Prénom"
            placeholder={clientData.service.film ? "Louis" : "Philippe"}
            value={clientData.firstname}
            onChange={handleChange("firstname")}
            error={errors.firstname}
            helperText={errors.firstname && "Please check this field"}
          />
          <Input
            type="input"
            id="lastname"
            label="Nom"
            placeholder={clientData.service.film ? "Vuitton" : "Etchebest"}
            value={clientData.lastname}
            onChange={handleChange("lastname")}
            error={errors.lastname}
            helperText={errors.lastname && "Please check this field"}
          />
        </DualInputLine>

        <DualInputLine>
          <Input
            required
            type="email"
            id="email"
            label="E-mail"
            placeholder={
              clientData.service.film
                ? "loulou@vuitton.com"
                : "philou@topchef.com"
            }
            value={clientData.email}
            onChange={handleChange("email")}
            error={emailError || errors.email}
            helperText={emailError && "This email is not valid"}
          />
          <Input
            type="phone"
            id="phone"
            label="Téléphone"
            placeholder="06XXXXXXXX"
            value={clientData.phone}
            onChange={handleChange("phone")}
          />
        </DualInputLine>

        <DualInputLine>
          <Input
            type="input"
            id="company"
            label="Entreprise"
            placeholder={
              clientData.service.film ? "Louis Vuitton" : "Philippe Etchebest"
            }
            value={clientData.company}
            onChange={handleChange("company")}
            error={errors.company}
            helperText={errors.company && "Please check this field"}
          />
          <Select
            required
            id="budget"
            value={clientData.budget}
            onChange={handleChange("budget")}
            renderValue={
              // Trick for placeholder hiding
              clientData.budget !== ""
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
            clientData.service.film
              ? clientData.service.website
                ? "Film de 2 minutes sur un produit de notre nouvelle collection et landing page pour ce même produit."
                : "Film de 2 minutes sur un produit de notre nouvelle collection."
              : "Site vitrine pour mettre en avant mon nouveau restaurant et ma carte du jour."
          }
          value={clientData.description}
          onChange={handleChange("description")}
        />

        <RightSubmitButton onClick={handleSendRequest} disabled={loadingButton}>
          {loadingButton ? <CircularProgress /> : "Envoyer"}
        </RightSubmitButton>
      </Form>
    </CenteredMaxWidthContainer>
  )
}

export default withSnacks(ContactForm)
