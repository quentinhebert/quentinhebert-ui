import * as React from "react"
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { USERTYPES } from "../../enums/userTypes"
import { checkEmail } from "../../services/utils"
import theme from "../../config/theme"
import apiCall from "../../services/apiCalls/apiCall"
import withSnacks from "../hocs/withSnacks"
import { styled } from "@mui/material/styles"

const CssTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
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
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={2}
      component={"form"}
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%" },
        margin: { xs: "1rem auto 0", sm: "4rem auto 0" },
        padding: "1rem 0",
        ".MuiOutlinedInput-input": { color: "#000" },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CssTextField
          size="small"
          variant="filled"
          required
          type="input"
          id="firstname"
          label="Prénom"
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
          value={clientData.firstname}
          onChange={handleChange("firstname")}
          error={errors.firstname}
          helperText={errors.firstname && "Please check this field"}
        />
        <CssTextField
          required
          variant="filled"
          size="small"
          type="input"
          id="lastname"
          label="Nom"
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
          value={clientData.lastname}
          onChange={handleChange("lastname")}
          error={errors.lastname}
          helperText={errors.lastname && "Please check this field"}
        />
      </Stack>

      <Stack
        sx={{
          width: "100%",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CssTextField
          required
          variant="filled"
          size="small"
          type="email"
          id="email"
          label="E-mail"
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
          value={clientData.email}
          onChange={handleChange("email")}
          error={emailError || errors.email}
          helperText={emailError && "This email is not valid"}
        />
        <CssTextField
          variant="filled"
          size="small"
          type="phone"
          id="phone"
          label="Téléphone"
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
          value={clientData.phone}
          onChange={handleChange("phone")}
        />
      </Stack>

      <Stack
        sx={{
          width: "100%",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CssTextField
          variant="filled"
          type="input"
          id="company"
          label="Entreprise"
          sx={{
            width: "100%",
            borderRadius: "5px",
          }}
          value={clientData.company}
          onChange={handleChange("company")}
          error={errors.company}
          helperText={errors.company && "Please check this field"}
        />
        <Stack sx={{ width: "100%" }}>
          <FormControl
            sx={{
              width: "100%",
              ".MuiSelect-select": {
                color: `${theme.palette.background.main} !important`,
              },
              ".MuiOutlinedInput-input": {
                color: `${theme.palette.background.main} !important`,
              },
              ".MuiSelect-iconOutlined": {
                color: `${theme.palette.secondary.main} !important`,
              },
              ".MuiInputLabel-root": {
                border: "none",
                color: `${theme.palette.secondary.main} !important`,
              },
            }}
          >
            <Select
              required
              displayEmpty
              variant="outlined"
              value={clientData.budget}
              onChange={handleChange("budget")}
              renderValue={
                // Trick for placeholder hiding
                clientData.budget !== ""
                  ? undefined
                  : () => (
                      <Typography color="secondary">Mon budget *</Typography>
                    )
              }
              sx={{
                backgroundColor: "#fff",
              }}
            >
              <MenuItem value="500€ – 1000€">500€ – 1000€</MenuItem>
              <MenuItem value="1000€ – 1500€">1000€ – 1500€</MenuItem>
              <MenuItem value="1500€ – 3000€">1500€ – 3000€</MenuItem>
              <MenuItem value="+3000€">+3000€</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <CssTextField
        required
        label="Dites-m'en plus à propos de votre projet..."
        variant="filled"
        multiline
        rows={4}
        value={clientData.description}
        onChange={handleChange("description")}
        sx={{
          borderRadius: "5px",
          width: "100%",
        }}
      />

      <Stack sx={{ width: "100%", alignItems: "end" }}>
        <Button
          variant="outlined"
          onClick={handleSendRequest}
          disabled={loadingButton}
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
        >
          {loadingButton ? <CircularProgress /> : "Envoyer"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default withSnacks(ContactForm)
