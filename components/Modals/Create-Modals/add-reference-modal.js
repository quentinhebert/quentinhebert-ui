import { Stack, Typography } from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomOutlinedSelect from "../../ReusableComponents/forms/custom-outlined-select"
import SelectOption from "../../ReusableComponents/forms/custom-select-option"
import DropzoneShowImage from "../../ReusableComponents/images/drop-zone-show-image"
import compressImage from "../../../services/images"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import { AppContext } from "../../../contexts/AppContext"

const REFERENCE_TYPES = [
  { id: "films", label: "Vidéo" },
  { id: "websites", label: "Site web" },
]

function AddReferenceModal(props) {
  const { refreshData, open, handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [file, setFile] = useState(null)
  const initialReference = {
    logo: file,
    label: "",
    type: "",
  }
  const [reference, setReference] = useState(initialReference)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // HANDLERS
  const handleChange = (attribute, subAttribute) => (e) => {
    if (subAttribute)
      setReference({
        ...reference,
        [attribute]: {
          ...reference[attribute],
          [subAttribute]: e.target.value,
        },
      })
    else setReference({ ...reference, [attribute]: e.target.value })
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("The category has been changed successfully !")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("La référénce n'a pas pu être ajoutée...")
  }
  const handleErrorLogo = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Une erreur est survenue lors de l'upload de la vignette..."
    )
  }
  const processLogo = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadLogoRes = await apiCall.references.addLogo(compressedImage)
      if (uploadLogoRes && uploadLogoRes.ok) {
        const logoJson = await uploadLogoRes.json()
        return logoJson.id
      } else {
        handleErrorLogo()
        return null
      }
    } else return null
  }
  const handleCreate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const logoId = await processLogo()
    const localReference = { ...reference, logo: { id: logoId } }
    const res = await apiCall.references.add(localReference)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
    } else {
      // TODO: if new logo uploaded but reference update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  // SUB-COMPONENTS
  const ServiceSelect = () => (
    <CustomOutlinedSelect
      required
      id="type"
      value={reference.type && reference.type.id}
      onChange={handleChange("type", "id")}
      renderValue={
        // Trick for placeholder hiding
        reference.type && reference.type.id !== ""
          ? undefined
          : () => (
              <Typography color={errors.budget ? "error.main" : "secondary"}>
                Service *
              </Typography>
            )
      }
    >
      {REFERENCE_TYPES &&
        REFERENCE_TYPES.map((type, key) => (
          <SelectOption value={type.id} key={key}>
            {type.label}
          </SelectOption>
        ))}
    </CustomOutlinedSelect>
  )

  const LogoInput = () => (
    <DropzoneShowImage
      bgImage={reference.logo?.url || ""}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Ajouter une référence</ModalTitle>

      <CustomForm gap={3}>
        <LogoInput />

        <ServiceSelect />

        <CustomOutlinedInput
          type="input"
          id="label"
          label="Client"
          value={reference.label || ""}
          onChange={handleChange("label")}
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

export default withConfirmAction(AddReferenceModal)
