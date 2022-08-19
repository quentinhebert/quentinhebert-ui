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
import { useCallback, useEffect, useState } from "react";
import apiCall from "../../../services/apiCalls/apiCall";
import withSnacks from "../../hocs/withSnacks";
import { ModalTitle } from "../Modal-Components/modal-title";
import { compose } from "redux";
import withConfirmAction from "../../hocs/withConfirmAction";
import { ActionButtons } from "../Modal-Components/modal-action-buttons";
import theme from "../../../config/theme";
import { useDropzone } from "react-dropzone";

function AddVideoModal(props) {
  const {
    open,
    handleClose,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    refreshData,
  } = props;

  const [categories, setCategories] = useState(null);
  const [video, setVideo] = useState({
    thumbnail: null,
    title: "",
    url: "",
    description: "",
    category_id: "",
  });

  const sizeLimit = 6; // 6MB

  // Fetch data
  const fetchCategories = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories();
    if (res && res.ok) {
      const jsonRes = await res.json();
      setCategories(jsonRes);
    }
  };

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchCategories();
  }, []);

  const onDrop = (files) => {
    const filesArray = files.map((file) => {
      file.URL = URL.createObjectURL(file);
      return file;
    });
    setVideo({ ...video, thumbnail: filesArray[0] }); // We only save one photo (the first one)
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  // HANDLERS
  const handleChange = (e, attribute) => {
    setVideo({ ...video, [attribute]: e.target.value });
  };
  const handleCancel = async () => {
    // await fetchData();
    setVideo({
      thumbnail: null,
      title: "",
      url: "",
      description: "",
      category_id: "",
    });
    handleClose();
  };
  const handleSuccess = () => {
    refreshData();
    setSeverity("success");
    setMessageSnack("The video has been uploaded successfully !");
    setOpenSnackBar(true);
  };
  const handleError = () => {
    setSeverity("error");
    setMessageSnack("An error occurred while adding the video...");
    setOpenSnackBar(true);
  };
  const handleCreate = async () => {
    // Check max size limit whether its an album or a galery
    if (video.thumbnail.size > sizeLimit * 1000 * 1000) {
      setMessageSnack(
        `The picture you have selected has a size greater than ${sizeLimit}Mo. Please select only a lower-than-${sizeLimit}Mo image.`
      );
      setSeverity("error");
      setOpenSnackBar(true);
      return;
    }
    const res = await apiCall.admin.addCategoryVideo(video);
    if (res && res.ok) {
      handleSuccess();
      handleClose();
    } else {
      handleError();
    }
  };

  // SUB-COMPONENTS
  const SelectCategory = () => (
    <>
      <Typography color="secondary">Select a category</Typography>
      <Select
        value={video.category_id}
        onChange={(e) => handleChange(e, "category_id")}
        sx={{
          ".MuiOutlinedInput-input": {
            color: "#fff",
          },
        }}
      >
        {categories &&
          categories.map((category, key) => (
            <MenuItem value={category.id} key={key} sx={{ color: "#fff" }}>
              {category.label}
            </MenuItem>
          ))}
      </Select>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
        <ModalTitle text="Add a video" />

        <Stack
          gap={2}
          sx={{
            width: "100%",
            margin: "auto",
            padding: { xs: "0.5rem", md: "2rem" },
          }}
        >
          <SelectCategory />
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
                label={`Title`}
                value={video.title}
                onChange={(e) => handleChange(e, "title")}
                sx={{
                  width: "100%",
                  margin: "0.5rem 0",
                }}
                fullWidth
              />

              <TextField
                label={`URL`}
                value={video.url}
                onChange={(e) => handleChange(e, "url")}
                sx={{ width: "100%", margin: "0.5rem 0" }}
                fullWidth
              />
              <TextField
                label={`Description`}
                value={video.description}
                onChange={(e) => handleChange(e, "description")}
                sx={{ width: "100%", margin: "0.5rem 0" }}
                fullWidth
              />
            </Stack>

            <Stack flexDirection="row" width="100%">
              <Typography marginTop="1rem" color="secondary" marginRight="1rem">
                Thumbnail – JPG or PNG ({sizeLimit}Mo maximum)
              </Typography>
            </Stack>

            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
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
                  opacity: 0.3,
                  "&:hover": { opacity: 1 },
                }}
              >
                <input {...getInputProps()} />
                {video.thumbnail?.name ? (
                  <>
                    <Typography>Selected file:</Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ fontStyle: "italic" }}
                    >
                      {video.thumbnail.name}
                    </Typography>
                  </>
                ) : (
                  <Typography component="span" variant="h6">
                    Drop your picture or click here to upload it...
                  </Typography>
                )}
              </Stack>
            </Stack>
            <ActionButtons
              middleButtonText="Cancel"
              middleButtonOnClick={handleCancel}
              rightButtonText="Add video"
              rightButtonOnClick={handleCreate}
            />
          </FormControl>
        </Stack>
      </Paper>
    </Dialog>
  );
}

export default compose(withSnacks, withConfirmAction)(AddVideoModal);
