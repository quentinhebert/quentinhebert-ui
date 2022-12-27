import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import compressImage from "../../../services/images"
import { AppContext } from "../../../contexts/AppContext"
import DeleteIcon from "@mui/icons-material/Delete"
import CustomModal from "../custom-modal"
import PillButton from "../../Buttons/pill-button"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import DropzoneShowImage from "../../Images/drop-zone-show-image"
import CustomAccordion from "../../Containers/custom-accordion"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomSelectOption from "../../Inputs/custom-select-option"
import CustomOutlinedSelect from "../../Inputs/custom-outlined-select"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomOutlinedInput from "../../Inputs/custom-outlined-input"
import CustomOutlinedTextArea from "../../Inputs/custom-outlined-text-area"
import CustomForm from "../../Forms/custom-form"

const currentYear = new Date().getFullYear()

function AddWebsiteModal(props) {
  const {
    refreshData,
    open,
    handleClose,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [file, setFile] = useState(null)
  const initialWebsite = {
    thumbnail: file,
    url: "",
    description: "",
    tags: [],
    year: "",
    client: "",
  }
  const [websiteTags, setWebsiteTags] = useState(null)
  const [website, setWebsite] = useState(initialWebsite)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState(null)

  // Fetch website tags
  const fetchWebsiteTags = async () => {
    const res = await apiCall.websites.tags.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setWebsiteTags(jsonRes)
    }
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (open) {
      fetchWebsiteTags()
    }
  }, [open])

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
    event.stopPropagation()
    event.preventDefault()
    let localAttribute = website[attribute]
    if (event.target.checked) {
      localAttribute.push(item)
    } else {
      localAttribute = localAttribute.filter((elt) => elt.id !== item.id)
    }
    setWebsite({ ...website, [attribute]: localAttribute })
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Un nouveau site est apparu dans votre portfolio ! 🤩")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Le site web n'a pas pu être ajouté...")
  }
  const handleErrorThumbnail = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Une erreur est survenue lors de l'upload de la vignette..."
    )
  }
  const processThumbnail = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadThumbnailRes = await apiCall.websites.addThumbnail(
        compressedImage
      )
      if (uploadThumbnailRes && uploadThumbnailRes.ok) {
        const thumbnailJson = await uploadThumbnailRes.json()
        return thumbnailJson.id
      } else {
        handleErrorThumbnail()
        return null
      }
    } else return null
  }
  const handleCreate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const thumbnailId = await processThumbnail()
    const localWebsite = { ...website, thumbnail: { id: thumbnailId } }
    const res = await apiCall.websites.add(localWebsite)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
    } else {
      // TODO: if new thumbnail uploaded but website update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }
  const handleChangeNewTag = (e) => {
    setNewTag(e.target.value)
  }
  const handleAddWebsiteTag = async () => {
    const res = await apiCall.websites.tags.add(newTag)
    if (res && res.ok) {
      fetchWebsiteTags()
      setNewTag(null)
    }
  }
  const deleteWebsiteTag = async (tagId) => {
    const res = await apiCall.websites.tags.delete(tagId)
    if (res && res.ok) return fetchWebsiteTags()
  }
  const handleDeleteWebsiteTag = (tagId) => {
    setActionToFire(() => async () => deleteWebsiteTag(tagId))
    setOpenConfirmModal(true)
    setConfirmTitle("Voulez vous vraiment supprimer définitivement ce tag ?")
    setConfirmContent({
      text: "La suppression est définitive et affectera tous les sites web reliés à ce tag.",
    })
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
              <Typography color={errors.year ? "error.main" : "secondary"}>
                Année *
              </Typography>
            )
      }
    >
      {Array.from(
        { length: currentYear - 1999 },
        (v, k) => currentYear + 1 - k - 1
      ).map((item, key) => (
        <CustomSelectOption value={item} key={key}>
          {item}
        </CustomSelectOption>
      ))}
    </CustomOutlinedSelect>
  )

  const ThumbnailInput = () => (
    <DropzoneShowImage
      bgImage={website.thumbnail?.url || ""}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Ajouter un site web</ModalTitle>

      <CustomForm gap={3}>
        <ThumbnailInput />

        <SelectZone />

        <CustomOutlinedInput
          type="input"
          id="url"
          label="Lien du site"
          value={website.url || ""}
          onChange={handleChange("url")}
        />
        <CustomOutlinedInput
          type="input"
          id="client"
          label="Nom du site / client"
          value={website.client || ""}
          onChange={handleChange("client")}
        />

        <CustomOutlinedTextArea
          required
          id="description"
          label="Description du site"
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
          <CustomAccordion title="Ajoutez des tags à ce projet">
            <Stack className="row gap-10">
              <CustomOutlinedInput
                type="input"
                label="Ajouter un tag"
                value={newTag || ""}
                onChange={handleChangeNewTag}
                sx={{ marginBottom: "1rem" }}
              />
              <PillButton fontSize="0.8rem" onClick={handleAddWebsiteTag}>
                Ajouter
              </PillButton>
            </Stack>
            {websiteTags &&
              websiteTags.map((item, key) => (
                <Stack className="row full-width" alignItems="center">
                  <Stack flexGrow={1}>
                    <CustomCheckbox
                      key={key}
                      checked={
                        (website.tags &&
                          website.tags.filter(
                            (tagsItem) => tagsItem.id === item.id
                          ).length === 1) ||
                        false
                      }
                      label={item.label}
                      labelcolor="#fff"
                      fontSize="0.9rem"
                      onChange={handleChangeMultipleCheckbox("tags", item)}
                    />
                  </Stack>
                  <DeleteIcon
                    color="secondary"
                    onClick={() => handleDeleteWebsiteTag(item.id)}
                    sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
                  />
                </Stack>
              ))}
          </CustomAccordion>
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton secondary="true" onClick={handleCreate}>
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </RectangleButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default withConfirmAction(AddWebsiteModal)
