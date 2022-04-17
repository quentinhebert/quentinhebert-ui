import {
  Dialog,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import apiCall from "../../services/apiCalls/apiCall";
import AlertInfo from "../Other/alert-info";
import { ModalActionButtons } from "./Modal-Components/modal-action-buttons";
import { ModalTitle } from "./Modal-Components/modal-title";
import theme from "../../config/theme";

function PasswordForgottenModal(props) {
  /********** PROPS **********/
  const { openPasswordForgotten, handleClosePasswordForgotten, defaultEmail } =
    props;

  /********** USE-STATES **********/
  const [emailInput, setEmailInput] = React.useState(defaultEmail || "");
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  });

  const handleSendPasswordForgotten = async () => {
    const userData = { email: emailInput };
    const res = await apiCall.unauthenticated.passwordForgotten({ userData });
    if (res && res.ok) {
      setShowAlert({
        show: true,
        severity: "info",
        text: "Un e-mail automatique de réinitialisation de mot de passe a été envoyé à cette adresse.",
        title: "C'est envoyé !",
      });
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Un problème est survenu lors de l'envoi de l'e-mail automatique à l'adresse e-mail que vous avez renseignée.",
        title: "Oups...",
      });
    }
  };

  /********** STYLE **********/
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /********** RENDER **********/
  return (
    <>
      <Dialog
        open={openPasswordForgotten}
        onClose={handleClosePasswordForgotten}
        fullScreen={fullScreen}
        sx={{
          ".MuiPaper-root": { bgcolor: "#000" },
        }}
      >
        <ModalTitle text="Mot de passe oublié" />

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
          {showAlert.show ? <AlertInfo content={showAlert} /> : null}

          <ModalActionButtons
            middleButtonText="Annuler"
            middleButtonOnClick={handleClosePasswordForgotten}
            rightButtonText="Envoyer"
            rightButtonOnClick={handleSendPasswordForgotten}
            rightButtonDisabled={!emailInput || emailInput.trim() === ""}
          />
        </Stack>
      </Dialog>
    </>
  );
}

export default PasswordForgottenModal;
