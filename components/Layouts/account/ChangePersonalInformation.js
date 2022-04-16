import {
  FormControl,
  Link,
  Paper,
  Stack,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import { checkEmail, checkPhone } from "../../../services/utils";
import withSnacks from "../../hocs/withSnacks";
import { ModalActionButtons } from "../../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import AlertInfo from "../../Other/alert-info";

function ChangePersonalInformation(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } =
    props;
  const [loadingButton, setLoadingButton] = useState(false);
  const [updateErrors, setUpdateErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    type: false,
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  });

  async function fetchUser() {
    const res = await apiCall.users.get(user.id);
    if (res && res.ok) {
      const jsonRes = await res.json();
      setUser(jsonRes);
    }
  }

  // FETCH DATA
  useEffect(() => {
    if (user.id) fetchUser();
  }, [user.id]);

  const router = useRouter();
  const emailError =
    updateErrors.email ||
    (user && user.email.trim() !== "" && !checkEmail(user.email));
  const phoneError =
    updateErrors.phone ||
    (user && user.phone.trim() !== "" && !checkPhone(user.phone));

  const handleChange = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.value });
    setUpdateErrors({ ...updateErrors, [attribute]: false });
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
    const res = await apiCall.users.update(user);
    if (res && res.ok) {
      const jsonRes = await res.json();
      handleSuccess();
      console.log("jsonRes", jsonRes);
      if (jsonRes.change_email_sent) {
        setShowAlert({
          severity: "info",
          show: true,
          title: "Vous avez reçu un e-mail...",
          text: "Un e-mail de confirmation de changement d'adresse e-mail vient de vous être envoyé. Pensez à regarder dans vos courriers indésirables (spams) 😉",
        });
      }
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

  return (
    <Stack direction="column" padding="1rem">
      <Paper
        variant="contained"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Stack justifyContent="center" padding="1rem">
          <ModalTitle text="Modifier mes informations personnelles" />

          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: { xs: "300px", md: "600px" },
              margin: "auto",
              padding: { xs: "0.5rem", md: "2rem" },
            }}
          >
            <FormControl fullWidth sx={{ gap: 2 }}>
              <TextField
                required
                type="input"
                id="firstname"
                label="Prénom"
                color="primary"
                fullWidth
                value={user.firstname || ""}
                onChange={handleChange("firstname")}
                error={updateErrors.firstname}
                helperText={updateErrors.firstname && "Problème avec ce champ"}
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
                error={updateErrors.lastname}
                helperText={
                  updateErrors.lastname && "Veuillez vérifier ce champ"
                }
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
                helperText={
                  emailError && "Cette adresse e-mail n'est pas valide"
                }
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
                helperText={
                  phoneError && "Ce numéro de téléphone n'est pas valide"
                }
              />
            </FormControl>

            {showAlert.show ? <AlertInfo content={showAlert} /> : null}
          </Stack>

          <ModalActionButtons
            middleButtonText="Reset"
            middleButtonOnClick={fetchUser}
            rightButtonText={
              loadingButton ? <CircularProgress /> : "Enregistrer"
            }
            rightButtonOnClick={handleSaveUser}
            rightButtonDisabled={loadingButton}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default withSnacks(ChangePersonalInformation);
