import {
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
  Dialog,
} from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import { ActionButtons } from "../Modal-Components/modal-action-buttons"
import { useDropzone } from "react-dropzone"
import { AppContext } from "../../../contexts/AppContext"

function AddReferenceModal(props) {
  const { open, handleClose, refreshData } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [reference, setReference] = useState({
    logo: null,
    name: "",
  })

  const sizeLimit = 6 // 6MB

  const onDrop = (files) => {
    const filesArray = files.map((file) => {
      file.URL = URL.createObjectURL(file)
      return file
    })
    setReference({ ...reference, logo: filesArray[0] }) // We only save one photo (the first one)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  // HANDLERS
  const handleChange = (e, attribute) => {
    setReference({ ...reference, [attribute]: e.target.value })
  }
  const handleCancel = async () => {
    // await fetchData();
    setReference({
      logo: null,
      name: "",
    })
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("The reference has been uploaded successfully !")
    refreshData()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("An error occurred while adding the reference...")
  }
  const handleCreate = async () => {
    // Check max size limit whether its an album or a galery
    if (reference.logo.size > sizeLimit * 1000 * 1000) {
      setSnackMessage(
        `The picture you have selected has a size greater than ${sizeLimit}Mo. Please select only a lower-than-${sizeLimit}Mo image.`
      )
      setSnackSeverity("error")
      return
    }
    const res = await apiCall.admin.addReference(reference)
    if (res && res.ok) {
      handleSuccess()
      handleClose()
    } else {
      handleError()
    }
  }

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
        <ModalTitle text="Add a reference" />

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
                {reference.logo?.name ? (
                  <>
                    <Typography>Selected file:</Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ fontStyle: "italic" }}
                    >
                      {reference.logo.name}
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
              rightButtonText="Add reference"
              rightButtonOnClick={handleCreate}
            />
          </FormControl>
        </Stack>
      </Paper>
    </Dialog>
  )
}

export default withConfirmAction(AddReferenceModal)
