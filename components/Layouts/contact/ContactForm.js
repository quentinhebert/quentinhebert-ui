import * as React from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { USERTYPES } from "../../../enums/userTypes"
import { checkEmail } from "../../../services/utils"
import theme, { lightTheme } from "../../../config/theme"
import { ThemeProvider } from "styled-components"
import apiCall from "../../../services/apiCalls/apiCall"
import withSnacks from "../../hocs/withSnacks"

// TextField
const CssTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primaryContrast,
  },
  "& label.Mui-focused": {
    color: theme.palette.text.primaryContrast,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.text.primaryContrast,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.text.primaryContrast,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.primaryContrast,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.text.primaryContrast,
    },
  },
})

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

  /********** STYLE **********/
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"))
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <ThemeProvider theme={lightTheme}>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        width="100%"
        component={"form"}
        sx={{
          margin: fullScreen ? "4rem auto 0rem" : "4rem auto 2rem",
          padding: "1rem 0",
          ".MuiOutlinedInput-input": { color: "#000" },
        }}
      >
        <Typography
          alignSelf="end"
          componenent="h1"
          variant="h3"
          color={theme.palette.text.secondary}
          sx={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          Let's create together!
        </Typography>

        <CssTextField
          variant="outlined"
          required
          type="input"
          id="firstname"
          label="Firstname"
          sx={{
            width: sm ? "100%" : "calc(100% - 3rem)",
            borderRadius: "5px",
          }}
          value={clientData.firstname}
          onChange={handleChange("firstname")}
          error={errors.firstname}
          helperText={errors.firstname && "Please check this field"}
        />
        <CssTextField
          required
          type="input"
          id="lastname"
          label="Lastname"
          sx={{
            width: sm ? "100%" : "calc(100% - 3rem)",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
          value={clientData.lastname}
          onChange={handleChange("lastname")}
          error={errors.lastname}
          helperText={errors.lastname && "Please check this field"}
        />
        <CssTextField
          type="input"
          id="company"
          label="Company"
          sx={{
            width: sm ? "100%" : "calc(100% - 3rem)",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
          value={clientData.company}
          onChange={handleChange("company")}
          error={errors.company}
          helperText={errors.company && "Please check this field"}
        />
        <CssTextField
          required
          type="email"
          id="email"
          label="E-mail"
          sx={{
            width: sm ? "100%" : "calc(100% - 3rem)",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
          value={clientData.email}
          onChange={handleChange("email")}
          error={emailError || errors.email}
          helperText={emailError && "This email is not valid"}
        />
        <CssTextField
          type="phone"
          id="phone"
          label="Phone"
          sx={{
            width: sm ? "100%" : "calc(100% - 3rem)",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
          value={clientData.phone}
          onChange={handleChange("phone")}
        />

        <Box sx={{ minWidth: sm ? "100%" : "calc(100% - 3rem)" }}>
          <FormControl
            sx={{
              width: "100%",
              "&:hover": {
                border: "1px solid #000",
                color: "#000 !important",
                borderRadius: "5px",
              },
              ".MuiSelect-select": {
                border: "1px solid #000",
                color: "#000 !important",
              },
              ".MuiOutlinedInput-input": {
                color: "#000 !important",
              },
              ".MuiSelect-iconOutlined": {
                color: "#000 !important",
              },
              ".Mui-focused": {
                border: "2px solid #000",
                color: "#000 !important",
              },
              ".MuiInputLabel-root": {
                border: "none",
                color: "#000 !important",
                backgroundColor: "#fff",
                padding: "0 3px",
              },
            }}
          >
            <InputLabel sx={{ color: "#000" }}>My budget</InputLabel>
            <Select
              variant="outlined"
              value={clientData.budget}
              onChange={handleChange("budget")}
            >
              <MenuItem value="500€ – 1000€">500€ – 1000€</MenuItem>
              <MenuItem value="1000€ – 1500€">1000€ – 1500€</MenuItem>
              <MenuItem value="1500€ – 3000€">1500€ – 3000€</MenuItem>
              <MenuItem value="+3000€">+3000€</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <CssTextField
          required
          label="Give me some details about your project..."
          variant="outlined"
          multiline
          rows={4}
          value={clientData.description}
          onChange={handleChange("description")}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            width: sm ? "100%" : "calc(100% - 3rem)",
          }}
        />

        <Stack sx={{ width: "calc(100% - 3rem)", alignItems: "end" }}>
          <Button
            variant="outlined"
            onClick={handleSendRequest}
            disabled={loadingButton}
            size="large"
            sx={{
              width: "200px",
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: "#FFF",
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: "10px",
              letterSpacing: "1.5px",
              "&:hover": {
                border: `2px solid ${theme.palette.text.secondary}`,
                backgroundColor: (theme) => theme.palette.text.secondary,
                color: "#fff",
              },
            }}
          >
            {loadingButton ? <CircularProgress /> : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default withSnacks(ContactForm)
