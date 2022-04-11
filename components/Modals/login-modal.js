import * as React from "react";
import {
  Dialog,
  TextField,
  Stack,
  useMediaQuery,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import apiCall from "../../services/apiCalls/apiCall";
import theme from "../../config/theme";
import { ModalTitle } from "./Modal-Components/modal-title";
import dynamic from "next/dynamic";
import { ModalActionButtons } from "./Modal-Components/modal-action-buttons";
import AlertInfo from "../Other/alert-info";
import withSnacks from "../hocs/withSnacks";
import { errorCodes } from "../../config/errorCodes";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getUser } from "../../services/utils";
import { UserContext } from "../../contexts/UserContext";
import { setRefreshToken, setToken } from "../../services/cookies";
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

    // hocs
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props;

  /********** USER **********/
  const { setUser } = React.useContext(UserContext);

  /********** USE-STATES **********/
  const [passwordInput, setPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
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
  const resendConfirmEmail = async (confirmEmailToken) => {
    if (confirmEmailToken) {
      const res = await apiCall.users.resendConfirmEmail(confirmEmailToken);
      if (res && res.ok)
        setShowAlert({
          show: true,
          severity: "success",
          text: `Un email de confirmation a été renvoyé à ${emailInput}.`,
          title: "E-mail de confirmation renvoyé",
        });
      else
        setShowAlert({
          show: true,
          severity: "warning",
          text: `Désolé, nous n'avons pas pu renvoyer d'e-mail de confirmation à ${emailInput}.`,
          title: "Échec lors de l'envoi",
        });
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: `Désolé, nous n'avons pas pu renvoyer d'e-mail de confirmation à ${emailInput}.`,
        title: "Échec lors de l'envoi",
      });
    }
  };

  const handleErrors = ({ errorCode, token }) => {
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
        title: "E-mail non confirmé",
        text: (
          <Stack justifyContent="center" alignItems="center">
            <Typography sx={{ margin: ".5rem auto" }}>
              Votre adresse e-mail n'est pas encore confirmée. Un lien de
              confirmation vous a été envoyé par mail. Vérifiez vos spams.
              Cliquez sur le bouton ou sur le lien présent dans le mail afin de
              confirmer votre adresse e-mail. Puis connectez-vous.
            </Typography>
            {token ? (
              <Typography sx={{ margin: ".5rem auto" }}>
                <Link
                  onClick={() => resendConfirmEmail(token)}
                  sx={{ cursor: "pointer" }}
                >
                  Cliquez ici
                </Link>{" "}
                pour renvoyer un email de confirmation.
              </Typography>
            ) : null}
          </Stack>
        ),
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

  const fetchUser = async () => {
    const userFromToken = getUser();
    const res = await apiCall.users.get(userFromToken.id);
    if (res && res.ok) {
      const userData = await res.json();
      setUser(userData); // React context
      return true;
    }
    return false;
  };

  const login = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await apiCall.unauthenticated.login({
      email: emailInput,
      password: passwordInput,
    });
    if (res && res.ok) {
      const jsonRes = await res.json();
      handleSetTokens(jsonRes.token, jsonRes.refreshToken); // cookies
      if (await fetchUser()) {
        handleCloseLogin();
      }
    } else if (res) {
      const jsonRes = await res.json();
      // Special case here : we use a token generated by API on login bcs email//correct but it is not recommended to return a token if the frontend cannot log the user in
      let token = null;
      if (
        jsonRes.code === errorCodes.LOGIN_EMAIL_NOT_CONFIRMED &&
        jsonRes.token
      )
        token = jsonRes.token;
      handleErrors({ errorCode: jsonRes.code, token });
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Votre adresse e-mail ou votre mot de passe est incorrect.",
        title: "Mauvais mot de passe ou e-mail",
      });
    }
  };

  const handleSetTokens = (token, refreshToken) => {
    setToken(token); // Cookies
    setRefreshToken(refreshToken); // Cookies
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          component={"form"}
        >
          <TextField
            label="Adresse e-mail"
            type="email"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            color="primary"
            sx={{ width: "calc(100% - 3rem)" }}
          />
          <FormControl sx={{ width: "calc(100% - 3rem)", margin: "auto" }}>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <OutlinedInput
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              id="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              color="primary"
            />
          </FormControl>

          <Typography>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={handleClickPasswordForgotten}
            >
              J'ai oublié mon mot de passe
            </Link>
          </Typography>

          {showAlert.show ? <AlertInfo content={showAlert} /> : null}

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
            rightButtonSubmit
          />
        </Stack>
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
