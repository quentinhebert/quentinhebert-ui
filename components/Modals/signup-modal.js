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
import withSnacks from "../hocs/withSnacks";
import { ModalActionButtons } from "./Modal-Components/modal-action-buttons";
import { checkPhone, checkEmail, checkPassword } from "../../services/utils";
import AlertInfo from "../Other/alert-info";

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
    type: USERTYPES.CLIENT,
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
  const passwordError =
    signupErrors.password ||
    (userData.password.trim() !== "" && !checkPassword(userData.password));

  /********** FUNCTIONS **********/
  const handleChange = (attribute) => (event) => {
    setUserData({
      ...userData,
      [attribute]: event.target.value,
    });
    // checkData(attribute);
  };

  const handleSwitchSignUpToLogin = (e) => {
    handleCloseSignUp(e);
    handleOpenLogin(e);
  };

  const handleSignUpComplete = () => {
    setSignupCompleted(true);
    setSeverity("success");
    setMessageSnack("Votre inscription a réussi !");
    setOpenSnackBar(true);
    setShowAlert({
      show: true,
      severity: "success",
      text: "Un lien de confirmation a été envoyé à l'adresse e-mail que vous avez renseignée. Cliquez sur le lien ou le bouton présent dans l'e-mail, afin de vérifier qu'il s'agit bien de votre e-mail.",
      title: "Votre inscription est presque terminée !",
    });
  };

  const handleSignUpIncomplete = () => {
    setSeverity("error");
    setMessageSnack("Votre inscription a échoué...");
    setOpenSnackBar(true);
  };

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
    if (
      !userData.email ||
      userData.email.trim() === "" ||
      !checkEmail(userData.email)
    )
      localErrors.email = true;
    else localErrors.email = false;

    // Check phone
    if (
      !userData.phone ||
      userData.phone.trim() === "" ||
      !checkPhone(userData.phone)
    )
      localErrors.phone = true;
    else localErrors.phone = false;

    // Check password
    if (
      !userData.password ||
      userData.password.trim() === "" ||
      !checkPassword(userData.password)
    )
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
      title: "E-mail ou numéro déjà existant",
      severity: "warning",
      text: "Votre adresse e-mail ou votre numéro de téléphone est déjà lié à un utilisateur existant.",
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

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /********** RENDER **********/
  return (
    <Dialog
      open={openSignUp}
      onClose={handleCloseSignUp}
      fullScreen={fullScreen}
      sx={{
        ".MuiPaper-root": { bgcolor: "#000" },
      }}
    >
      <ModalTitle text="Inscription" />

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
              label="Prénom"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.firstname}
              onChange={handleChange("firstname")}
              error={signupErrors.firstname}
              helperText={signupErrors.firstname && "Problème avec ce champ"}
            />
            <TextField
              required
              label="Nom"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.lastname}
              onChange={handleChange("lastname")}
              error={signupErrors.lastname}
              helperText={signupErrors.lastname && "Problème avec ce champ"}
            />
            <TextField
              required
              label="Adresse e-mail"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.email}
              onChange={handleChange("email")}
              error={signupErrors.email}
              helperText={signupErrors.email && "Problème avec ce champ"}
            />
            <TextField
              required
              label="Téléphone"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.phone}
              onChange={handleChange("phone")}
              error={signupErrors.phone}
              helperText={signupErrors.phone && "Problème avec ce champ"}
            />
            <TextField
              required
              label="Mot de passe"
              color="primary"
              sx={{ width: "calc(100% - 3rem)" }}
              value={userData.password}
              onChange={handleChange("password")}
              error={passwordError}
              helperText={
                passwordError &&
                "Minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
              }
            />
            <FormGroup
              sx={{ width: "calc(100% - 3rem)", margin: "0.5rem auto" }}
            >
              <FormControlLabel
                control={<Checkbox onChange={handleCheckAcceptAll} required />}
                label="J'accepte les conditions d'utilisation de ce site"
              />
            </FormGroup>
          </>
        ) : null}
        {showAlert.show ? <AlertInfo content={showAlert} /> : null}
      </Stack>

      {!signupCompleted ? (
        <ModalActionButtons
          leftButtonText="Déjà inscrit ?"
          leftButtonOnChange={handleSwitchSignUpToLogin}
          middleButtonText="Annuler"
          middleButtonOnChange={handleCloseSignUp}
          rightButtonText={loadingButton ? <CircularProgress /> : "Créer"}
          rightButtonOnChange={signUp}
          rightButtonDisabled={!acceptAll || loadingButton}
          rightButtonSubmit={true}
        />
      ) : (
        <ModalActionButtons
          middleButtonText="Fermer"
          middleButtonOnChange={handleCloseSignUp}
          rightButtonText="Compris !"
          rightButtonOnChange={handleCloseSignUp}
        />
      )}
    </Dialog>
  );
}

/********** EXPORT **********/
export default SignUpModal;
