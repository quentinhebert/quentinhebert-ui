import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ModalTitle } from "../Modal-Components/modal-title";
import apiCall from "../../../services/apiCalls/apiCall";
import mainTheme from "../../../config/theme";
import { ModalActionButtons } from "../Modal-Components/modal-action-buttons";
import { isMobile } from "react-device-detect";
import AlertInfo from "../../Other/alert-info";
import { checkEmail, checkPhone } from "../../../services/utils";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function EditUserForm(props) {
  // PROPS
  const {
    userId,
    openEditModal,
    handleCloseEditModal,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props;

  // USE-STATES
  const [user, setUser] = React.useState(null);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [updateErrors, setUpdateErrors] = React.useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
  });
  const emailError =
    updateErrors.email ||
    (user && user.email.trim() !== "" && !checkEmail(user.email));
  const phoneError =
    updateErrors.phone ||
    (user && user.phone.trim() !== "" && !checkPhone(user.phone));

  // FUNCTIONS
  async function fetchUser() {
    const res = await apiCall.admin.getUser(userId);
    if (res && res.ok) {
      const jsonRes = await res.json();
      setUser(jsonRes);
    }
  }
  const handleChange = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.value });
  };
  const handleCheck = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.checked });
  };
  const handleSuccess = () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("Utilisateur mis à jour avec succès");
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack(
      "Un problème est survenu lors de la mise à jour de l'utilisateur"
    );
  };
  const handleErrorDuplicate = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack(
      "L'e-mail ou le numéro de téléphone existe déjà pour un autre utilisateur"
    );
  };
  const handleSaveUser = async () => {
    setLoadingButton(true);
    const res = await apiCall.admin.updateUser(user);
    if (res && res.ok) {
      handleCloseEditModal();
      handleSuccess();
    } else if (res) {
      const jsonRes = await res.json();
      if (jsonRes.code === 1011) {
        handleErrorDuplicate();
      } else {
        handleError();
      }
    } else {
      handleError();
    }
    setLoadingButton(false);
  };
  const handleEmailSent = async () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("E-mail envoyé");
  };
  const handleEmailNotSent = async () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("Un problème est survenu dans lors de l'envoi de l'email.");
  };
  const resendConfirmEmail = async () => {
    const res = await apiCall.admin.resendUserConfirmEmail(user);
    if (res && res.ok) handleEmailSent();
    else handleEmailNotSent();
  };
  const sendPasswordForgottenEmail = async () => {
    const res = await apiCall.admin.sendUserPasswordForgotten(user);
    if (res && res.ok) handleEmailSent();
    else handleEmailNotSent();
  };

  // SUB-COMPONENTS
  const InfoEmailConfirm = ({ user }) =>
    !!user &&
    !user.email_confirmed && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la case ci-dessus est décochée, l'utilisateur ne pourra pas se connecter. Il faudra que l'utilisateur confirme son adresse e-mail grâce à un e-mail de confirmation automatique. Si l'utilisateur vient de créer son compte, il a reçu un e-mail de confirmation à son adresse e-mail renseignée. Attention, l'e-mail automatique a pu arriver dans les courriers indésirables (spams) de l'utilisateur. Sinone, utilisez le bouton pour envoyer un e-mail automatique de confirmation d'e-mail.",
        }}
      />
    );
  const InfoBanned = ({ user }) =>
    user.banned && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la case ci-dessus est cochée, l'utilisateur ne pourra plus se connecter. Un message l'en informant lui sera affiché si l'utilisateur tente de se connecter.",
        }}
      />
    );
  const InfoPasswordForgotten = ({ user }) =>
    user.password_forgotten && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "Si la case ci-dessus est cochée, cela signifie que l'utilisateur a cliqué sur un bouton \"Mot de passe oublié\". S'il réinitialise son mot de passe, cette case sera décochée automatiquement.",
        }}
      />
    );

  // FETCH DATA
  React.useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  // HANDLE NO RENDER
  if (!user) return <></>;

  // RENDER
  return (
    <Dialog
      open={openEditModal}
      onClose={handleCloseEditModal}
      fullScreen={isMobile}
      sx={{
        ".MuiPaper-root": {
          bgcolor: mainTheme.palette.background.paper,
          overflowX: "hidden",
        },
      }}
    >
      <ModalTitle text="Modifier un utilisateur" />

      <Stack
        direction="row"
        sx={{
          width: "100%",
          padding: "0 1rem",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={(e) => fetchUser()}
          sx={{ width: "150px" }}
        >
          Raffraichir
        </Button>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: { sm: "100%", md: "600px" }, padding: "2rem" }}
      >
        <FormControl fullWidth sx={{ gap: 2 }}>
          <TextField
            disabled
            type="input"
            id="id"
            label="ID"
            color="primary"
            fullWidth
            value={user.id || ""}
          />
          <FormControl fullWidth>
            <InputLabel labelId="type-select">Type</InputLabel>
            <Select
              labelId="type-select"
              fullWidth
              required
              value={user.type}
              label="Type"
              onChange={handleChange("type")}
            >
              <MenuItem value="admin">Administrateur</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="professionnal">Employé</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            type="input"
            id="firstname"
            label="Prénom"
            color="primary"
            fullWidth
            value={user.firstname || ""}
            onChange={handleChange("firstname")}
            // error={signupErrors.firstname}
            // helperText={signupErrors.firstname && "Problème avec ce champ"}
          />
          <TextField
            required
            type="input"
            id="lastname"
            label="Nom"
            color="primary"
            fullWidth
            value={user.lastname || ""}
            onChange={handleChange("lastname")}
            // error={signupErrors.lastname}
            // helperText={signupErrors.lastname && "Veuillez vérifier ce champ"}
          />
          <TextField
            required
            type="email"
            id="email"
            label="Adresse e-mail"
            color="primary"
            fullWidth
            value={user.email || ""}
            onChange={handleChange("email")}
            error={emailError || updateErrors.email}
            helperText={emailError && "Cette adresse e-mail n'est pas valide"}
          />
          <TextField
            required
            type="phone"
            id="phone"
            label="Téléphone"
            color="primary"
            fullWidth
            value={user.phone || ""}
            onChange={handleChange("phone")}
            error={phoneError || updateErrors.phone}
            helperText={phoneError && "Ce numéro de téléphone n'est pas valide"}
          />
          <Stack direction="row" gap={2}>
            <Button
              variant="outlined"
              sx={{ width: "49%", textTransform: "none" }}
              onClick={sendPasswordForgottenEmail}
              startIcon={<SendIcon />}
            >
              Envoyer un mail automatique de réinitialisation de mot de passe.
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "49%", textTransform: "none" }}
              onClick={resendConfirmEmail}
              startIcon={<SendIcon />}
            >
              Envoyer un mail automatique de confirmation d'e-mail.
            </Button>
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck("email_confirmed")}
                value={user.email_confirmed || false}
                checked={user.email_confirmed || false}
              />
            }
            label="E-mail confirmé"
          />
          <InfoEmailConfirm user={user} />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck("banned")}
                value={user.banned || false}
                checked={user.banned || false}
              />
            }
            label="Banni"
          />
          <InfoBanned user={user} />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck("password_forgotten")}
                checked={user.password_forgotten || false}
                value={user.password_forgotten || false}
              />
            }
            label="Mot de passe oublié"
          />
          <InfoPasswordForgotten user={user} />
        </FormControl>
      </Stack>

      <ModalActionButtons
        middleButtonText="Annuler"
        middleButtonOnClick={handleCloseEditModal}
        rightButtonText={loadingButton ? <CircularProgress /> : "Enregistrer"}
        rightButtonOnClick={handleSaveUser}
        rightButtonDisabled={loadingButton}
      />
    </Dialog>
  );
}
