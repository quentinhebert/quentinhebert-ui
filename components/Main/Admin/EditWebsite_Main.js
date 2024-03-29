import withConfirmAction from "../../hocs/withConfirmAction"
import { Grid, Stack, Typography, Box, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
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
import CustomModal from "../../Modals/custom-modal"
import Dropzone from "../../Images/drop-zone"
import { buildPublicURL } from "../../../services/utils"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelButton from "../../Buttons/cancel-button"
import AddIcon from "@mui/icons-material/Add"
import LanguageIcon from "@mui/icons-material/Language"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import AddEditToggle from "../../Navigation/add-edit-toggle"
import { ADD_EDIT_ENUM } from "../../../enums/modesEnum"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import BasicTooltip from "../../Helpers/basic-tooltip"
import AlertInfo from "../../Other/alert-info"
import CheckIcon from "@mui/icons-material/Check"
import BodyText from "../../Text/body-text"

const AddImageGridItem = (props) => (
  <Grid
    item
    xs={6}
    md={4}
    lg={3}
    xl={2}
    sx={{
      aspectRatio: "1",
    }}
  >
    <Stack
      width="100%"
      height="100%"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: (theme) => theme.palette.background.secondary,
        borderRadius: "15px",
        cursor: "pointer",
        gap: 2,
        "& > .MuiSvgIcon-root": {
          transition: "0.2s ease",
        },
        transition: "0.2s ease",
        "&:hover": {
          filter: "brightness(1.2)",
          "& > .MuiSvgIcon-root": {
            fontSize: "2rem",
          },
        },
      }}
      {...props}
    />
  </Grid>
)

const currentYear = new Date().getFullYear()

function EditWebsite_Main({
  websiteId,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
}) {
  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialWebsite = {
    id: null,
    thumbnail: { id: "", url: "" },
    url: "",
    description: { fr: "", en: "" },
    tags: [],
    year: "",
    client: "",
    images: [],
  }
  const initialNewTag = { label: { fr: "", en: "" }, description: "" }
  const [websiteTags, setWebsiteTags] = useState(null)
  const [website, setWebsite] = useState(initialWebsite)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState(initialNewTag)
  const [mode, setMode] = useState(ADD_EDIT_ENUM.ADD)
  const [imgToDelete, setImgToDelete] = useState([])
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
  const handleCancel = async () => {
    await fetchData()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Le site web a été mis à jour !")
    setFile(null)
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
        handleError()
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
  const handleChangeNewTag = (attribute, lang) => (e) => {
    setNewTag({
      ...newTag,
      [attribute]: { ...newTag[attribute], [lang]: e.target.value },
    })
  }
  const handleAddWebsiteTag = async () => {
    const res = await apiCall.websites.tags.add(newTag)
    if (res && res.ok) {
      fetchWebsiteTags()
      setNewTag(initialNewTag)
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
  const handleCancelEditTags = async () => {
    await fetchWebsiteTags()
    setMode(ADD_EDIT_ENUM.ADD)
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
  const asyncProcess = async (items) => {
    const finishedItems = []

    await Promise.all(
      items.map(async (item) => {
        const compressedImage = await compressImage(item)
        if (!compressedImage) return handleError()
        const uploadRes = await apiCall.websites.addImage(compressedImage)
        if (uploadRes && uploadRes.ok) {
          const uploadJson = await uploadRes.json()
          finishedItems.push(uploadJson.id)
        }
      })
    )

    const localWebsite = website
    localWebsite.images = finishedItems
    const res = await apiCall.websites.linkImages(website)
    if (res && res.ok) {
      handleCloseModal()
      fetchData()
      setIsLoading(false)
    }
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    let response = []
    // FIXME: use promise await instead of throttle
    await throttledProcess(files, 1000, response)
    // await asyncProcess(files)
  }
  const deleteImg = async () => {
    const res = await apiCall.websites.deleteImages({
      imgIds: imgToDelete,
      id: website.id,
    })
    if (res && res.ok) {
      setSnackMessage("Image(s) supprimée(s)")
      setSnackSeverity("success")
      fetchData()
      setImgToDelete([])
    } else {
      setSnackMessage("Erreur")
      setSnackSeverity("error")
    }
  }
  const handleDeleteImg = async () => {
    setConfirmTitle(`Supprimer ${imgToDelete.length} élément(s)`)
    setConfirmContent({
      text: "Voulez-vous supprimer les éléments sélectionnés ? Cette action est irréversible.",
    })
    setNextButtonText("Supprimer")
    setActionToFire(() => async () => await deleteImg())
    setOpenConfirmModal(true)
  }
  const handleSelect = (id) => () => {
    if (imgToDelete.includes(id))
      return setImgToDelete([...imgToDelete.filter((elt) => elt !== id)])
    setImgToDelete([...imgToDelete, id])
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
    <CenteredMaxWidthContainer
      zIndex={0}
      gap={8}
      percents={{ xs: "100%", sm: "80%" }}
    >
      <Stack>
        <Typography variant="h5" color="#fff" mb={2}>
          Informations
        </Typography>
        <CustomForm gap={3} maxWidth="800px">
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

          {/* <Stack width="100%">
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
                  <Stack
                    className="row full-width"
                    alignItems="center"
                    key={key}
                  >
                    <Stack flexGrow={1}>
                      <CustomCheckbox
                        checked={
                          (website.tags &&
                            website.tags.filter(
                              (tagsItem) => tagsItem.id === item.id
                            ).length === 1) ||
                          false
                        }
                        label={item.label.fr}
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
          </Stack> */}

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
                          label={
                            mode === ADD_EDIT_ENUM.ADD ? item.label.fr : ""
                          }
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

          <Stack width="100%">
            <Typography variant="h5" color="#fff" mb={2}>
              Photo principale
            </Typography>
            <Stack maxWidth="400px">
              <ThumbnailInput />
            </Stack>
          </Stack>

          <Stack flexDirection="row" gap={2} width="100%">
            <PillButton onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
            </PillButton>
            <CancelButton handleCancel={handleCancel} label="Réinitialiser" />
          </Stack>
        </CustomForm>
      </Stack>

      <Stack>
        <Typography variant="h5" color="#fff" mb={2}>
          Galerie
        </Typography>
        <Stack flexDirection="row" gap={2}>
          {!!imgToDelete.length && (
            <>
              <PillButton onClick={handleDeleteImg} startIcon={<DeleteIcon />}>
                Supprimer {imgToDelete.length} éléments(s)
              </PillButton>
              <CancelButton
                handleCancel={() => setImgToDelete([])}
                label="Désélectionner tout"
              />
            </>
          )}
        </Stack>
        <Grid container spacing={1} padding="1rem 0">
          <AddImageGridItem onClick={() => setOpenAddModal(true)}>
            <Typography fontWeight="bold">Ajouter des photos</Typography>
            <AddIcon />
          </AddImageGridItem>
          {website.images.map((image, key) => {
            const isSelected = imgToDelete.includes(image.id)
            return (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                xl={2}
                key={key}
                sx={{
                  aspectRatio: "1",
                  position: "relative",
                }}
              >
                <Box
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: isSelected
                      ? (theme) => `2px solid ${theme.palette.secondary.main}`
                      : "",
                  }}
                >
                  <Box
                    component="img"
                    width="100%"
                    height="100%"
                    src={buildPublicURL(image.path, { imgSize: "small" })}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "50%",
                      transition: "0.1s ease",
                      filter: isSelected ? "contrast(0.5) brightness(0.5)" : "",
                      cursor: "pointer",
                      "&:hover": {
                        filter: "contrast(0.5)",
                      },
                    }}
                    onClick={handleSelect(image.id)}
                  />
                  <Box sx={{ position: "absolute", top: 20, right: 10 }}>
                    {isSelected ? <CheckCircleIcon color="secondary" /> : <></>}
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Stack>

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
    </CenteredMaxWidthContainer>
  )
}

export default withConfirmAction(EditWebsite_Main)
