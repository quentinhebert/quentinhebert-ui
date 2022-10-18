import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import TextArea from "../../ReusableComponents/forms/custom-outlined-text-area"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomOutlinedSelect from "../../ReusableComponents/forms/custom-outlined-select"
import SelectOption from "../../ReusableComponents/forms/custom-select-option"
import DualInputLine from "../../ReusableComponents/forms/responsive-dual-input-container"
import CustomCheckbox from "../../ReusableComponents/forms/custom-checkbox"
import CustomAccordion from "../../ReusableComponents/containers/custom-accordion"
import DropzoneShowImage from "../../ReusableComponents/images/drop-zone-show-image"
import compressImage from "../../../services/images"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import { AppContext } from "../../../contexts/AppContext"

const currentYear = new Date().getFullYear()

function EditWebsiteModal(props) {
  const { websiteId, openEditModal, handleCloseEditModal } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialWebsite = {
    id: null,
    thumbnail: { id: "", url: "" },
    url: "",
    description: "",
    tags: [],
    year: "",
    client: "",
  }
  const [websiteTags, setWebsiteTags] = useState(null)
  const [website, setWebsite] = useState(initialWebsite)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.admin.getWebsite(websiteId)
    const jsonRes = await res.json()
    setWebsite(jsonRes)
  }
  const fetchWebsiteTags = async () => {
    const res = await apiCall.unauthenticated.getWebsiteTags()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setWebsiteTags(jsonRes)
    }
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (websiteId) {
      fetchData()
      fetchWebsiteTags()
    }
  }, [websiteId, openEditModal])

  if (!websiteId) return <></>

  // HANDLERS
  const handleChange = (attribute, subAttribute) => (e) => {
    if (subAttribute)
      setWebsite({
        ...website,
        [attribute]: {
          ...website[attribute],
          [subAttribute]: e.target.value,
        },
      })
    else setWebsite({ ...website, [attribute]: e.target.value })
  }
  const handleChangeMultipleCheckbox = (attribute, item) => (event) => {
    const localAttribute = website[attribute]
    if (event.target.checked) {
      localAttribute.push(item)
    } else {
      localAttribute = localAttribute.filter((elt) => elt.id !== item.id)
    }
    setWebsite({ ...website, [attribute]: localAttribute })
  }
  const handleCancel = () => {
    handleCloseEditModal()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Le site web a été mis à jour !")
    setFile(null)
    handleCloseEditModal()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
  }
  const processThumbnail = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadThumbnailRes = await apiCall.admin.addWebsiteThumbnail(
        compressedImage
      )
      if (uploadThumbnailRes && uploadThumbnailRes.ok) {
        const thumbnailJson = await uploadThumbnailRes.json()
        return thumbnailJson.id
      } else {
        handleErrorThumbnail()
        return null
      }
    }
    // If the websites already has a thumbnail and user doesn't ask for change
    else if (website.thumbnail.id) return website.thumbnail.id
    // If the website has no thumbnail (or no more)
    else return null
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const thumbnailId = await processThumbnail()
    const localWebsite = { ...website, thumbnail: { id: thumbnailId } }
    const res = await apiCall.admin.updateWebsite(localWebsite)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new thumbnail uploaded but website update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }
  const detachBgImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWebsite({ ...website, thumbnail: { id: "" } })
  }

  // SUB-COMPONENTS
  const SelectZone = () => (
    <CustomOutlinedSelect
      required
      id="year"
      value={website.year}
      onChange={handleChange("year")}
      renderValue={
        // Trick for placeholder hiding
        website.year !== ""
          ? undefined
          : () => (
              <Typography color={errors.budget ? "error.main" : "secondary"}>
                Année *
              </Typography>
            )
      }
    >
      {Array.from(
        { length: currentYear - 1999 },
        (v, k) => currentYear + 1 - k - 1
      ).map((item, key) => (
        <SelectOption value={item} key={key}>
          {item}
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
      value={website.id || ""}
    />
  )

  const ThumbnailInput = () => (
    <DropzoneShowImage
      bgImage={website.thumbnail?.url || ""}
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
      <ModalTitle>Modifier le site web</ModalTitle>

      <CustomForm gap={3}>
        <IdInput />

        <ThumbnailInput />

        <SelectZone />

        <CustomOutlinedInput
          type="input"
          id="url"
          label="URL"
          value={website.url || ""}
          onChange={handleChange("url")}
        />
        <CustomOutlinedInput
          type="input"
          id="client"
          label="Client"
          value={website.client || ""}
          onChange={handleChange("client")}
        />

        <TextArea
          required
          id="description"
          label="À propos de ce projet..."
          value={website.description}
          onChange={handleChange("description")}
          sx={{
            "& .MuiInputLabel-root": {
              color: errors.description
                ? (theme) => theme.palette.error.main
                : (theme) => theme.palette.text.secondary,
            },
          }}
        />

        <Stack width="100%">
          <CustomAccordion title="Tags liés au projet">
            {websiteTags &&
              websiteTags.map((item, key) => (
                <CustomCheckbox
                  key={key}
                  checked={
                    (website.tags &&
                      website.tags.filter((tagsItem) => tagsItem.id === item.id)
                        .length === 1) ||
                    false
                  }
                  label={item.label}
                  labelcolor="#fff"
                  fontSize="0.9rem"
                  onChange={handleChangeMultipleCheckbox("tags", item)}
                />
              ))}
          </CustomAccordion>
        </Stack>

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

export default withConfirmAction(EditWebsiteModal)
