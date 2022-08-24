import * as React from "react"
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { USERTYPES } from "../../enums/userTypes"
import { checkEmail } from "../../services/utils"
import theme from "../../config/theme"
import apiCall from "../../services/apiCalls/apiCall"
import withSnacks from "../hocs/withSnacks"
import { styled } from "@mui/system"

/** CONSTANTS **/

const BUDGET_SET = ["500€ - 1000€", "1000€ - 1500€", "1500€ - 3000€", "+3000€"]

/** CSS CUSTOMIZED COMPONENTS **/
const FormContainer = styled((props) => (
  <Stack
    component={"form"}
    alignItems="center"
    justifyContent="center"
    gap={2}
    padding="1rem 0"
    sx={{
      width: { xs: "100%", sm: "80%", md: "60%" },
      margin: { xs: "1rem auto 0", sm: "2rem auto 0" },
      ".MuiFilledInput-input": {
        // color of the input value text
        color: (theme) => theme.palette.text.primary,
      },
      ".MuiOutlinedInput-input": {
        // color of the select value text
        color: (theme) => `${theme.palette.text.primary} !important`,
      },
    }}
    {...props}
  />
))()

const FormInput = styled((props) => (
  <TextField
    size="small"
    variant="filled"
    InputProps={{ disableUnderline: true }}
    sx={{
      width: "100%",
      borderRadius: "5px",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fff",
    color: theme.palette.background.main, // input value
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
  "& .MuiFormLabel-root.Mui-focused.Mui-error": {
    color: "#f44336",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiFilledInput-root.Mui-error": {
    color: "#f44336",
    margin: 0,
    marginLeft: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#fff",
    margin: 0,
  },
}))

const FormTextArea = styled((props) => (
  <FormInput multiline rows={4} {...props} />
))()

const SelectFormControl = styled((props) => (
  <FormControl
    sx={{
      width: "100%",
      ".MuiOutlinedInput-input": {
        color: `${theme.palette.background.main} !important`,
        padding: "0.8rem",
      },
      ".MuiSelect-iconOutlined": {
        color: `${theme.palette.secondary.main} !important`,
      },
      ".Mui-selected": {
        background: "red !important",
      },
    }}
    {...props}
  />
))()

const BudgetSelect = styled((props) => (
  <Select
    size="small"
    displayEmpty
    variant="outlined"
    color="secondary"
    sx={{
      backgroundColor: "#fff", // Overrides the background-color of the select input
    }}
    MenuProps={{
      sx: {
        "&& .Mui-selected": {
          // overrides the color and background-color of the selected option of the select
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) => theme.palette.text.secondaryDark,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.background.secondary,
          },
        },
      },
    }}
    {...props}
  />
))()

const TwoInputLine = styled((props) => (
  <Stack
    sx={{
      width: "100%",
      gap: "1rem",
      flexDirection: { xs: "column", sm: "row" },
    }}
    {...props}
  />
))()

const ButtonContainer = styled((props) => (
  <Stack sx={{ width: "100%", alignItems: "end" }} {...props} />
))()

const SubmitButton = styled((props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      width: "200px",
      color: (theme) => "#fff",
      backgroundColor: "transparent",
      border: `2px solid #fff`,
      borderRadius: "10px",
      letterSpacing: "1.5px",
      "&:hover": {
        border: `2px solid #fff`,
        backgroundColor: "#fff",
        color: theme.palette.secondary.main,
      },
    }}
    {...props}
  />
))()

function ContactForm(props) {
  const { setSeverity, setOpenSnackBar, setMessageSnack } = props
  const [loadingButton, setLoadingButton] = React.useState(false)
  const [errors, setErrors] = React.useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
    description: false,
    company: false,
    budget: false,
  })
  const [clientData, setClientData] = React.useState({
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
      <TwoInputLine>
        <FormInput
          required
          type="input"
          id="firstname"
          label="Prénom"
          value={clientData.firstname}
          onChange={handleChange("firstname")}
          error={errors.firstname}
          helperText={errors.firstname && "Please check this field"}
        />
        <FormInput
          type="input"
          id="lastname"
          label="Nom"
          value={clientData.lastname}
          onChange={handleChange("lastname")}
          error={errors.lastname}
          helperText={errors.lastname && "Please check this field"}
        />
      </TwoInputLine>

      <TwoInputLine>
        <FormInput
          required
          type="email"
          id="email"
          label="E-mail"
          value={clientData.email}
          onChange={handleChange("email")}
          error={emailError || errors.email}
          helperText={emailError && "This email is not valid"}
        />
        <FormInput
          type="phone"
          id="phone"
          label="Téléphone"
          value={clientData.phone}
          onChange={handleChange("phone")}
        />
      </TwoInputLine>

      <TwoInputLine>
        <FormInput
          type="input"
          id="company"
          label="Entreprise"
          value={clientData.company}
          onChange={handleChange("company")}
          error={errors.company}
          helperText={errors.company && "Please check this field"}
        />
        <SelectFormControl>
          <BudgetSelect
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
            {BUDGET_SET.map((budgetSlice, key) => (
              <MenuItem
                value={budgetSlice}
                key={key}
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {budgetSlice}
              </MenuItem>
            ))}
          </BudgetSelect>
        </SelectFormControl>
      </TwoInputLine>

      <FormTextArea
        required
        id="description"
        label="Dites-m'en plus à propos de votre projet..."
        value={clientData.description}
        onChange={handleChange("description")}
      />

      <ButtonContainer>
        <SubmitButton onClick={handleSendRequest} disabled={loadingButton}>
          {loadingButton ? <CircularProgress /> : "Envoyer"}
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  )
}

export default withSnacks(ContactForm)
