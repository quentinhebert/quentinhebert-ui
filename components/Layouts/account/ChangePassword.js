import {
  FormControl,
  Link,
  Paper,
  Stack,
  TextField,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import { checkPassword } from "../../../services/utils";
import withSnacks from "../../hocs/withSnacks";
import { ActionButtons } from "../../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { errorCodes } from "../../../config/errorCodes";

function ChangePassword(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } =
    props;

  // USE-STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [updateErrors, setUpdateErrors] = useState({
    password: false,
    newPassword: false,
  });
  const router = useRouter();

  // Fetch data
  async function fetchUser() {
    const res = await apiCall.users.get(user.id);
    if (res && res.ok) {
      const jsonRes = await res.json();
      // We add some usefull attributes to the current user object (empty strings to clear all fields when user is fetched)
      setUser({
        ...jsonRes,
        password: "",
        newPassword: "",
        newPasswordConfirmation: "",
      });
    }
  }
  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser();
  }, [user.id]);

  // Handling LIVE & RESPONSE ERRORS
  const passwordError = user.password?.trim() !== "" && updateErrors.password;
  const newPasswordError =
    user.newPassword?.trim() !== "" && !checkPassword(user.newPassword);
  const newPasswordConfirmationError =
    user.newPasswordConfirmation?.trim() !== "" &&
    user.newPasswordConfirmation !== user.newPassword;

  // HANDLERS
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPasswords = () => {
    setShowNewPasswords(!showNewPasswords);
  };
  const handleChange = (attribute) => (event) => {
    setUser({ ...user, [attribute]: event.target.value });
    setUpdateErrors({ ...updateErrors, [attribute]: false });
  };
  const handleSuccess = () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("Your password has been changed successfully");
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occured while changing your password");
  };
  const handleCustomError = async (response) => {
    if (response.code === errorCodes.LOGIN_WRONG_PASSWORD) {
      // Snacks
      setSeverity("error");
      setOpenSnackBar("true");
      setMessageSnack("Your current password is incorrect");
      // Custom front error
      setUpdateErrors({ ...updateErrors, password: true });
    }
  };
  const handleClearErrors = () => {
    setUpdateErrors({
      password: false,
      newPassword: false,
    });
  };
  const handleSaveUser = async () => {
    setLoadingButton(true);
    const res = await apiCall.users.updatePassword(user);
    if (res && res.ok) {
      handleSuccess();
      await fetchUser(); // Clear input fields
      handleClearErrors();
    } else if (res) {
      const jsonRes = await res.json();
      handleCustomError(jsonRes);
    } else {
      handleError();
    }
    setLoadingButton(false);
  };

  // SUB-COMPONENTS
  const CustomError = ({ text }) => {
    return (
      <Typography
        variant="body2"
        fontSize="0.8rem"
        sx={{ marginTop: "0.5rem" }}
        color="#f44336"
      >
        {text}
      </Typography>
    );
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
          <ModalTitle text="Change my password" />

          <Stack
            gap={2}
            sx={{
              width: { xs: "300px", md: "600px" },
              margin: "auto",
              padding: { xs: "0.5rem", md: "2rem" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Current password</InputLabel>
              <OutlinedInput
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={user.password || ""}
                onChange={handleChange("password")}
                error={passwordError}
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
              {passwordError && (
                <CustomError text="Your password is incorrect" />
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="new_password">New password</InputLabel>
              <OutlinedInput
                label="New password"
                type={showNewPasswords ? "text" : "password"}
                id="new_password"
                value={user.newPassword || ""}
                onChange={handleChange("newPassword")}
                sx={{ borderColor: "red" }}
                error={newPasswordError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPasswords}
                      edge="end"
                    >
                      {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                color="primary"
              />
              {newPasswordError && (
                <CustomError
                  text="Minimum 8 caracters, 1 lowercase, 1 uppercase, 1 number and 1
                  special caracter"
                />
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="new_password">
                Confirm the new password
              </InputLabel>
              <OutlinedInput
                label="Confirm the new password"
                type={showNewPasswords ? "text" : "password"}
                id="new_password_confirmation"
                value={user.newPasswordConfirmation || ""}
                onChange={handleChange("newPasswordConfirmation")}
                error={newPasswordConfirmationError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPasswords}
                      edge="end"
                    >
                      {showNewPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                color="primary"
              />
              {newPasswordConfirmationError && (
                <CustomError text="The two passwords don't match" />
              )}
            </FormControl>
          </Stack>

          <ActionButtons
            middleButtonText="Reset"
            middleButtonOnClick={fetchUser}
            rightButtonText={
              loadingButton ? <CircularProgress /> : "Enregistrer"
            }
            rightButtonOnClick={handleSaveUser}
            rightButtonDisabled={
              loadingButton || newPasswordError || newPasswordConfirmationError
            }
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default withSnacks(ChangePassword);
