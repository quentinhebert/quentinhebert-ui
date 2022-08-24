import { useState } from "react"
import { MenuItem, Stack, Typography } from "@mui/material"
import { USERTYPES } from "../../enums/userTypes"
import { checkEmail } from "../../services/utils"
import apiCall from "../../services/apiCalls/apiCall"
import withSnacks from "../hocs/withSnacks"
import { styled } from "@mui/system"
import Input from "../ReusableComponents/forms/custom-filled-input"
import TextArea from "../ReusableComponents/forms/custom-filled-text-area"
import DualInputLine from "../ReusableComponents/forms/responsive-dual-input-container"
import RightSubmitButton from "../ReusableComponents/forms/right-submit-button"
import Select from "../ReusableComponents/forms/custom-filled-select"
import SelectOption from "../ReusableComponents/forms/custom-select-option"
import Form from "../ReusableComponents/forms/custom-form"

/** CONSTANTS **/

const BUDGET_OPTIONS = [
  "500€ - 1000€",
  "1000€ - 1500€",
  "1500€ - 3000€",
  "+3000€",
]

/** CSS CUSTOMIZED COMPONENTS **/
const FormContainer = styled((props) => (
  <Stack
    padding="1rem 0"
    sx={{
      width: { xs: "100%", sm: "80%", md: "60%" },
      margin: { xs: "1rem auto 0", sm: "2rem auto 0" },
    }}
    {...props}
  />
))()

function ContactForm(props) {
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
    })
  }
  const handleSendRequest = async () => {
    const res = await apiCall.unauthenticated.sendContactForm(clientData)
    if (res && res.ok) {
      handleSuccess()
      handleResetForm()
    } else {
      handleError()
    }
  }

  /********** VARAIABLES FOR LIVE CHECK **********/
  const emailError =
    errors.email ||
    (clientData.email.trim() !== "" && !checkEmail(clientData.email))

  return (
    <FormContainer>
      <Form>
        <DualInputLine>
          <Input
            required
            type="input"
            id="firstname"
            label="Prénom"
            value={clientData.firstname}
            onChange={handleChange("firstname")}
            error={errors.firstname}
            helperText={errors.firstname && "Please check this field"}
          />
          <Input
            type="input"
            id="lastname"
            label="Nom"
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
            value={clientData.email}
            onChange={handleChange("email")}
            error={emailError || errors.email}
            helperText={emailError && "This email is not valid"}
          />
          <Input
            type="phone"
            id="phone"
            label="Téléphone"
            value={clientData.phone}
            onChange={handleChange("phone")}
          />
        </DualInputLine>

        <DualInputLine>
          <Input
            type="input"
            id="company"
            label="Entreprise"
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
          label="Dites-m'en plus à propos de votre projet..."
          value={clientData.description}
          onChange={handleChange("description")}
        />

        <RightSubmitButton onClick={handleSendRequest} disabled={loadingButton}>
          {loadingButton ? <CircularProgress /> : "Envoyer"}
        </RightSubmitButton>
      </Form>
    </FormContainer>
  )
}

export default withSnacks(ContactForm)
