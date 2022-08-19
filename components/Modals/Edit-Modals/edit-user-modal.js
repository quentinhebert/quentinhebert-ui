import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Avatar,
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
import { ActionButtons } from "../Modal-Components/modal-action-buttons";
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
    setMessageSnack("User updated successfully");
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occurred while updating the user");
  };
  const handleErrorDuplicate = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack(
      "The email address or the phone already exists for anothe user"
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
    setMessageSnack("Email sent");
  };
  const handleEmailNotSent = async () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occurred while sending the email");
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
          text: "If teh checkbox is unchecked, the user wont be allowed to log in anymore. The user will need to confirm his/her email with an automatic confirmation email. If the user has just created his/her account, the user has received an automatic email at the provided email. Attention, the automatic email can be received in the spams of the user. Otherwise, use the button to send an automatic confirmation email.",
        }}
      />
    );
  const InfoBanned = ({ user }) =>
    user.banned && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: "If the checkbox is checked, the user will not be allowed to log in anymore. A message will be shown to the user if he/she tries to log in.",
        }}
      />
    );
  const InfoPasswordForgotten = ({ user }) =>
    user.password_forgotten && (
      <AlertInfo
        content={{
          severity: "info",
          title: "Information",
          text: 'If the checkbox is checked, that means the user has clicked on the button "Password forgotten". If the user resets his/her password, this checkbox will be automatically unchecked.',
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
      <ModalTitle text="Edit user" />

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
          Refresh
        </Button>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: { sm: "100%", md: "600px" }, padding: "2rem" }}
      >
        <Avatar
          src={user.avatar_path}
          sx={{ width: "150px", height: "150px", marginBottom: "1rem" }}
        />
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
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="professional">Employed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            type="input"
            id="firstname"
            label="Firstname"
            color="primary"
            fullWidth
            value={user.firstname || ""}
            onChange={handleChange("firstname")}
          />
          <TextField
            required
            type="input"
            id="lastname"
            label="Lastname"
            color="primary"
            fullWidth
            value={user.lastname || ""}
            onChange={handleChange("lastname")}
          />
          <TextField
            required
            type="email"
            id="email"
            label="Email address"
            color="primary"
            fullWidth
            value={user.email || ""}
            onChange={handleChange("email")}
            error={emailError || updateErrors.email}
            helperText={emailError && "The email is not valid"}
          />
          <TextField
            required
            type="phone"
            id="phone"
            label="Phone"
            color="primary"
            fullWidth
            value={user.phone || ""}
            onChange={handleChange("phone")}
            error={phoneError || updateErrors.phone}
            helperText={phoneError && "This phone is not valid"}
          />
          <Stack direction="row" gap={2}>
            <Button
              variant="outlined"
              sx={{ width: "49%", textTransform: "none" }}
              onClick={sendPasswordForgottenEmail}
              startIcon={<SendIcon />}
            >
              Send an automatic password reset email
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "49%", textTransform: "none" }}
              onClick={resendConfirmEmail}
              startIcon={<SendIcon />}
            >
              Send an automatic confirmation email
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
            label="Email confirmed"
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
            label="Banned"
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
            label="Password forgotten"
          />
          <InfoPasswordForgotten user={user} />
        </FormControl>
      </Stack>

      <ActionButtons
        middleButtonText="Cancel"
        middleButtonOnClick={handleCloseEditModal}
        rightButtonText={loadingButton ? <CircularProgress /> : "Save"}
        rightButtonOnClick={handleSaveUser}
        rightButtonDisabled={loadingButton}
      />
    </Dialog>
  );
}
