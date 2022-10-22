import { Stack } from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import TextArea from "../../ReusableComponents/forms/custom-outlined-text-area"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import DropzoneShowImage from "../../ReusableComponents/images/drop-zone-show-image"
import compressImage from "../../../services/images"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import { AppContext } from "../../../contexts/AppContext"

function AddFilmGearModal(props) {
  const { refreshData, open, handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [file, setFile] = useState(null)
  const initialItem = {
    image: file,
    label: "",
    description: "",
  }
  const [item, setItem] = useState(initialItem)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // HANDLERS
  const handleChange = (attribute, subAttribute) => (e) => {
    if (subAttribute)
      setItem({
        ...item,
        [attribute]: {
          ...item[attribute],
          [subAttribute]: e.target.value,
        },
      })
    else setItem({ ...item, [attribute]: e.target.value })
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("L'item a bien été ajouté à votre matériel !")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("L'item n'a pas pu être ajouté...")
  }
  const handleErrorImage = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue lors de l'upload de l'image...")
  }
  const processImage = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadImageRes = await apiCall.films.gear.addImage(compressedImage)
      if (uploadImageRes && uploadImageRes.ok) {
        const imageJson = await uploadImageRes.json()
        return imageJson.id
      } else {
        handleErrorImage()
        return null
      }
    } else return null
  }
  const handleCreate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const imageId = await processImage()
    const localItem = { ...item, image: { id: imageId } }
    const res = await apiCall.films.gear.add(localItem)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
    } else {
      // TODO: if new image uploaded but item update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  // SUB-COMPONENTS
  const ImageInput = () => (
    <DropzoneShowImage
      bgImage={item.image?.url || ""}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Ajouter du matériel vidéo</ModalTitle>

      <CustomForm gap={3}>
        <ImageInput />

        <CustomOutlinedInput
          type="input"
          id="label"
          label="Nom"
          value={item.label || ""}
          onChange={handleChange("label")}
        />

        <TextArea
          required
          id="description"
          label="À propos de ce matériel..."
          value={item.description}
          onChange={handleChange("description")}
          sx={{
            "& .MuiInputLabel-root": {
              color: errors.description
                ? (theme) => theme.palette.error.main
                : (theme) => theme.palette.text.secondary,
            },
          }}
        />

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <CustomSubmitButton onClick={handleCancel}>
            Annuler
          </CustomSubmitButton>
          <CustomSubmitButton secondary="true" onClick={handleCreate}>
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default withConfirmAction(AddFilmGearModal)
