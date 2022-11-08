import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../Modals/custom-modal"
import CustomForm from "../../Forms/custom-form"
import TextArea from "../../Inputs/custom-outlined-text-area"
import CustomOutlinedInput from "../../Inputs/custom-outlined-input"
import CustomOutlinedSelect from "../../Inputs/custom-outlined-select"
import SelectOption from "../../Inputs/custom-select-option"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomAccordion from "../../Containers/custom-accordion"
import DropzoneShowImage from "../../Images/drop-zone-show-image"
import compressImage from "../../../services/images"
import { AppContext } from "../../../contexts/AppContext"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import RectangleButton from "../../Buttons/rectangle-button"

const currentYear = new Date().getFullYear()

function EditFilmModal(props) {
  const { filmId, open, handleClose, fetch } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialFilm = {
    id: null,
    thumbnail: { id: "", url: "" },
    title: "",
    url: "",
    description: "",
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
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.films.get(filmId)
    const jsonRes = await res.json()
    setFilm(jsonRes)
  }
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
    if (filmId && open) {
      fetchData()
      fetchFilmTypes()
      fetchFilmGear()
      fetchFilmRoles()
    }
  }, [filmId, open])

  if (!filmId) return <></>

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
    const localAttribute = film[attribute]
    if (event.target.checked) {
      localAttribute.push(item)
    } else {
      localAttribute = localAttribute.filter((elt) => elt.id !== item.id)
    }
    setFilm({ ...film, [attribute]: localAttribute })
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Le film a été mis à jour !")
    setFile(null)
    handleClose()
    fetch()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
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
    }
    // If the films already has a thumbnail and user doesn't ask for change
    else if (film.thumbnail.id) return film.thumbnail.id
    // If the film has no thumbnail (or no more)
    else return null
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    // Compress the image before sending it to the API
    const thumbnailId = await processThumbnail()
    const localFilm = { ...film, thumbnail: { id: thumbnailId } }
    const res = await apiCall.films.update(localFilm)
    if (res && res.ok) {
      handleSuccess()
    } else {
      // TODO: if new thumbnail uploaded but film update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }
  const detachBgImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFilm({ ...film, thumbnail: { id: "" } })
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
            <SelectOption value={type.id} key={key}>
              {type.label}
            </SelectOption>
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
          <SelectOption value={item} key={key}>
            {item}
          </SelectOption>
        ))}
      </CustomOutlinedSelect>
    </DualInputLine>
  )

  const IdInput = () => (
    <CustomOutlinedInput
      disabled
      type="input"
      id="id"
      label="ID"
      value={film.id || ""}
    />
  )

  const ThumbnailInput = () => (
    <DropzoneShowImage
      bgImage={film.thumbnail?.url || ""}
      detachBgImage={detachBgImage}
      file={file}
      setFile={setFile}
    />
  )

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Modifier le film</ModalTitle>

      <CustomForm gap={3}>
        <IdInput />

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

        <TextArea
          required
          id="description"
          label="À propos de ce projet..."
          value={film.description}
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
                  label={item.label}
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
                  label={item.label}
                  labelcolor="#fff"
                  fontSize="0.9rem"
                  onChange={handleChangeMultipleCheckbox("roles", item)}
                />
              ))}
          </CustomAccordion>
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <RectangleButton onClick={handleClose}>Annuler</RectangleButton>
          <RectangleButton
            secondary="true"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </RectangleButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default withConfirmAction(EditFilmModal)
