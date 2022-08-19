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
import { ActionButtons } from "../../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import AlertInfo from "../../Other/alert-info";

function ChangePersonalInformation(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } =
    props;
  const [loadingButton, setLoadingButton] = useState(false);
  const [localUser, setLocalUser] = useState(user); // Prevent from live changing navbar firstnmae...
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
    (localUser &&
      localUser.email.trim() !== "" &&
      !checkEmail(localUser.email));

  const handleChange = (attribute) => (event) => {
    setLocalUser({ ...localUser, [attribute]: event.target.value });
    setUpdateErrors({ ...updateErrors, [attribute]: false });
  };
  const handleSuccess = () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("User updated successfully");
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occurend while updating the user");
  };
  const handleErrorDuplicate = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("The email or the phone already exists for another user");
  };

  const handleSaveUser = async () => {
    setLoadingButton(true);
    const res = await apiCall.users.update(localUser);
    if (res && res.ok) {
      const jsonRes = await res.json();
      handleSuccess();
      await fetchUser();
      if (jsonRes.change_email_sent) {
        setShowAlert({
          severity: "info",
          show: true,
          title: "You just received an email...",
          text: "A confirmation email for changing email has just been sent to you. Don't forget to check your spams 😉",
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
          <ModalTitle text="Change my personal information" />

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
                label="Firstname"
                color="primary"
                fullWidth
                value={localUser.firstname || ""}
                onChange={handleChange("firstname")}
                error={updateErrors.firstname}
                helperText={updateErrors.firstname && "Problem with this field"}
              />
              <TextField
                required
                type="input"
                id="lastname"
                label="Lastame"
                color="primary"
                fullWidth
                value={localUser.lastname || ""}
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
                label="Email address"
                color="primary"
                fullWidth
                value={localUser.email || ""}
                onChange={handleChange("email")}
                error={emailError || updateErrors.email}
                helperText={emailError && "This email is not valid"}
              />
              <TextField
                type="phone"
                id="phone"
                label="Phone number"
                color="primary"
                fullWidth
                value={localUser.phone || ""}
                onChange={handleChange("phone")}
                error={updateErrors.phone}
                helperText={updateErrors.phone && "This phone is not valid"}
              />
            </FormControl>

            {showAlert.show ? <AlertInfo content={showAlert} /> : null}
          </Stack>

          <ActionButtons
            middleButtonText="Reset"
            middleButtonOnClick={fetchUser}
            rightButtonText={loadingButton ? <CircularProgress /> : "Save"}
            rightButtonOnClick={handleSaveUser}
            rightButtonDisabled={loadingButton}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default withSnacks(ChangePersonalInformation);
