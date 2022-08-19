import {
  FormControl,
  Paper,
  Stack,
  TextField,
  Box,
  Select,
  MenuItem,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import withSnacks from "../../hocs/withSnacks";
import { ModalTitle } from "../Modal-Components/modal-title";
import { compose } from "redux";
import withConfirmAction from "../../hocs/withConfirmAction";
import { ActionButtons } from "../Modal-Components/modal-action-buttons";
import theme from "../../../config/theme";
import { useDropzone } from "react-dropzone";

function EditReferenceModal(props) {
  const {
    referenceId,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    openEditModal,
    handleCloseEditModal,
  } = props;

  const [reference, setReference] = useState({
    id: null,
    new_logo: null,
    logo_id: "",
    logo_url: "",
    name: "",
  });

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.unauthenticated.getReference(referenceId);
    const jsonRes = await res.json();
    jsonRes.new_logo = null;
    setReference(jsonRes);
  };

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchData();
  }, []);

  const sizeLimit = 6; // 6MB

  const onDrop = (files) => {
    const filesArray = files.map((file) => {
      file.URL = URL.createObjectURL(file);
      return file;
    });
    setReference({ ...reference, new_logo: filesArray[0] }); // We only save one photo (the first one)
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  // HANDLERS
  const handleChange = (e, attribute) => {
    setReference({ ...reference, [attribute]: e.target.value });
  };
  const handleCancel = () => {
    setReference({
      id: null,
      new_logo: null,
      logo_id: "",
      logo_url: "",
      name: "",
    });
    handleCloseEditModal();
  };
  const handleSuccess = () => {
    setSeverity("success");
    setMessageSnack("The reference has been changed successfully !");
    setOpenSnackBar(true);
    fetchData();
    handleCloseEditModal();
  };
  const handleError = () => {
    setSeverity("error");
    setMessageSnack("An error occurred while updating the category...");
    setOpenSnackBar(true);
  };
  const handleUpdate = async () => {
    // Check max size limit whether its an album or a galery
    if (
      reference.new_logo &&
      reference.new_logo.size > sizeLimit * 1000 * 1000
    ) {
      setMessageSnack(
        `The picture you have selected has a size greater than ${sizeLimit}Mo. Please select only a lower-than-${sizeLimit}Mo image.`
      );
      setSeverity("error");
      setOpenSnackBar(true);
      return;
    }
    console.log("reference", reference);
    const res = await apiCall.admin.updateReference(reference);
    if (res && res.ok) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  return (
    <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth>
      <Paper
        variant="contained"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          padding: "1rem",
          width: "100%",
        }}
      >
        <ModalTitle text="Edit a reference" />

        <Stack
          gap={2}
          sx={{
            width: "100%",
            margin: "auto",
            padding: { xs: "0.5rem", md: "2rem" },
          }}
        >
          <FormControl
            fullWidth
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              ".MuiOutlinedInput-root": {
                color: "#fff",
              },
            }}
          >
            <Stack margin="1rem 0" sx={{ width: "100%" }}>
              <TextField
                label={`Name`}
                value={reference.name}
                onChange={(e) => handleChange(e, "name")}
                sx={{
                  width: "100%",
                  margin: "0.5rem 0",
                }}
                fullWidth
              />
            </Stack>

            <Stack flexDirection="row" width="100%">
              <Typography marginTop="1rem" color="secondary" marginRight="1rem">
                Logo – JPG or PNG ({sizeLimit}Mo maximum)
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              sx={{ width: "100%" }}
            >
              {reference.logo_url ? (
                <Box
                  component="img"
                  src={reference.logo_url}
                  width="40%"
                  sx={{
                    border: `solid 1px ${theme.palette.text.secondary}`,
                    borderRadius: "5px",
                    marginRight: "1rem",
                  }}
                />
              ) : null}
              <Stack
                {...getRootProps()}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: "100px",
                  border: `solid 1px #fff`,
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "1rem",
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  opacity: 0.3,
                  "&:hover": { opacity: 1 },
                }}
              >
                <input {...getInputProps()} />
                {reference.new_logo?.name ? (
                  <>
                    <Typography>Selected file:</Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ fontStyle: "italic" }}
                    >
                      {reference.new_logo.name}
                    </Typography>
                  </>
                ) : reference.logo_url ? (
                  <Typography component="span" variant="h6">
                    Drop another picture or click here to upload...
                  </Typography>
                ) : (
                  <Typography component="span" variant="h6">
                    Drop a picture or click here to upload it...
                  </Typography>
                )}
              </Stack>
            </Stack>
            <ActionButtons
              middleButtonText="Cancel"
              middleButtonOnClick={handleCancel}
              rightButtonText="Save"
              rightButtonOnClick={handleUpdate}
            />
          </FormControl>
        </Stack>
      </Paper>
    </Dialog>
  );
}

export default compose(withSnacks, withConfirmAction)(EditReferenceModal);
