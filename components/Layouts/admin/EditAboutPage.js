import { FormControl, Paper, Stack, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { compose } from "redux"
import withConfirmAction from "../../hocs/withConfirmAction"
import { ActionButtons } from "../../Modals/Modal-Components/modal-action-buttons"
import withAddCategoryPhoto from "../../hocs/withAddCategoryThumbnail"
import { AppContext } from "../../../contexts/AppContext"

function EditAboutPage(props) {
  const {} = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [categories, setCategories] = useState(null)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories()
    const jsonRes = await res.json()
    setCategories(jsonRes)
  }

  // We immediately fetch up-to-date categories data, and let's reset all categories on category change to prevent undesired changes to bes saved
  useEffect(() => {
    fetchData()
  }, [])

  // HANDLERS
  const handleChange = () => {}
  const handleCancel = async () => {}
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("The category has been changed successfully !")
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("An error occurred while updating the category...")
  }
  const handleUpdateCategories = async () => {
    // const res = await apiCall.admin.updateCategory();
    // if (res && res.ok) {
    //   handleSuccess();
    // } else {
    //   handleError();
    // }
  }

  // Allows user to cancel the changes
  if (!categories) return <></>

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
          <ModalTitle text="Edit About page" />

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
                  label={`Catch phrase (biography)`}
                  value={null}
                  onChange={(e) => handleChange()}
                  sx={{
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                  fullWidth
                />
                <TextField
                  label={`Biography`}
                  value={null}
                  onChange={(e) => handleChange()}
                  sx={{
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                  fullWidth
                />
                <TextField
                  label={`Catch phrase (introduction video)`}
                  value={null}
                  onChange={(e) => handleChange()}
                  sx={{
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                  fullWidth
                />
                <TextField
                  label={`URL of your introduction video`}
                  value={null}
                  onChange={(e) => handleChange()}
                  sx={{
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                  fullWidth
                />
              </Stack>
              <ActionButtons
                middleButtonText="Cancel"
                middleButtonOnClick={handleCancel}
                rightButtonText="Save"
                rightButtonOnClick={handleUpdateCategories}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default compose(withAddCategoryPhoto, withConfirmAction)(EditAboutPage)
