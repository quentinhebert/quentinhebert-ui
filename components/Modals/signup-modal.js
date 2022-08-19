import * as React from "react";
import {
  Dialog,
  TextField,
  Stack,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import apiCall from "../../services/apiCalls/apiCall";
import theme from "../../config/theme";
import { USERTYPES } from "../../enums/userTypes";
import { ModalTitle } from "./Modal-Components/modal-title";
import { ActionButtons } from "./Modal-Components/modal-action-buttons";
import { checkPhone, checkEmail, checkPassword } from "../../services/utils";
import AlertInfo from "../Other/alert-info";
import CustomSelect from "../Other/custom-select";
import { UserContext } from "../../contexts/UserContext";
import { clearPreviewData } from "next/dist/server/api-utils";

function SignUpModal(props) {
  /********** PROPS **********/
  const {
    openSignUp,
    handleCloseSignUp,
    handleOpenLogin,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props;

  // Check if user exists and if the user is admin
  const { user } = React.useContext(UserContext);
  const isAdmin = user && user.type === USERTYPES.ADMIN;

  /********** USE-STATES **********/
  const [acceptAll, setAcceptAll] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [signupCompleted, setSignupCompleted] = React.useState(false);
  const [userData, setUserData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    type: isAdmin ? "" : USERTYPES.CLIENT,
  });
  const [signupErrors, setSignupErrors] = React.useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    phone: false,
    type: false,
  });
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  });

  /********** VARAIABLES FOR LIVE CHECK **********/
  const passwordError =
    signupErrors.password ||
    (userData.password.trim() !== "" && !checkPassword(userData.password));
  const emailError =
    signupErrors.email ||
    (userData.email.trim() !== "" && !checkEmail(userData.email));
  const phoneError =
    signupErrors.phone ||
    (userData.phone.trim() !== "" && !checkPhone(userData.phone));

  /********** FUNCTIONS **********/
  const handleChange = (attribute) => (event) => {
    setUserData({
      ...userData,
      [attribute]: event.target.value,
    });
    // On change we reset th localError of the input value, we let the live check take over
    setSignupErrors({
      ...signupErrors,
      [attribute]: false,
    });
  };

  const handleSwitchSignUpToLogin = (e) => {
    handleCloseSignUp(e);
    handleOpenLogin(e);
  };

  const handleSignUpComplete = () => {
    setSignupCompleted(true);
    setSeverity("success");
    setMessageSnack("The onboarding is completed !");
    setOpenSnackBar(true);
    setShowAlert({
      show: true,
      severity: "success",
      text: "A confirmation link has been sent to the email address you have provided. Click on the link or the button in the email, to check whether it is your email.",
      title: "Your onboarding is almost complete",
    });
  };

  const handleSignUpIncomplete = () => {
    setSeverity("error");
    setMessageSnack("The signup failed, please check all the fields");
    setOpenSnackBar(true);
  };

  /* Check all data at once onSubmit button click */
  const checkAllData = () => {
    const localErrors = {
      firstname: false,
      lastname: false,
      email: false,
      password: false,
      phone: false,
      type: false,
    };

    // Check firstname
    if (!userData.firstname || userData.firstname.trim() === "")
      localErrors.firstname = true;
    else localErrors.firstname = false;
    // Check lastname
    if (!userData.lastname || userData.lastname.trim() === "")
      localErrors.lastname = true;
    else localErrors.lastname = false;
    // Check email
    if (emailError || !userData.email || userData.email.trim() === "")
      localErrors.email = true;
    else localErrors.email = false;
    // Check phone
    if (phoneError || !userData.phone || userData.phone.trim() === "")
      localErrors.phone = true;
    else localErrors.phone = false;
    // Check password
    if (passwordError || !userData.password || userData.password.trim() === "")
      localErrors.password = true;
    else localErrors.password = false;
    // Count number of errors
    let count = 0;
    for (const err of Object.entries(localErrors)) {
      if (err[1]) count += 1;
    }

    return { errors: localErrors, count };
  };

  const handleCheckAcceptAll = (e) => {
    setAcceptAll(e.target.checked);
  };

  const handleDuplicateSignup = () => {
    setShowAlert({
      show: true,
      title: "Email or phone already exists",
      severity: "warning",
      text: "Your email or your phone number already exists for another user.",
    });
  };

  const signUp = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setLoadingButton(true);

    const { errors, count } = checkAllData();
    setSignupErrors(errors);

    if (count > 0) {
      setLoadingButton(false);
      return; // we dont send the createUser request if payload is invalid
    }

    const res = await apiCall.users.create({ userData });
    if (res && res.ok) {
      handleSignUpComplete();
    } else {
      const jsonRes = await res.json();
      if (jsonRes.code === 1010) {
        handleDuplicateSignup();
      }
      handleSignUpIncomplete();
    }

    setLoadingButton(false);
  };

  const clearData = () => {
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      type: isAdmin ? "" : USERTYPES.CLIENT,
    });
    setSignupCompleted(false);
  };

  const handleCloseSignUpAndClear = () => {
    clearData();
    handleCloseSignUp();
  };

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /********** RENDER **********/
  return (
    <Dialog
      open={openSignUp}
      onClose={handleCloseSignUp}
      fullScreen={fullScreen}
      sx={{
        ".MuiPaper-root": { bgcolor: "#000", overflowX: "hidden" },
      }}
    >
      {isAdmin ? (
        <ModalTitle text="Add users" />
      ) : (
        <ModalTitle text="Sign up" />
      )}

      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{ margin: "1rem auto", width: "400px" }}
        component={"form"}
      >
        {!signupCompleted ? (
          <>
            <TextField
              required
              type="input"
              id="firstname"
              label="Firstname"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.firstname}
              onChange={handleChange("firstname")}
              error={signupErrors.firstname}
              helperText={signupErrors.firstname && "Problem with this field"}
            />
            <TextField
              required
              type="input"
              id="lastname"
              label="Lastname"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.lastname}
              onChange={handleChange("lastname")}
              error={signupErrors.lastname}
              helperText={signupErrors.lastname && "Please check this field"}
            />
            <TextField
              required
              type="email"
              id="email"
              label="Email"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.email}
              onChange={handleChange("email")}
              error={emailError || signupErrors.email}
              helperText={emailError && "This email is ot valid"}
            />
            <TextField
              required
              type="phone"
              id="phone"
              label="Phone"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.phone}
              onChange={handleChange("phone")}
              error={phoneError || signupErrors.phone}
              helperText={phoneError && "This phone is not valid"}
            />
            <TextField
              required
              type="input"
              label="Mot de passe"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.password}
              onChange={handleChange("password")}
              error={passwordError}
              helperText={
                passwordError &&
                "Minimum 8 caracters, 1 lowercase, 1 uppercase, 1 number et 1 special caracter"
              }
            />

            {isAdmin ? (
              <FormGroup
                sx={{ width: "calc(100% - 3rem)", margin: "0.5rem auto" }}
              >
                <CustomSelect
                  required
                  placeholder="Role"
                  options={[
                    { id: "admin", label: "Admin" },
                    { id: "client", label: "Client" },
                    { id: "professional", label: "Employed" },
                  ]}
                  value={userData.type}
                  setValue={(eventValue) =>
                    setUserData({ ...userData, type: eventValue })
                  }
                />
              </FormGroup>
            ) : null}

            <FormGroup
              sx={{ width: "calc(100% - 3rem)", margin: "0.5rem auto" }}
            >
              <FormControlLabel
                control={<Checkbox onChange={handleCheckAcceptAll} required />}
                label="I accept the usage policy of the website"
              />
            </FormGroup>
          </>
        ) : null}
        <Stack sx={{ width: "90%" }}>
          {showAlert.show ? <AlertInfo content={showAlert} /> : null}
        </Stack>
      </Stack>

      {!signupCompleted ? (
        <ActionButtons
          leftButtonText={isAdmin ? null : "Log in"}
          leftButtonOnClick={handleSwitchSignUpToLogin}
          middleButtonText="Cancel"
          middleButtonOnClick={handleCloseSignUp}
          rightButtonText={loadingButton ? <CircularProgress /> : "Create"}
          rightButtonOnClick={signUp}
          rightButtonDisabled={!acceptAll || loadingButton}
          rightButtonSubmit={true}
        />
      ) : (
        <ActionButtons
          middleButtonText="Close"
          middleButtonOnClick={handleCloseSignUpAndClear}
          rightButtonText="Got it !"
          rightButtonOnClick={handleCloseSignUpAndClear}
        />
      )}
    </Dialog>
  );
}

/********** EXPORT **********/
export default SignUpModal;
