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
import withAddCategoryPhoto from "../../hocs/withAddCategoryThumbnail";

function EditVideoModal(props) {
  const {
    videoId,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    openEditModal,
    handleCloseEditModal,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [video, setVideo] = useState({
    id: null,
    thumbnail_id: "",
    thumbnail_url: "",
    title: "",
    url: "",
    description: "",
    category_id: null,
  });

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.unauthenticated.getCategoryVideo(videoId);
    const jsonRes = await res.json();
    setVideo(jsonRes);
    console.log(jsonRes);
    if (!selectedCategory) setSelectedCategory(jsonRes[0]);
  };
  const fetchCategories = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories();
    if (res && res.ok) {
      const jsonRes = await res.json();
      setCategories(jsonRes);
    }
  };

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  // HANDLERS
  const handleChange = (e, attribute) => {
    setVideo({ ...video, [attribute]: e.target.value });
  };
  const handleCancel = async () => {
    // await fetchData();
    setVideo({
      id: null,
      thumbnail_id: "",
      thumbnail_url: "",
      title: "",
      url: "",
      description: "",
      category_id: defaultCategory.id,
    });
    handleClose();
  };
  const handleSuccess = () => {
    setSeverity("success");
    setMessageSnack("The category has been changed successfully !");
    setOpenSnackBar(true);
    handleCloseEditModal();
  };
  const handleError = () => {
    setSeverity("error");
    setMessageSnack("An error occurred while updating the category...");
    setOpenSnackBar(true);
  };
  const handleUpdate = async () => {
    const res = await apiCall.admin.updateCategoryVideo(video);
    if (res && res.ok) {
      handleSuccess();
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
        <ModalTitle text="Edit a video" />

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
            <ActionButtons
              middleButtonText="Cancel"
              middleButtonOnClick={handleCancel}
              rightButtonText="Save"
              rightButtonOnClick={handleUpdate}
            />
          </FormControl>

          <Typography marginTop="1rem" color="secondary">
            Thumbnail
          </Typography>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box
              component="img"
              src={video.thumbnail_url}
              sx={{
                width: "100%",
                margin: "0.5rem 0",
                borderRadius: "15px",
                "&:hover": {
                  opacity: 0.5,
                },
              }}
            />
            <Stack sx={{ position: "absolute" }}>
              <Button
                variant="contained"
                onClick={(e) => {
                  setOpenAddNewPhotosModal(true);
                }}
              >
                Change thumbnail
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Dialog>
  );
}

export default compose(
  withSnacks,
  withAddCategoryPhoto,
  withConfirmAction
)(EditVideoModal);
