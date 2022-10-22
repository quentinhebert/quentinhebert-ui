import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
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

function EditFilmModal(props) {
  const { gearId, openEditModal, handleCloseEditModal, fetch } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialGear = {
    id: null,
    image: { id: "", url: "" },
    label: "",
    description: "",
  }
  const [gear, setGear] = useState(initialGear)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.films.gear.get({ id: gearId })
    const jsonRes = await res.json()
    console.debug("jsonRes", jsonRes)
    setGear(jsonRes)
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (gearId) {
      fetchData()
    }
  }, [gearId, openEditModal])

  if (!gearId) return <></>

  // HANDLERS
  const handleChange = (attribute, subAttribute) => (e) => {
    if (subAttribute)
      setGear({
        ...gear,
        [attribute]: {
          ...gear[attribute],
          [subAttribute]: e.target.value,
        },
      })
    else setGear({ ...gear, [attribute]: e.target.value })
  }
  const handleCancel = () => {
    handleCloseEditModal()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Le gear a été mis à jour !")
    setFile(null)
    handleCloseEditModal()
    fetch() // fetch parent component data
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
  }
  const handleErrorImage = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue lors de l'upload de l'image")
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
    }
    // If the gear already has a image and user doesn't ask for change
    else if (gear.image?.id) return gear.image.id
    // If the gear has no image (or no more)
    else return null
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const imageId = await processImage()
    const localGear = { ...gear, image: { id: imageId } }
    const res = await apiCall.films.gear.update(localGear)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new image uploaded but gear update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }
  const detachBgImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setGear({ ...gear, image: { id: "" } })
  }

  // SUB-COMPONENTS

  const IdInput = () => (
    <CustomOutlinedInput
      disabled
      type="input"
      id="id"
      label="ID"
      value={gear.id || ""}
    />
  )

  const ImageInput = () => (
    <DropzoneShowImage
      bgImage={gear.image?.url || ""}
      detachBgImage={detachBgImage}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal
      open={openEditModal}
      handleClose={handleCloseEditModal}
      gap={4}
    >
      <ModalTitle>Modifier le matériel vidéo</ModalTitle>

      <CustomForm gap={3}>
        <IdInput />

        <ImageInput />

        <CustomOutlinedInput
          type="input"
          id="label"
          label="Nom"
          value={gear.label || ""}
          onChange={handleChange("label")}
        />

        <TextArea
          required
          id="description"
          label="À propos de ce projet..."
          value={gear.description}
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
          <CustomSubmitButton
            secondary="true"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default withConfirmAction(EditFilmModal)
