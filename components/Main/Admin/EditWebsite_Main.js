import withConfirmAction from "../../hocs/withConfirmAction"
import { Grid, Stack, Typography, Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
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
import DeleteIcon from "@mui/icons-material/Delete"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import CustomModal from "../../Modals/custom-modal"
import Dropzone from "../../Images/drop-zone"
import { buildPublicURL } from "../../../services/utils"

const currentYear = new Date().getFullYear()

function EditWebsite_Main({
  websiteId,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
}) {
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
    images: [],
  }
  const [websiteTags, setWebsiteTags] = useState(null)
  const [website, setWebsite] = useState(initialWebsite)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState(null)
  const [openAddModal, setOpenAddModal] = useState(false)
  const handleCloseModal = () => setOpenAddModal(false)

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
  }, [websiteId])

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
  const throttledProcess = async (items, interval, response) => {
    if (items.length == 0) {
      console.log("ALL DONE")
      const localWebsite = website
      localWebsite.images = response
      const res = await apiCall.websites.linkImages(website)
      if (res && res.ok) {
        handleCloseModal()
        fetchData()
        setIsLoading(false)
      }
      return
    }

    // Process iteration
    const compressedImage = await compressImage(items[0])
    if (!compressedImage) return handleError()
    const uploadRes = await apiCall.websites.addImage(compressedImage)
    if (uploadRes && uploadRes.ok) {
      const uploadJson = await uploadRes.json()
      response.push(uploadJson.id)
    }

    setTimeout(
      () => throttledProcess(items.slice(1), interval, response),
      interval
    )
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    let response = []
    await throttledProcess(files, 1000, response) // FIXME: use promise await instead of throttle
  }

  // SUB-COMPONENTS
  const YearInput = () => (
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
    <Stack zIndex={0} gap={4}>
      <CenteredMaxWidthContainer>
        <Typography variant="h2" color="secondary">
          Informations
        </Typography>
        <CustomForm gap={3}>
          <IdInput />

          <CustomOutlinedInput
            type="input"
            id="url"
            label="URL"
            value={website.url || ""}
            onChange={handleChange("url")}
          />

          <YearInput />

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
            <RectangleButton
              secondary="true"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
            </RectangleButton>
          </Stack>
        </CustomForm>
      </CenteredMaxWidthContainer>

      <CenteredMaxWidthContainer>
        <Typography variant="h2" color="secondary">
          Photo principale
        </Typography>
        <Stack maxWidth="400px">
          <ThumbnailInput />
        </Stack>
      </CenteredMaxWidthContainer>

      <CenteredMaxWidthContainer>
        <Typography variant="h2" color="secondary">
          Galerie
        </Typography>
        <Stack maxWidth="400px">
          <PillButton onClick={() => setOpenAddModal(true)}>
            Ajouter des photos
          </PillButton>
        </Stack>
        <Grid container spacing={1} padding="1rem 0">
          {website.images.map((image, key) => (
            <Grid
              item
              xs={6}
              md={4}
              lg={3}
              xl={2}
              key={key}
              sx={{
                aspectRatio: "1",
              }}
            >
              <Box
                component="img"
                width="100%"
                height="100%"
                src={buildPublicURL(image.path, { imgSize: "small" })}
                sx={{ objectFit: "cover", objectPosition: "50%" }}
              />
            </Grid>
          ))}
        </Grid>
      </CenteredMaxWidthContainer>

      <CustomModal
        open={openAddModal}
        handleClose={handleCloseModal}
        fullscreen
        gap={2}
      >
        <Typography variant="h2" color="secondary">
          Ajouter des photos à la galerie
        </Typography>
        <Dropzone files={files} setFiles={setFiles} />
        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <RectangleButton onClick={handleCloseModal}>Annuler</RectangleButton>
          <RectangleButton
            secondary="true"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </RectangleButton>
        </Stack>
      </CustomModal>
    </Stack>
  )
}

export default withConfirmAction(EditWebsite_Main)
