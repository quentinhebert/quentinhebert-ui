import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import apiCall from "../../../../services/apiCalls/apiCall"
import AddIcon from "@mui/icons-material/Add"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import withConfirmAction from "../../../hocs/withConfirmAction"
import PillButton from "../../../Buttons/pill-button"
import CustomCard from "../../../Cards/custom-card"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import CustomCheckbox from "../../../Inputs/custom-checkbox"
import CustomFilledInput from "../../../Inputs/custom-filled-input"
import PageTitle from "../../../Titles/page-title"
import DualInputLine from "../../../Containers/dual-input-line"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../../Text/body-text"
import CustomFilledSelect from "../../../Inputs/custom-filled-select"
import CustomSelectOption from "../../../Inputs/custom-select-option"

const AddressLine = (props) => (
  <BodyText {...props} preventTransition fontSize="1rem" />
)

function SelectAddressSection({
  defaultId,
  setParentAddress,
  delivery,
  handleNext,
  handleBack,
  idImpossibleToDelete,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setNextButtonText,
  setConfirmContent,
  setConfirmVariant,
}) {
  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const [savedAddresses, setSavedAddresses] = useState([])
  const initialAddress = {
    id: null,
    fullname: `${user.firstname || ""} ${user.lastname || ""}`,
    email: user.email,
    phone: "",
    line1: "",
    line2: "",
    postalCode: "",
    city: "",
    region: "",
    country: "France",
    details: "",
  }
  const [address, setAddress] = useState(initialAddress)
  const [certificate, setCertificate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [newAddress, setNewAddress] = useState(false)
  const requiredFields = ["fullname", "line1", "postalCode", "city", "country"]
  const initialErrors = {}
  requiredFields.map((field) => {
    initialErrors[field] = false
  })
  const [errors, setErrors] = useState(initialErrors)
  const [activeAddressIndex, setActiveAddressIndex] = useState(null)
  const [countries, setCountries] = useState(null)

  const fetchCountries = async () => {
    const res = await apiCall.application.countries.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setCountries(jsonRes)
    }
  }
  const fetchSavedAddresses = async () => {
    const res = await apiCall.clients.addresses.getAll(user)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSavedAddresses(jsonRes)
      if (jsonRes?.length > 0) {
        if (defaultId) {
          const localAddresses = jsonRes
          const defaultIndex = localAddresses.findIndex(
            (addr) => addr.id === defaultId
          )
          setAddress({
            ...jsonRes[defaultIndex],
            postalCode: jsonRes[defaultIndex].postal_code,
          })
          setActiveAddressIndex(defaultIndex)
        } else if (!activeAddressIndex) {
          setActiveAddressIndex(0)
          setAddress({
            id: jsonRes[0].id,
            fullname: `${user.firstname || ""} ${user.lastname || ""}`,
            email: user.email,
            phone: jsonRes[0].phone,
            line1: jsonRes[0].line1,
            line2: jsonRes[0].line2,
            postalCode: jsonRes[0].postal_code,
            city: jsonRes[0].city,
            region: jsonRes[0].region,
            country: jsonRes[0].country,
            details: jsonRes[0].details,
          })
        }
      }
    }
  }
  const handleChange = (attribute) => (event) => {
    setAddress({ ...address, [attribute]: event.target.value })
  }
  const checkRequiredFields = () => {
    const localErrors = initialErrors
    requiredFields.map((field) => {
      if (address[field].trim() === "") {
        localErrors[field] = true
      }
    })
    // If at least one error, then we don't send the request
    let errorsCount = Object.values(localErrors).filter(
      (err) => err === true
    ).length
    setErrors(localErrors) // Update errors helper texts
    return { errorsCount }
  }
  const addAddress = async (e) => {
    e.preventDefault()
    const { errorsCount } = checkRequiredFields()
    if (errorsCount > 0) return

    const res = await apiCall.clients.addresses.add({
      client: { id: user.id },
      address,
    })
    if (res && res.ok) {
      setSnackMessage("Adresse ajoutée")
      setSnackSeverity("success")
      setNewAddress(false)
      fetchSavedAddresses()
    }
    setCertificate(false)
  }
  const updateInformations = async () => {
    const { errorsCount } = checkRequiredFields()
    if (errorsCount > 0) return

    if (!address.id) return
    const res = await apiCall.clients.addresses.update({
      client: { id: user.id },
      address,
    })
    if (res && res.ok) {
      setSnackMessage(
        "Vos informations ont bien été enregistrées pour la procahine fois !"
      )
      setSnackSeverity("success")
      setEdit(false)
      fetchSavedAddresses()
    }
  }
  const handleCancel = () => {
    setEdit(false)
    setNewAddress(false)
    setCertificate(false)
    fetchSavedAddresses()
  }
  const handleDeleteSuccess = () => {
    setSnackMessage("Adresse supprimée")
    setSnackSeverity("success")
    setActiveAddressIndex(0)
    setAddress({
      ...savedAddresses[0],
      postalCode: savedAddresses[0].postal_code,
    })
    fetchSavedAddresses()
  }
  const handleDeleteError = () => {
    setSnackMessage("Erreur lors de la suppression de l'adresse")
    setSnackSeverity("error")
  }
  const deleteAddress = async (key) => {
    const res = await apiCall.clients.addresses.delete({
      client: user,
      address: { id: savedAddresses[key].id },
    })
    if (res && res.ok) handleDeleteSuccess()
    else handleDeleteError
  }
  const handleDelete = (key) => {
    setActionToFire(() => async () => deleteAddress(key))
    setConfirmTitle("Supprimer")
    setNextButtonText("Oui, supprimer l'adresse")
    setConfirmContent({
      text: "Voulez vous réellement supprimer cette adresse ?",
    })
    setConfirmVariant("delete")
    setOpenConfirmModal(true)
  }

  useEffect(() => {
    fetchSavedAddresses()
    fetchCountries()
  }, [])

  if (newAddress || edit)
    return (
      <CenteredMaxWidthContainer percents={{ xs: "100%", md: "80%" }}>
        <Stack sx={{ gap: { xs: 1, md: 2 } }}>
          <BodyText marginBottom={4} preventTransition>
            {edit ? "Modifier l'adresse" : "Ajouter une adresse"}
          </BodyText>

          <DualInputLine>
            <CustomFilledInput
              required
              className="full-width"
              label="Nom complet"
              value={address.fullname}
              onChange={handleChange("fullname")}
              error={errors.fullname}
              helperText={errors.fullname && "Veuillez remplir ce champ"}
            />
            <CustomFilledInput
              className="full-width"
              label="Téléphone"
              value={address.phone}
              onChange={handleChange("phone")}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomFilledInput
              required
              className="full-width"
              label="Ligne 1"
              value={address.line1}
              onChange={handleChange("line1")}
              error={errors.line1}
              helperText={errors.line1 && "Veuillez remplir ce champ"}
            />
            <CustomFilledInput
              className="full-width"
              label="Ligne 2"
              value={address.line2}
              onChange={handleChange("line2")}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomFilledInput
              required
              className="full-width"
              label="Ville"
              value={address.city}
              onChange={handleChange("city")}
              error={errors.city}
              helperText={errors.city && "Veuillez remplir ce champ"}
            />
            <CustomFilledInput
              type={address.country === "France" ? "tel" : "text"}
              maxlength="5"
              minlength="5"
              required
              className="full-width"
              label="Code postal"
              value={address.postalCode}
              onChange={handleChange("postalCode")}
              error={errors.postalCode}
              helperText={errors.postalCode && "Veuillez remplir ce champ"}
            />
          </DualInputLine>

          <DualInputLine>
            <CustomFilledInput
              className="full-width"
              label="Région"
              value={address.region}
              onChange={handleChange("region")}
            />
            {/* <CustomFilledInput
              required
              className="full-width"
              label="Pays"
              value={address.country}
              onChange={handleChange("country")}
              error={errors.country}
              helperText={errors.country && "Veuillez remplir ce champ"}
            /> */}

            <CustomFilledSelect
              required
              id="country"
              value={address.country}
              onChange={handleChange("country")}
              renderValue={
                // Trick for placeholder hiding
                address.country !== "" || !address.country
                  ? undefined
                  : () => <Typography>Pays</Typography>
              }
            >
              {!!countries?.length &&
                countries.map((option, key) => (
                  <CustomSelectOption value={option.name} key={key}>
                    <Stack
                      alignItems="center"
                      justifyContent="start"
                      flexDirection="row-reverse"
                      gap={1}
                    >
                      <Stack>{option.name}</Stack>
                      <Stack fontSize="1.5rem">{option.emoji}</Stack>
                    </Stack>
                  </CustomSelectOption>
                ))}
            </CustomFilledSelect>
          </DualInputLine>

          {delivery && (
            <CustomFilledInput
              className="full-width"
              label="Détails"
              value={address.details}
              onChange={handleChange("details")}
            />
          )}

          <Stack margin="1rem 0">
            {/* {newAddress && (
              <CustomCheckbox
                label="Se souvenir de mes informations la prochaine fois"
                checked={save}
                onChange={(e) => setSave(e.target.checked)}
              />
            )} */}
            <CustomCheckbox
              label="Je certifie que les informations que j'ai saisies sont exactes *"
              checked={certificate}
              onChange={(e) => setCertificate(e.target.checked)}
            />
          </Stack>

          <Stack gap={1}>
            <PillButton
              width="100%"
              onClick={edit ? updateInformations : addAddress}
              disabled={!certificate}
            >
              {edit ? "Enregistrer" : "Ajouter"}
            </PillButton>

            {savedAddresses.length > 0 && (
              <PillButton
                width="100%"
                onClick={handleCancel}
                background="transparent"
                border={(theme) => `1px solid ${theme.palette.secondary.main}`}
                color={(theme) => theme.palette.secondary.main}
              >
                Annuler
              </PillButton>
            )}
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    )

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 2, md: 4 }}
        columnSpacing={{ xs: 2, md: 4 }}
      >
        <Grid item xs={12}>
          <Stack>
            <PillButton
              startIcon={<AddIcon />}
              onClick={() => {
                setNewAddress(true)
                setAddress(initialAddress)
              }}
            >
              Nouvelle addresse
            </PillButton>
          </Stack>
        </Grid>
        {savedAddresses.map((addr, key) => (
          <Grid item xs={12} md={6} key={key}>
            <CustomCard
              border={
                activeAddressIndex === key
                  ? (theme) => `2px solid ${theme.palette.secondary.main}`
                  : `1px solid grey`
              }
              backgroundColor={(theme) => theme.palette.background.black}
              className="pointer relative"
              onClick={() => {
                setActiveAddressIndex(key)
                setAddress({
                  ...savedAddresses[key],
                  postalCode: savedAddresses[key].postal_code,
                })
              }}
            >
              <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
                <Box className="absolute" top={10} left={20}>
                  {activeAddressIndex === key ? (
                    <RadioButtonCheckedIcon color="secondary" />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: "dimgrey" }} />
                  )}
                </Box>
                <Stack className="row flex-center" gap={2} marginLeft="2rem">
                  <Stack flexGrow={1}>
                    <AddressLine>{addr.fullname}</AddressLine>
                    <AddressLine>{addr.phone}</AddressLine>
                    <AddressLine>{addr.line1}</AddressLine>
                    <AddressLine>{addr.line2}</AddressLine>
                    <AddressLine>
                      {addr.postal_code} {addr.city}
                    </AddressLine>
                    <AddressLine>
                      {addr.region} {addr.country}
                    </AddressLine>
                    {delivery && <AddressLine>{addr.details}</AddressLine>}
                  </Stack>

                  {activeAddressIndex === key && (
                    <Stack gap={2}>
                      <Tooltip title="Modifier l'adresse">
                        <div>
                          <PillButton
                            width="40px"
                            padding=".5rem 0"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveAddressIndex(key)
                              setAddress({
                                ...savedAddresses[key],
                                postalCode: savedAddresses[key].postal_code,
                              })
                              setEdit(true)
                            }}
                          >
                            <EditIcon />
                          </PillButton>
                        </div>
                      </Tooltip>

                      {addr.id !== idImpossibleToDelete && (
                        <Tooltip title="Supprimer l'adresse">
                          <div>
                            <PillButton
                              width="40px"
                              padding=".5rem 0"
                              color={(theme) => theme.palette.text.white}
                              background={(theme) =>
                                theme.palette.background.main
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(key)
                              }}
                            >
                              <DeleteOutlineIcon />
                            </PillButton>
                          </div>
                        </Tooltip>
                      )}
                    </Stack>
                  )}
                </Stack>

                {activeAddressIndex === key && (
                  <PillButton
                    endIcon={<EastIcon />}
                    onClick={() => {
                      handleNext()
                      setParentAddress(address)
                    }}
                    display="flex"
                  >
                    Utiliser cette adresse
                  </PillButton>
                )}
              </Stack>
            </CustomCard>
          </Grid>
        ))}
      </Grid>

      {savedAddresses.length > 0 && !!handleBack && (
        <Stack className="row">
          <PillButton
            onClick={() => {
              handleBack()
              setParentAddress(address)
            }}
          >
            Précédent
          </PillButton>
        </Stack>
      )}
    </>
  )
}

export default withConfirmAction(SelectAddressSection)
