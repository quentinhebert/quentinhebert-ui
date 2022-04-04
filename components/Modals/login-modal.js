import * as React from "react";
import {
  Dialog,
  TextField,
  Stack,
  useMediaQuery,
  Typography,
  Link,
} from "@mui/material";
import apiCall from "../../services/apiCalls/apiCall";
import theme from "../../config/theme";
import { ModalTitle } from "./Modal-Components/modal-title";
import dynamic from "next/dynamic";
import { ModalActionButtons } from "./Modal-Components/modal-action-buttons";
import AlertInfo from "../Other/alert-info";
import withSnacks from "../hocs/withSnacks";
import { errorCodes } from "../../config/errorCodes";
const SignUpModal = dynamic(() => import("./signup-modal"));
const PasswordForgottenModal = dynamic(() =>
  import("./password-forgotten-modal")
);

function LoginModal(props) {
  /********** PROPS **********/
  const {
    openLogin,
    handleOpenLogin,
    handleCloseLogin,
    handleSetTokens,

    // hocs
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props;

  /********** USE-STATES **********/
  const [passwordInput, setPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openPasswordForgotten, setOpenPasswordForgotten] =
    React.useState(false);
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  });

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /********** FUNCTIONS **********/
  const handleErrors = (errorCode) => {
    if (errorCode === errorCodes.LOGIN_WRONG_PASSWORD)
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Votre adresse e-mail ou votre mot de passe est incorrect.",
        title: "Mauvais mot de passe ou e-mail",
      });
    else if (errorCode === errorCodes.LOGIN_EMAIL_NOT_CONFIRMED)
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Votre adresse e-mail n'est pas confirmée. Un lien de confirmation vous a été envoyé par mail. Vérifiez vos spams. Cliquez sur le bouton ou sur le lien présent dans le mail afin de confirmer votre adresse e-mail. Puis connectez-vous.",
        title: "E-mail non confirmé",
      });
    else if (errorCode === errorCodes.LOGIN_USER_BANNED)
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Cet utilisateur a été banni.",
        title: "Utilisateur banni",
      });
    else
      setShowAlert({
        show: false,
        severity: null,
        text: null,
        title: null,
      });
  };

  const login = async () => {
    const res = await apiCall.unauthenticated.login({
      email: emailInput,
      password: passwordInput,
    });
    if (res && res.ok) {
      const jsonRes = await res.json();
      handleSetTokens(jsonRes.token, jsonRes.refreshToken); // State + cookies
      handleCloseLogin();
    } else if (res) {
      const jsonRes = await res.json();
      handleErrors(jsonRes.code);
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Votre adresse e-mail ou votre mot de passe est incorrect.",
        title: "Mauvais mot de passe ou e-mail",
      });
    }
  };

  const handleClickPasswordForgotten = () => {
    setOpenPasswordForgotten(true);
    handleCloseLogin();
  };

  const handleClosePasswordForgotten = () => {
    setOpenPasswordForgotten(false);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    handleCloseLogin();
  };

  /********** RENDER **********/
  return (
    <>
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        fullScreen={fullScreen}
        sx={{
          ".MuiPaper-root": { bgcolor: "#000" },
        }}
      >
        <ModalTitle text="Connexion" />

        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ margin: "1rem auto", width: "400px" }}
        >
          <TextField
            label="Adresse e-mail"
            color="primary"
            sx={{ width: "calc(100% - 3rem)" }}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            label="Mot de passe"
            color="primary"
            sx={{ width: "calc(100% - 3rem)" }}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />

          <Typography>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={handleClickPasswordForgotten}
            >
              J'ai oublié mon mot de passe
            </Link>
          </Typography>

          {showAlert.show ? <AlertInfo content={showAlert} /> : null}
        </Stack>

        <ModalActionButtons
          leftButtonText="Créer un compte"
          leftButtonOnChange={handleOpenSignUp}
          middleButtonText="Annuler"
          middleButtonOnChange={handleCloseLogin}
          rightButtonText="Se connecter"
          rightButtonOnChange={login}
          rightButtonDisabled={
            !passwordInput ||
            !emailInput ||
            passwordInput.trim() === "" ||
            emailInput.trim() === ""
          }
        />
      </Dialog>

      {openSignUp ? (
        <SignUpModal
          openSignUp={openSignUp}
          handleCloseSignUp={handleCloseSignUp}
          handleOpenLogin={handleOpenLogin}
          setSeverity={setSeverity}
          setOpenSnackBar={setOpenSnackBar}
          setMessageSnack={setMessageSnack}
        />
      ) : null}

      {openPasswordForgotten ? (
        <PasswordForgottenModal
          defaultEmail={emailInput}
          openPasswordForgotten={openPasswordForgotten}
          handleClosePasswordForgotten={handleClosePasswordForgotten}
        />
      ) : null}
    </>
  );
}

/********** EXPORT **********/
export default withSnacks(LoginModal);
