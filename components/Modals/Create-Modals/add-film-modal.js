import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withSnacks from "../../hocs/withSnacks"
import { ModalTitle } from "../Modal-Components/modal-title"
import { compose } from "redux"
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

const currentYear = new Date().getFullYear()

function AddFilmModal(props) {
  const {
    refreshData,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
    open,
    handleClose,
  } = props

  const [file, setFile] = useState(null)
  const initialFilm = {
    thumbnail: file,
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

  // Fetch data
  const fetchFilmTypes = async () => {
    const res = await apiCall.unauthenticated.getFilmTypes()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFilmTypes(jsonRes)
    }
  }
  const fetchFilmGear = async () => {
    const res = await apiCall.unauthenticated.getFilmGear()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFilmGear(jsonRes)
    }
  }
  const fetchFilmRoles = async () => {
    const res = await apiCall.unauthenticated.getFilmRoles()
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
    const localAttribute = film[attribute]
    if (event.target.checked) {
      localAttribute.push(item)
    } else {
      localAttribute = localAttribute.filter((elt) => elt.id !== item.id)
    }
    setFilm({ ...film, [attribute]: localAttribute })
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleSuccess = () => {
    setSeverity("success")
    setMessageSnack("The category has been changed successfully !")
    setOpenSnackBar(true)
    handleClose()
  }
  const handleError = () => {
    setSeverity("error")
    setMessageSnack("Le film n'a pas pu sortir en salle...")
    setOpenSnackBar(true)
  }
  const handleErrorThumbnail = () => {
    setSeverity("error")
    setMessageSnack(
      "Une erreur est survenue lors de l'upload de la vignette..."
    )
    setOpenSnackBar(true)
  }
  const processThumbnail = async () => {
    if (file) {
      const compressedImage = await compressImage(file)
      if (!compressedImage) return handleError()
      const uploadThumbnailRes = await apiCall.admin.addFilmThumbnail(
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
    // Compress the image before sending it to the API
    const thumbnailId = await processThumbnail()
    const localFilm = { ...film, thumbnail: { id: thumbnailId } }
    const res = await apiCall.admin.addFilm(localFilm)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
    } else {
      handleError()
    }
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
          <CustomSubmitButton onClick={handleCancel}>
            Annuler
          </CustomSubmitButton>
          <CustomSubmitButton secondary="true" onClick={handleCreate}>
            Enregistrer
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default compose(withSnacks, withConfirmAction)(AddFilmModal)