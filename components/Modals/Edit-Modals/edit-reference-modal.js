import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
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

function EditReferenceModal(props) {
  const { referenceId, openEditModal, handleCloseEditModal, fetch } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialReference = {
    id: null,
    label: "",
    logo: { id: "", url: "" },
    type: { id: "", label: "" },
  }
  const [reference, setReference] = useState(initialReference)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data
  const fetchData = async () => {
    console.debug("referenceId", referenceId)
    const res = await apiCall.references.get(referenceId)
    const jsonRes = await res.json()
    setReference(jsonRes)
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (referenceId) fetchData()
  }, [referenceId, openEditModal])

  if (!referenceId) return <></>

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
    handleCloseEditModal()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("La référence a été mis à jour !")
    setFile(null)
    handleCloseEditModal()
    fetch()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
  }
  const processLogo = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadLogoRes = await apiCall.references.addLogo(compressedImage)
      if (uploadLogoRes && uploadLogoRes.ok) {
        const logoResJson = await uploadLogoRes.json()
        return logoResJson.id
      } else {
        handleError()
        return null
      }
    }
    // If the references already has a logo and user doesn't ask for change
    else if (reference.logo.id) return reference.logo.id
    // If the reference has no logo (or no more)
    else return null
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const logoId = await processLogo()
    const localReference = { ...reference, logo: { id: logoId } }
    const res = await apiCall.references.update(localReference)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new logo uploaded but reference update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }
  const detachBgImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setReference({ ...reference, logo: { id: "" } })
  }

  // SUB-COMPONENTS
  const SelectZone = () => (
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
              <Typography color={errors.type ? "error.main" : "secondary"}>
                Catégorie *
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

  const IdInput = () => (
    <CustomOutlinedInput
      disabled
      type="input"
      id="id"
      label="ID"
      value={reference.id || ""}
    />
  )

  const LogoInput = () => (
    <DropzoneShowImage
      bgImage={reference.logo?.url || ""}
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
      <ModalTitle>Modifier la référence</ModalTitle>

      <CustomForm gap={3}>
        <IdInput />

        <LogoInput />

        <SelectZone />

        <CustomOutlinedInput
          type="label"
          id="label"
          label="Client"
          value={reference.label || ""}
          onChange={handleChange("label")}
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

export default withConfirmAction(EditReferenceModal)
