import { Stack, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import LanguageIcon from "@mui/icons-material/Language"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"

import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import CustomModal from "../../Modals/custom-modal"
import CustomForm from "../../Forms/custom-form"
import TextArea from "../../Inputs/custom-outlined-text-area"
import CustomOutlinedInput from "../../Inputs/custom-outlined-input"
import CustomOutlinedSelect from "../../Inputs/custom-outlined-select"
import SelectOption from "../../Inputs/custom-select-option"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomAccordion from "../../Containers/custom-accordion"
import DropzoneShowImage from "../../Images/drop-zone-show-image"
import compressImage from "../../../services/images"
import { AppContext } from "../../../contexts/AppContext"
import PillButton from "../../Buttons/pill-button"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import AddEditToggle from "../../Navigation/add-edit-toggle"
import { ADD_EDIT_ENUM } from "../../../enums/modesEnum"
import BasicTooltip from "../../Helpers/basic-tooltip"
import BodyText from "../../Text/body-text"
import AlertInfo from "../../Other/alert-info"
import useConfirm from "../../../hooks/useConfirm"

const currentYear = new Date().getFullYear()

export default function EditWebsiteModal(props) {
  const { websiteId, openEditModal, handleCloseEditModal, refreshData } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage, handleError, handleSuccess } =
    useContext(AppContext)

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
  const initialNewTag = { label: { fr: "", en: "" }, description: "" }
  const [newTag, setNewTag] = useState(initialNewTag)
  const [mode, setMode] = useState(ADD_EDIT_ENUM.ADD)

  const ConfirmDialog = useConfirm()

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.websites.get(websiteId)
    const jsonRes = await res.json()
    setWebsite(jsonRes)
  }
  const fetchWebsiteTags = async () => {
    const res = await apiCall.websites.tags.getAll()
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
    let localAttribute = website[attribute]
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
  const processThumbnail = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError("Une erreur est survenue")
      const uploadThumbnailRes = await apiCall.websites.addThumbnail(
        compressedImage
      )
      if (uploadThumbnailRes && uploadThumbnailRes.ok) {
        const thumbnailJson = await uploadThumbnailRes.json()
        return thumbnailJson.id
      } else {
        handleError("Une erreur est survenue lors de l'optimisation de l'image")
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
    const res = await apiCall.websites.update(localWebsite)
    if (res && res.ok) {
      handleSuccess("Le site web a été mis à jour !")
      setFile(null)
      handleCloseEditModal()
      if (!!refreshData) refreshData()
    } else {
      // TODO: if new thumbnail uploaded but website update fails, need to remove file just uploaded (DB and FTP)
      handleError("Une erreur est survenue")
    }
    setIsLoading(false)
  }
  const detachBgImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWebsite({ ...website, thumbnail: { id: "" } })
  }
  const handleChangeNewTag = (attribute, lang) => (e) => {
    setNewTag({ ...newTag, [attribute]: { [lang]: e.target.value } })
  }
  const handleAddWebsiteTag = async () => {
    const res = await apiCall.websites.tags.add(newTag)
    if (res && res.ok) {
      setSnackMessage("Le tag a bien été créé")
      setSnackSeverity("success")
      setNewTag(initialNewTag)
      return await fetchWebsiteTags()
    }
  }
  const deleteWebsiteTag = async (tag) => {
    const res = await apiCall.websites.tags.delete(tag.id)
    if (res && res.ok) {
      setSnackMessage("Le tag a bien été supprimé")
      setSnackSeverity("success")
      return await fetchWebsiteTags()
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
  }
  const handleDeleteWebsiteTag = (tag) => {
    const title = `Voulez vous vraiment supprimer définitivement le tag "${tag.label.fr}" ?`
    const message =
      "La suppression est définitive et affectera tous les sites web reliés à ce tag."
    const nextBtnText = "Supprimer"
    const nextAction = async () => await deleteWebsiteTag(tag)

    ConfirmDialog.setContent({ title, message, nextBtnText, nextAction })
  }
  const handleCancelEditTags = async () => {
    await fetchWebsiteTags()
    setMode(ADD_EDIT_ENUM.ADD)
  }
  const handleUpdateWebsiteTag = async () => {
    const res = await apiCall.websites.tags.update(websiteTags)
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Modifications enregistrées")
      setMode(ADD_EDIT_ENUM.ADD)
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
    }
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
          value={website.description.fr}
          onChange={handleChange("description", "fr")}
          InputLabelProps={{ shrink: !!website.description.fr }}
          sx={{
            "& .MuiInputLabel-root": {
              color: errors.description
                ? (theme) => theme.palette.error.main
                : (theme) => theme.palette.text.secondary,
            },
          }}
        />
        <CustomAccordion
          title={
            <Stack className="row flex-center gap-10">
              <LanguageIcon />
              Traductions
            </Stack>
          }
        >
          <TextArea
            InputLabelProps={{ shrink: !!website.description.en }}
            id="translation"
            label="English (EN)"
            value={website.description.en}
            onChange={handleChange("description", "en")}
            sx={{
              "& .MuiInputLabel-root": {
                color: errors.description
                  ? (theme) => theme.palette.error.main
                  : (theme) => theme.palette.text.secondary,
              },
            }}
          />
        </CustomAccordion>

        <Stack width="100%">
          <CustomAccordion
            title={
              <Stack className="row flex-center gap-10">
                <LocalOfferIcon />
                Tags liés au projet
              </Stack>
            }
          >
            <Stack gap={4}>
              <AddEditToggle mode={mode} setMode={setMode} />

              {mode === ADD_EDIT_ENUM.ADD && (
                <Stack gap={1}>
                  <CustomOutlinedInput
                    type="input"
                    label="Nouveau tag"
                    value={newTag.label.fr || ""}
                    onChange={handleChangeNewTag("label", "fr")}
                  />
                  <CustomOutlinedInput
                    type="input"
                    label="Traduction (EN)"
                    value={newTag.label.en || ""}
                    onChange={handleChangeNewTag("label", "en")}
                  />
                  <PillButton onClick={handleAddWebsiteTag} width="100%">
                    Ajouter
                  </PillButton>
                </Stack>
              )}

              {mode === ADD_EDIT_ENUM.EDIT && (
                <Stack className="gap-10 flex-center">
                  <AlertInfo
                    content={{
                      show: true,
                      title: "Modification globale",
                      text: "Attention, les modifications impacteront tous les sites web auxquels les tags sont rattachés.",
                      severity: "warning",
                    }}
                  />
                  <PillButton
                    onClick={handleUpdateWebsiteTag}
                    endIcon={<CheckIcon />}
                  >
                    Enregistrer les modifications
                  </PillButton>
                  <BodyText
                    className="pointer cool-button"
                    onClick={handleCancelEditTags}
                  >
                    Annuler
                  </BodyText>
                </Stack>
              )}

              <Stack>
                {websiteTags &&
                  websiteTags.map((item, key) => (
                    <Stack
                      className="row full-width gap-10"
                      alignItems="baseline"
                    >
                      <CustomCheckbox
                        key={key}
                        checked={
                          (website.tags &&
                            website.tags.filter(
                              (tagsItem) => tagsItem.id === item.id
                            ).length === 1) ||
                          false
                        }
                        label={mode === ADD_EDIT_ENUM.ADD ? item.label.fr : ""}
                        labelcolor="#fff"
                        fontSize="0.9rem"
                        onChange={handleChangeMultipleCheckbox("tags", item)}
                      />
                      <Stack flexGrow={1} />
                      {mode === ADD_EDIT_ENUM.EDIT && (
                        <Stack gap={2} mb={6} width="100%">
                          <TextField
                            variant="standard"
                            value={item.label.fr}
                            label="Français (FR)"
                            onChange={(e) => {
                              const localTags = [...websiteTags]
                              localTags[key] = {
                                ...localTags[key],
                                label: {
                                  ...localTags[key].label,
                                  fr: e.target.value,
                                },
                              }
                              setWebsiteTags(localTags)
                            }}
                            color="secondary"
                            sx={{ "& .MuiInput-input": { color: "#fff" } }}
                          />
                          <TextField
                            variant="standard"
                            value={item.label.en}
                            label="English (EN)"
                            onChange={(e) => {
                              const localTags = [...websiteTags]
                              localTags[key] = {
                                ...localTags[key],
                                label: {
                                  ...localTags[key].label,
                                  en: e.target.value,
                                },
                              }
                              setWebsiteTags(localTags)
                            }}
                            color="secondary"
                            sx={{ "& .MuiInput-input": { color: "#fff" } }}
                          />
                        </Stack>
                      )}
                      <BasicTooltip title="Supprimer le tag">
                        <DeleteIcon
                          onClick={() => handleDeleteWebsiteTag(item)}
                          sx={{
                            cursor: "pointer",
                            "&:hover": { opacity: 0.5 },
                            color: (theme) => theme.alert.title.error.color,
                          }}
                        />
                      </BasicTooltip>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </CustomAccordion>
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton
            secondary="true"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </RectangleButton>
        </Stack>
      </CustomForm>

      <CustomModal
        open={ConfirmDialog.open}
        handleClose={ConfirmDialog.handleClose}
      >
        <ConfirmDialog.DialogContent />
      </CustomModal>
    </CustomModal>
  )
}
