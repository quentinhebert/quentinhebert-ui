import { Box, Grid, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../../../contexts/AppContext"
import { UserContext } from "../../../../../contexts/UserContext"
import apiCall from "../../../../../services/apiCalls/apiCall"
import AddIcon from "@mui/icons-material/Add"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import withConfirmAction from "../../../../hocs/withConfirmAction"
import PillButton from "../../../../Buttons/pill-button"
import CustomCard from "../../../../Cards/custom-card"
import CenteredMaxWidthContainer from "../../../../Containers/centered-max-width-container"
import CustomCheckbox from "../../../../Inputs/custom-checkbox"
import CustomFilledInput from "../../../../Inputs/custom-filled-input"
import PageTitle from "../../../../Titles/page-title"
import DualInputLine from "../../../../Containers/dual-input-line"
import RightSubmitButton from "../../../../Buttons/right-submit-button"
import BodyText from "../../../../Text/body-text"

function SelectAddress({
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
}) {
  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const [savedAddresses, setSavedAddresses] = useState([])
  const initialAddress = {
    id: null,
    fullname: `${user.firstname || ""} ${user.lastname || ""}`,
    phone: "",
    line1: "",
    line2: "",
    postalCode: "",
    city: "",
    region: "",
    country: "FRANCE",
    details: "",
  }
  const [address, setAddress] = useState(initialAddress)
  const [certificate, setCertificate] = useState(false)
  const [save, setSave] = useState(false)
  const [edit, setEdit] = useState(false)
  const [newAddress, setNewAddress] = useState(false)
  const requiredFields = ["fullname", "line1", "postalCode", "city", "country"]
  const initialErrors = {}
  requiredFields.map((field) => {
    initialErrors[field] = false
  })
  const [errors, setErrors] = useState(initialErrors)
  const [activeAddressIndex, setActiveAddressIndex] = useState(null)

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
      setSnackMessage(
        "Vos informations ont bien été enregistrées pour la procahine fois !"
      )
      setSnackSeverity("success")
      setNewAddress(false)
      fetchSavedAddresses()
    }
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
    setNextButtonText("Supprimer")
    setConfirmContent({
      text: "Voulez vous réellement supprimer cette adresse ?",
    })
    setOpenConfirmModal(true)
  }

  useEffect(() => {
    fetchSavedAddresses()
  }, [])

  if (newAddress || edit)
    return (
      <CenteredMaxWidthContainer>
        <Stack sx={{ gap: { xs: 1, md: 2 } }}>
          <PageTitle
            text={edit ? "Modifier l'adresse" : "Ajouter une adresse"}
            textAlign="center"
          />

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
            <CustomFilledInput
              required
              className="full-width"
              label="Pays"
              value={address.country}
              onChange={handleChange("country")}
              error={errors.country}
              helperText={errors.country && "Veuillez remplir ce champ"}
            />
          </DualInputLine>

          {delivery && (
            <CustomFilledInput
              className="full-width"
              label="Détails"
              value={address.details}
              onChange={handleChange("details")}
            />
          )}

          <Stack>
            {newAddress && (
              <CustomCheckbox
                label="Se souvenir de mes informations la prochaine fois"
                checked={save}
                onChange={(e) => setSave(e.target.checked)}
              />
            )}
            <CustomCheckbox
              label="Je certifie que les informations que j'ai saisies sont exactes *"
              checked={certificate}
              onChange={(e) => setCertificate(e.target.checked)}
            />
          </Stack>

          <Stack className="row">
            {savedAddresses.length > 0 && (
              <PillButton onClick={handleCancel}>Annuler</PillButton>
            )}
            <RightSubmitButton
              onClick={edit ? updateInformations : addAddress}
              disabled={!certificate}
            >
              {edit ? "Enregistrer" : "Ajouter"}
            </RightSubmitButton>
          </Stack>
        </Stack>
      </CenteredMaxWidthContainer>
    )

  return (
    <CenteredMaxWidthContainer gap={4}>
      <PageTitle text="Mes adresses enregistrées" textAlign="center" />
      <Grid container rowSpacing={4} columnSpacing={4}>
        <Grid item xs={12}>
          <Stack className="flex-center full-height">
            <Stack>
              <PillButton
                startIcon={<AddIcon />}
                onClick={() => {
                  setNewAddress(true)
                  setAddress(initialAddress)
                }}
              >
                Ajouter une addresse
              </PillButton>
            </Stack>
          </Stack>
        </Grid>
        {savedAddresses.map((addr, key) => (
          <Grid item xs={12} lg={6} key={key}>
            <CustomCard
              background={activeAddressIndex === key ? null : "grey"}
              className="pointer relative"
              onClick={() => {
                setActiveAddressIndex(key)
                setAddress({
                  ...savedAddresses[key],
                  postalCode: savedAddresses[key].postal_code,
                })
              }}
            >
              <Box className="absolute" top={10} left={20}>
                {activeAddressIndex === key ? (
                  <RadioButtonCheckedIcon color="secondary" />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ color: "dimgrey" }} />
                )}
              </Box>
              <Stack className="row flex-center" gap={2} marginLeft="2rem">
                <Stack flexGrow={1}>
                  <BodyText>{addr.fullname}</BodyText>
                  <BodyText>{addr.phone}</BodyText>
                  <BodyText>{addr.line1}</BodyText>
                  <BodyText>{addr.line2}</BodyText>
                  <BodyText>
                    {addr.postal_code} {addr.city}
                  </BodyText>
                  <BodyText>
                    {addr.region} {addr.country}
                  </BodyText>
                  {delivery && <BodyText>{addr.details}</BodyText>}
                </Stack>
                <Stack gap={2}>
                  <PillButton
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
                  {addr.id !== idImpossibleToDelete && (
                    <PillButton
                      background="transparent"
                      color={(theme) => theme.palette.secondary.main}
                      border={(theme) =>
                        `1px solid ${theme.palette.secondary.main}`
                      }
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(key)
                      }}
                    >
                      <DeleteOutlineIcon />
                    </PillButton>
                  )}
                </Stack>
              </Stack>
            </CustomCard>
          </Grid>
        ))}
      </Grid>

      {savedAddresses.length > 0 && (
        <>
          <Stack gap={2}>
            <BodyText>
              {delivery
                ? "Votre commande sera livrée à cette adresse :"
                : "La facture sera émise avec ces informations :"}
            </BodyText>
            <CustomCard>
              <Stack>
                <BodyText>{address.fullname}</BodyText>
                <BodyText>{address.phone}</BodyText>
                <BodyText>{user.email}</BodyText>
                <BodyText>
                  {address.line1 ? `${address.line1}` : ""}
                  {address.line2 ? `, ${address.line2}` : ""}
                  {address.postalCode ? `, ${address.postalCode}` : ""}
                  {address.city ? `, ${address.city}` : ""}
                  {address.region ? `, ${address.region}` : ""}
                  {address.country ? `, ${address.country}` : ""}
                </BodyText>
                <BodyText>{address.details}</BodyText>
              </Stack>
            </CustomCard>
          </Stack>

          <Stack className="row">
            {!!handleBack && (
              <Box>
                <RightSubmitButton
                  onClick={() => {
                    handleBack()
                    setParentAddress(address)
                  }}
                >
                  Précédent
                </RightSubmitButton>
              </Box>
            )}
            <Stack flexGrow={1} />
            <RightSubmitButton
              onClick={() => {
                handleNext()
                setParentAddress(address)
              }}
            >
              Suivant
            </RightSubmitButton>
          </Stack>
        </>
      )}
    </CenteredMaxWidthContainer>
  )
}

export default withConfirmAction(SelectAddress)
