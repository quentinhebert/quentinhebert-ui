import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import compressImage from "../../../services/images"
import { AppContext } from "../../../contexts/AppContext"
import CustomModal from "../custom-modal"
import CustomForm from "../../Forms/custom-form"
import CustomOutlinedTextArea from "../../Inputs/custom-outlined-text-area"
import CustomOutlinedInput from "../../Inputs/custom-outlined-input"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomOutlinedSelect from "../../Inputs/custom-outlined-select"
import CustomSelectOption from "../../Inputs/custom-select-option"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomAccordion from "../../Containers/custom-accordion"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import DropzoneShowImage from "../../Images/drop-zone-show-image"
import LanguageIcon from "@mui/icons-material/Language"

const currentYear = new Date().getFullYear()

function AddFilmModal(props) {
  const { refreshData, open, handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [file, setFile] = useState(null)
  const initialFilm = {
    thumbnail: file,
    title: "",
    url: "",
    description: { fr: "", en: "" },
    gear: [],
    roles: [],
    year: "",
    client: "",
    type: { id: "", label: "" },
  }
  const [filmTypes, setFilmTypes] = useState(null)
  const [filmGear, setFilmGear] = useState(null)
  const [filmRoles, setFilmRoles] = useState(null)
  const [film, setFilm] = useState(initialFilm)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data
  const fetchFilmTypes = async () => {
    const res = await apiCall.films.types.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFilmTypes(jsonRes)
    }
  }
  const fetchFilmGear = async () => {
    const res = await apiCall.films.gear.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFilmGear(jsonRes)
    }
  }
  const fetchFilmRoles = async () => {
    const res = await apiCall.films.roles.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFilmRoles(jsonRes)
    }
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (open) {
      fetchFilmTypes()
      fetchFilmGear()
      fetchFilmRoles()
    }
  }, [open])

  // HANDLERS
  const handleChange = (attribute, subAttribute) => (e) => {
    if (subAttribute)
      setFilm({
        ...film,
        [attribute]: {
          ...film[attribute],
          [subAttribute]: e.target.value,
        },
      })
    else setFilm({ ...film, [attribute]: e.target.value })
  }
  const handleChangeMultipleCheckbox = (attribute, item) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    let localAttribute = film[attribute]
    if (event.target.checked) {
      localAttribute.push(item)
    } else {
      localAttribute = localAttribute.filter((elt) => elt.id !== item.id)
    }
    setFilm({ ...film, [attribute]: localAttribute })
  }
  const handleCancel = () => {
    handleClose()
    setFilm(initialFilm)
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("The category has been changed successfully !")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Le film n'a pas pu sortir en salle...")
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
      const uploadThumbnailRes = await apiCall.films.addThumbnail(
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
    const localFilm = { ...film, thumbnail: { id: thumbnailId } }
    const res = await apiCall.films.add(localFilm)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
      setFilm(initialFilm)
    } else {
      // TODO: if new thumbnail uploaded but film update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  // SUB-COMPONENTS
  const SelectZone = () => (
    <DualInputLine>
      <CustomOutlinedSelect
        required
        id="type"
        value={film.type && film.type.id}
        onChange={handleChange("type", "id")}
        renderValue={
          // Trick for placeholder hiding
          film.type && film.type.id !== ""
            ? undefined
            : () => (
                <Typography color={errors.budget ? "error.main" : "secondary"}>
                  Catégorie *
                </Typography>
              )
        }
      >
        {filmTypes &&
          filmTypes.map((type, key) => (
            <CustomSelectOption value={type.id} key={key}>
              {type.label.fr}
            </CustomSelectOption>
          ))}
      </CustomOutlinedSelect>
      <CustomOutlinedSelect
        required
        id="year"
        value={film.year}
        onChange={handleChange("year")}
        renderValue={
          // Trick for placeholder hiding
          film.year !== ""
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
          <CustomSelectOption value={item} key={key}>
            {item}
          </CustomSelectOption>
        ))}
      </CustomOutlinedSelect>
    </DualInputLine>
  )

  const ThumbnailInput = () => (
    <DropzoneShowImage
      bgImage={film.thumbnail?.url || ""}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Ajouter un film</ModalTitle>

      <CustomForm gap={3}>
        <ThumbnailInput />

        <SelectZone />

        <CustomOutlinedInput
          type="input"
          id="url"
          label="URL"
          value={film.url || ""}
          onChange={handleChange("url")}
        />
        <CustomOutlinedInput
          type="input"
          id="client"
          label="Client"
          value={film.client || ""}
          onChange={handleChange("client")}
        />
        <CustomOutlinedInput
          type="input"
          id="title"
          label="Titre"
          value={film.title || ""}
          onChange={handleChange("title")}
        />

        <CustomOutlinedTextArea
          required
          id="description"
          label="À propos de ce projet..."
          value={film.description?.fr}
          onChange={handleChange("description", "fr")}
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
          <CustomOutlinedTextArea
            required
            id="description"
            label="English (EN)"
            value={film.description?.en}
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
          <CustomAccordion title="Matériel utilisé">
            {filmGear &&
              filmGear.map((item, key) => (
                <CustomCheckbox
                  key={key}
                  checked={
                    (film.gear &&
                      film.gear.filter((gearItem) => gearItem.id === item.id)
                        .length === 1) ||
                    false
                  }
                  label={item.label?.fr}
                  labelcolor="#fff"
                  fontSize="0.9rem"
                  onChange={handleChangeMultipleCheckbox("gear", item)}
                />
              ))}
          </CustomAccordion>
          <CustomAccordion title="Mes rôles sur ce projet...">
            {filmRoles &&
              filmRoles.map((item, key) => (
                <CustomCheckbox
                  key={key}
                  checked={
                    (film.roles &&
                      film.roles.filter((rolesItem) => rolesItem.id === item.id)
                        .length === 1) ||
                    false
                  }
                  label={item.label?.fr}
                  labelcolor="#fff"
                  fontSize="0.9rem"
                  onChange={handleChangeMultipleCheckbox("roles", item)}
                />
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

export default withConfirmAction(AddFilmModal)
