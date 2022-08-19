import {
  FormControl,
  Paper,
  Stack,
  CircularProgress,
  FormLabel,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import withSnacks from "../../hocs/withSnacks";
import { ActionButtons } from "../../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import { logout } from "../../../services/utils";

function DeleteAccount(props) {
  const { user, setUser, setSeverity, setMessageSnack, setOpenSnackBar } =
    props;

  // USE-STATES
  const [loadingButton, setLoadingButton] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  const invalidConfirmation = confirmation !== user.email;

  // HANDLERS
  const handleChange = (event) => {
    setConfirmation(event.target.value);
  };
  const handleSuccess = () => {
    setSuccess(true); // To disable the submit button
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack(
      "Your account has been deleted successfully. You are being redirected in 5 seconds..."
    );
    setTimeout(() => {
      logout(); // remove tokens from cookies
      setUser(null);
      router.push("/");
    }, [5000]);
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occured while updating the password");
  };
  const handleInvalidConfirmation = async (response) => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("Please type your email to continue the operation");
  };
  const handleDeleteUser = async () => {
    if (!invalidConfirmation) {
      const res = await apiCall.users.delete(user.id);
      if (res && res.ok) {
        handleSuccess();
      } else {
        handleError();
      }
    } else {
      handleInvalidConfirmation();
    }
  };

  if (!user) return <></>;

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
          <ModalTitle text="Delete my account" />

          <Stack
            gap={2}
            sx={{
              width: { xs: "300px", md: "600px" },
              margin: "auto",
              padding: { xs: "0 0.5rem 1rem", md: "0 2rem 1rem" },
            }}
          >
            <FormControl
              fullWidth
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <FormLabel
                sx={{
                  margin: "1rem 0",
                  textAlign: "justify",
                  color: "#f44336",
                }}
              >
                Type{" "}
                <Stack
                  sx={{
                    display: "inline-flex",
                    color: "gray",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  {user.email}
                </Stack>{" "}
                then click on <em>"Delete my account"</em> to delete your
                account definitively.
              </FormLabel>
              <TextField
                required
                type="input"
                id="confirmation"
                label="Type your email address"
                color="primary"
                fullWidth
                value={confirmation || ""}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <ActionButtons
            rightButtonText={
              loadingButton ? <CircularProgress /> : "Delete my account"
            }
            rightButtonOnClick={handleDeleteUser}
            rightButtonDisabled={
              loadingButton || invalidConfirmation || success
            }
            rightColor="#f44336"
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default withSnacks(DeleteAccount);
