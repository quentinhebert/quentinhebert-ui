import { FormControl, Paper, Stack, Avatar, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import withSnacks from "../../hocs/withSnacks";
import { ModalTitle } from "../../Modals/Modal-Components/modal-title";
import { compose } from "redux";
import withAddAvatar from "../../hocs/withAddAvatar";
import withConfirmAction from "../../hocs/withConfirmAction";

function ChangeAvatar(props) {
  const {
    user,
    setUser,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    uploadSuccess,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props;

  // Fetch data
  async function fetchUser() {
    const res = await apiCall.users.get(user.id);
    if (res && res.ok) {
      const jsonRes = await res.json();
      setUser(jsonRes);
    }
  }
  // We immediately fetch up-to-date information from user.id
  useEffect(() => {
    if (user.id) fetchUser();
  }, [user.id, uploadSuccess]);

  // FUNCTIONS
  const deleteAvatar = async () => {
    const res = await apiCall.users.deleteAvatar({ id: user.id });
    if (res && res.ok) handleSuccess();
    else handleError();
  };

  // HANDLERS
  const handleSuccess = () => {
    setSeverity("success");
    setOpenSnackBar("true");
    setMessageSnack("Your avatar has been deleted successfully");
    setUser({ ...user, avatar_path: null }); // Update user context
  };
  const handleError = () => {
    setSeverity("error");
    setOpenSnackBar("true");
    setMessageSnack("A problem occured while deleting your avatar");
  };
  const handleDeleteAvatar = () => {
    setActionToFire(() => () => deleteAvatar());
    setConfirmTitle("Confirmation");
    setConfirmContent({
      text: "Do you really want to delete your avatar ?",
    });
    setNextButtonText("Yes, I really do !");
    setOpenConfirmModal(true);
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
          <ModalTitle text="Change my avatar" />

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
              <Stack direction="row" gap={2} sx={{ marginTop: "1rem" }}>
                <Button
                  variant="outlined"
                  onClick={handleDeleteAvatar}
                  disabled={!user.avatar_path}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={(e) => setOpenAddNewPhotosModal(true)}
                >
                  {user.avatar_path ? "Change" : "Add"}
                </Button>
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default compose(
  withSnacks,
  withAddAvatar,
  withConfirmAction
)(ChangeAvatar);
