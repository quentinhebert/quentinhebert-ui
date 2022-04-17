import {
  FormControl,
  Paper,
  Stack,
  CircularProgress,
  Avatar,
  Input,
  Button,
  FormLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import withSnacks from "../../hocs/withSnacks";
import { ModalActionButtons } from "../../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import { errorCodes } from "../../../config/errorCodes";
import { compose } from "redux";
import withAddNewPhotos from "../../hocs/withAddNewPhotos";

function ChangeAvatar(props) {
  const {
    user,
    setUser,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    uploadSuccess,
  } = props;

  // USE-STATES
  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  const avatarRef = useRef(null);

  // Fetch data
  async function fetchUser() {
    const res = await apiCall.users.get(user.id);
    if (res && res.ok) {
      const jsonRes = await res.json();
      // We add some usefull attributes to the current user object (empty strings to clear all fields when user is fetched)
      setUser(jsonRes);
    }
  }
  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser();
  }, [user.id, uploadSuccess]);

  // HANDLERS
  const handleSelectFile = () => {
    //
  };
  const handleSuccess = () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("Votre mot de passe a été mis à jour avec succès");
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack(
      "Un problème est survenu lors de la mise à jour du mot de passe"
    );
  };
  const handleCustomError = async (response) => {
    if (response.code === errorCodes.LOGIN_WRONG_PASSWORD) {
      // Snacks
      setSeverity("error");
      setOpenSnackBar("true");
      setMessageSnack("Votre mot de passe actuel est incorrect");
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
    console.log("user", user);
    // setLoadingButton(true);
    // const res = await apiCall.users.updatePassword(user);
    // if (res && res.ok) {
    //   handleSuccess();
    //   await fetchUser(); // Clear input fields
    //   handleClearErrors();
    // } else if (res) {
    //   const jsonRes = await res.json();
    //   handleCustomError(jsonRes);
    // } else {
    //   handleError();
    // }
    // setLoadingButton(false);
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
          <ModalTitle text="Modifier mon mot de passe" />

          <Stack
            gap={2}
            sx={{
              width: { xs: "300px", md: "600px" },
              margin: "auto",
              padding: { xs: "0.5rem", md: "2rem" },
            }}
          >
            <FormControl
              fullWidth
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Avatar
                alt="Avatar"
                src={user.avatar_path}
                sx={{ width: 100, height: 100 }}
              />
              {/* <Input
                sx={{ display: "none" }}
                id="upload-avatar"
                multiple
                type="file"
              />
              <FormLabel htmlFor="upload-avatar" sx={{ marginTop: "1rem" }}>
                <Button variant="outlined" component="span">
                  Modifier l'avatar
                </Button>
              </FormLabel> */}
              <Button
                variant="outlined"
                onClick={(e) => setOpenAddNewPhotosModal(true)}
                sx={{ marginTop: "1rem" }}
              >
                Modifier l'avatar
              </Button>
            </FormControl>
          </Stack>

          {/* <ModalActionButtons
            middleButtonText="Reset"
            middleButtonOnClick={fetchUser}
            rightButtonText={
              loadingButton ? <CircularProgress /> : "Enregistrer"
            }
            rightButtonOnClick={handleSaveUser}
            rightButtonDisabled={loadingButton}
          /> */}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default compose(withSnacks, withAddNewPhotos)(ChangeAvatar);
