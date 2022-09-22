import {
  FormControl,
  Stack,
  TextField,
  Box,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withSnacks from "../../hocs/withSnacks"
import { ModalTitle } from "../Modal-Components/modal-title"
import { compose } from "redux"
import withConfirmAction from "../../hocs/withConfirmAction"
import { ActionButtons } from "../Modal-Components/modal-action-buttons"
import withAddCategoryPhoto from "../../hocs/withAddCategoryThumbnail"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import TextArea from "../../ReusableComponents/forms/custom-filled-text-area"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"

function EditFilmModal(props) {
  const {
    filmId,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    setOpenAddNewPhotosModal,
    openEditModal,
    handleCloseEditModal,
  } = props

  const initialVideo = {
    id: null,
    thumbnail: { id: "", url: "" },
    title: "",
    url: "",
    description: "",
    gear: [],
    roles: [],
    year: "",
    client: "",
    type: { id: "", label: "" },
  }
  const [categories, setCategories] = useState(null)
  const [video, setVideo] = useState(initialVideo)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.admin.getFilm(filmId)
    const jsonRes = await res.json()
    setVideo(jsonRes)
  }
  const fetchCategories = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setCategories(jsonRes)
    }
  }

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchData()
    fetchCategories()
  }, [filmId])

  // HANDLERS
  const handleChange = (e, attribute) => {
    setVideo({ ...video, [attribute]: e.target.value })
  }
  const handleCancel = async () => {
    // await fetchData();
    setVideo({
      id: null,
      thumbnail_id: "",
      thumbnail_url: "",
      title: "",
      url: "",
      description: "",
    })
    handleClose()
  }
  const handleSuccess = () => {
    setSeverity("success")
    setMessageSnack("The category has been changed successfully !")
    setOpenSnackBar(true)
    handleCloseEditModal()
  }
  const handleError = () => {
    setSeverity("error")
    setMessageSnack("An error occurred while updating the category...")
    setOpenSnackBar(true)
  }
  const handleUpdate = async () => {
    const res = await apiCall.admin.updateCategoryVideo(video)
    if (res && res.ok) {
      handleSuccess()
    } else {
      handleError()
    }
  }

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
  )

  return (
    <CustomModal open={openEditModal} handleClose={handleCloseEditModal}>
      <ModalTitle>Modifier le film</ModalTitle>

      <CustomForm>
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
          <CustomOutlinedInput
            disabled
            type="input"
            id="id"
            label="ID"
            value={video.id || ""}
          />
          <CustomOutlinedInput
            type="input"
            id="title"
            label="Titre"
            value={video.title || ""}
            onChange={(e) => handleChange(e, "title")}
          />
          <CustomOutlinedInput
            type="input"
            id="url"
            label="URL"
            value={video.url || ""}
            onChange={(e) => handleChange(e, "url")}
          />
          <CustomOutlinedInput
            type="input"
            id="year"
            label="Année"
            value={video.year || ""}
            onChange={(e) => handleChange(e, "year")}
          />
          <CustomOutlinedInput
            type="input"
            id="type"
            label="Catégorie"
            value={(video.type && video.type.label) || ""}
            onChange={(e) => handleChange(e, "type")} // FIXME (il faut rentrer dans l'objet)
          />
          <CustomOutlinedInput
            type="input"
            id="client"
            label="Client"
            value={video.client || ""}
            onChange={(e) => handleChange(e, "client")}
          />

          <TextArea
            required
            id="description"
            label="À propos de ce projet..."
            value={video.description}
            onChange={(e) => handleChange(e, "description")}
            sx={
              {
                // "& .MuiInputLabel-root": {
                //   color: errors.description
                //     ? (theme) => theme.palette.error.main
                //     : (theme) => theme.palette.text.secondary,
                // },
              }
            }
          />

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton onClick={handleCancel}>
              Annuler
            </CustomSubmitButton>
            <CustomSubmitButton secondary="true" onClick={handleUpdate}>
              Enregistrer
            </CustomSubmitButton>
          </Stack>
        </FormControl>

        <SmallTitle text="Miniature" />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box
            component="img"
            src={(video.thumbnail && video.thumbnail.url) || ""}
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
                setOpenAddNewPhotosModal(true)
              }}
            >
              Change thumbnail
            </Button>
          </Stack>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default compose(
  withSnacks,
  withAddCategoryPhoto,
  withConfirmAction
)(EditFilmModal)
