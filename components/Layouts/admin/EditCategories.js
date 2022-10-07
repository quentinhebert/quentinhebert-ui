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
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { compose } from "redux"
import withConfirmAction from "../../hocs/withConfirmAction"
import { ActionButtons } from "../../Modals/Modal-Components/modal-action-buttons"
import withAddCategoryPhoto from "../../hocs/withAddCategoryThumbnail"
import { AppContext } from "../../../contexts/AppContext"

function EditCategories(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
    setOpenAddNewPhotosModal,
    uploadSuccess,
    setCategory,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [changes, setChanges] = useState(false)
  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories()
    const jsonRes = await res.json()
    setCategories(jsonRes)
    console.log(jsonRes)
    if (!selectedCategory) setSelectedCategory(jsonRes[0])
  }
  const fetchDataAndSelectCategory = async (key) => {
    const res = await apiCall.unauthenticated.getPublicCategories()
    const jsonRes = await res.json()
    setCategories(jsonRes)
    setSelectedCategory(jsonRes[key])
  }

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchData()
  }, [])

  // Refresh data when thumbnail is changed
  useEffect(() => {
    if (uploadSuccess) fetchDataAndSelectCategory(selectedCategory.id - 1)
  }, [uploadSuccess])

  // HANDLERS
  const handleChange = (e, key, attribute) => {
    setChanges(true)
    const localCategories = [...categories]
    localCategories[key][attribute] = e.target.value
    setCategories(localCategories)
  }
  const handleCancel = async () => {
    setChanges(false)
    fetchDataAndSelectCategory(selectedCategory.id - 1)
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("The category has been changed successfully !")
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("An error occurred while updating the category...")
  }
  const handleUpdateCategories = async () => {
    const res = await apiCall.admin.updateCategory(
      categories[selectedCategory.id - 1]
    )
    if (res && res.ok) {
      handleSuccess()
    } else {
      handleError()
    }
  }
  const handleChangeSelectedCategory = async (e) => {
    if (changes) {
      setConfirmTitle("Continue without saving ?")
      setNextButtonText("Don't save")
      setConfirmContent({
        text: "There are some unsaved changes. Do you really want to continue without saving them ?",
      })
      setActionToFire(() => () => {
        setChanges(false)
        fetchDataAndSelectCategory(e.target.value - 1)
      })
      setOpenConfirmModal(true)
    } else {
      setChanges(false)
      await fetchDataAndSelectCategory(e.target.value - 1)
    }
  }

  // SUB-COMPONENTS
  const SelectCategory = () => (
    <Select
      value={selectedCategory.id}
      onChange={(e) => handleChangeSelectedCategory(e)}
      sx={{
        ".MuiOutlinedInput-input": {
          color: "#fff",
        },
      }}
    >
      {categories.map((category, key) => (
        <MenuItem value={category.id} key={key} sx={{ color: "#fff" }}>
          Category {key + 1}
        </MenuItem>
      ))}
    </Select>
  )

  // Allows user to cancel the changes
  if (!categories || !selectedCategory) return <></>

  return (
    <Stack
      direction="column"
      padding="1rem"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.background.white,
      }}
    >
      <Paper
        variant="contained"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Stack justifyContent="center" padding="1rem">
          <ModalTitle text="Edit the categories" />

          <Stack
            gap={2}
            sx={{
              width: { xs: "300px", md: "600px" },
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
              {selectedCategory ? (
                <Stack margin="1rem 0" sx={{ width: "100%" }}>
                  <TextField
                    label={`Category ${selectedCategory.id}`}
                    value={selectedCategory.label}
                    onChange={(e) =>
                      handleChange(e, selectedCategory.id - 1, "label")
                    }
                    sx={{
                      width: "100%",
                      margin: "0.5rem 0",
                    }}
                    fullWidth
                  />

                  <TextField
                    label={`Catch phrase secondary text`}
                    value={selectedCategory.catch_phrase_secondary}
                    onChange={(e) =>
                      handleChange(
                        e,
                        selectedCategory.id - 1,
                        "catch_phrase_secondary"
                      )
                    }
                    sx={{ width: "100%", margin: "0.5rem 0" }}
                    fullWidth
                  />
                  <TextField
                    label={`Catch phrase main text`}
                    value={selectedCategory.catch_phrase_primary}
                    onChange={(e) =>
                      handleChange(
                        e,
                        selectedCategory.id - 1,
                        "catch_phrase_primary"
                      )
                    }
                    sx={{ width: "100%", margin: "0.5rem 0" }}
                    fullWidth
                  />
                  <TextField
                    label={`Background video URL (Vimeo only)`}
                    value={selectedCategory.bg_video_url}
                    onChange={(e) =>
                      handleChange(e, selectedCategory.id - 1, "bg_video_url")
                    }
                    sx={{ width: "100%", margin: "0.5rem 0" }}
                    fullWidth
                  />
                  <TextField
                    label={`Header title`}
                    value={selectedCategory.header_title}
                    onChange={(e) =>
                      handleChange(e, selectedCategory.id - 1, "header_title")
                    }
                    sx={{ width: "100%", margin: "0.5rem 0" }}
                    fullWidth
                  />
                </Stack>
              ) : null}
              <ActionButtons
                middleButtonText="Cancel"
                middleButtonOnClick={handleCancel}
                rightButtonText="Save"
                rightButtonOnClick={handleUpdateCategories}
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
                src={selectedCategory.thumbnail}
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
                  onClick={() => {
                    setCategory(selectedCategory)
                    setOpenAddNewPhotosModal(true)
                  }}
                >
                  Change thumbnail
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default compose(withAddCategoryPhoto, withConfirmAction)(EditCategories)
