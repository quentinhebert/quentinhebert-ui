import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import CustomModal from "../components/Modals/custom-modal"
import { ModalTitle } from "../components/Modals/Modal-Components/modal-title"
import PillButton from "../components/Buttons/pill-button"
import CancelButton from "../components/Buttons/cancel-button"
import apiCall from "../services/apiCalls/apiCall"
import { AppContext } from "../contexts/AppContext"
import CustomForm from "../components/Forms/custom-form"
import CustomFilledInput from "../components/Inputs/custom-filled-input"
import DualInputLine from "../components/Containers/dual-input-line"
import CustomFilledTextArea from "../components/Inputs/custom-filled-text-area"
import PleaseWait from "../components/Helpers/please-wait"
import CustomFilledSelect from "../components/Inputs/custom-filled-select"
import PROSPECT_STATES, { PROSPECT_STATES_ENUM } from "../enums/prospectStates"
import CustomSelectOption from "../components/Inputs/custom-select-option"
import DeleteIcon from "@mui/icons-material/Delete"

export default function useEditProspect({ id, refreshData }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpenModal = () => setOpen(true)
  const handleCancel = handleClose

  const initialData = {
    id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    website: "",
    description: "",
    status: "DRAFT",
  }
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await apiCall.dashboard.prospects.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFormData(jsonRes)
    }
    setLoading(false)
  }
  useEffect(() => {
    if (open) fetchData()
    else setFormData(initialData)
  }, [open])

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  async function handleUpdateProspect() {
    setProcessing(true)
    const res = await apiCall.dashboard.prospects.update(formData)
    if (res && res.ok) {
      setSnackMessage("Le prospect à bien été mis à jour")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    handleClose()
    setProcessing(false)
    if (!!refreshData) refreshData()
  }
  async function handleDelete() {
    setProcessing(true)
    const res = await apiCall.dashboard.prospects.delete(formData)
    if (res && res.ok) {
      setSnackMessage("Prospect supprimé")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    handleClose()
    setProcessing(false)
    if (!!refreshData) refreshData()
  }
  function handleChange(attribute) {
    return (e) => setFormData({ ...formData, [attribute]: e.target.value })
  }

  const Dialog = ({}) => {
    return (
      <CustomModal open={open} handleClose={handleClose} gap={6}>
        {/**** TITLE ****/}
        <ModalTitle>Modifier un prospect</ModalTitle>

        {loading ? <PleaseWait /> : null}

        <CustomForm onSubmit={handleUpdateProspect}>
          <CustomFilledSelect
            required
            id="status"
            value={formData.status}
            onChange={handleChange("status")}
            renderValue={
              // Trick for placeholder hiding
              formData.status !== ""
                ? undefined
                : () => <Typography>Status</Typography>
            }
          >
            {PROSPECT_STATES_ENUM.map((option, key) => (
              <CustomSelectOption value={option} key={key}>
                <Box
                  sx={{
                    background: (theme) =>
                      theme.alert.title[PROSPECT_STATES[option].severity]
                        .background,
                    color: (theme) =>
                      theme.alert.title[PROSPECT_STATES[option].severity].color,
                    borderColor: (theme) =>
                      theme.alert.title[PROSPECT_STATES[option].severity].color,
                    borderRadius: "30px",
                    padding: ".2rem .5rem",
                    border: "1px solid",
                  }}
                >
                  {PROSPECT_STATES[option].label}
                </Box>
              </CustomSelectOption>
            ))}
          </CustomFilledSelect>

          <ToggleButtonGroup
            sx={{ width: "100%" }}
            color="secondary"
            value={formData.services}
            onChange={(e, newValue) => {
              setFormData({ ...formData, services: newValue })
            }}
          >
            <ToggleButton
              sx={{ width: "100%", borderRadius: "30px" }}
              value="video"
            >
              Film
            </ToggleButton>
            <ToggleButton
              sx={{ width: "100%", borderRadius: "30px" }}
              value="web"
            >
              Site Web
            </ToggleButton>
          </ToggleButtonGroup>

          <DualInputLine>
            <CustomFilledInput
              key="firstname"
              value={formData.firstname}
              onChange={handleChange("firstname")}
              label="Prénom"
            />
            <CustomFilledInput
              key="lastname"
              value={formData.lastname}
              onChange={handleChange("lastname")}
              label="Nom"
            />
          </DualInputLine>
          <DualInputLine>
            <CustomFilledInput
              value={formData.email}
              onChange={handleChange("email")}
              label="E-mail"
            />
            <CustomFilledInput
              value={formData.phone}
              onChange={handleChange("phone")}
              label="Téléphone"
            />
          </DualInputLine>
          <DualInputLine>
            <CustomFilledInput
              value={formData.company}
              onChange={handleChange("company")}
              label="Entreprise"
            />
            <CustomFilledInput
              value={formData.budget}
              onChange={handleChange("budget")}
              label="Budget"
            />
          </DualInputLine>
          <CustomFilledInput
            value={formData.website}
            onChange={handleChange("website")}
            label="Site web"
          />
          <CustomFilledTextArea
            value={formData.description}
            onChange={handleChange("description")}
            label="Description"
          />
        </CustomForm>

        {/**** BOTTOM BUTTONS ****/}
        <Stack gap={2} width="100%">
          <PillButton
            onClick={handleUpdateProspect}
            disabled={processing || loading}
          >
            Enregistrer
          </PillButton>
          <CancelButton variant="text" handleCancel={handleCancel} />
          <Divider />
          <PillButton
            color={(theme) => theme.palette.error.main}
            background="transparent"
            boxShadow="none"
            border={(theme) => `1px solid ${theme.palette.error.main}`}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={processing || loading}
          >
            Supprimer
          </PillButton>
        </Stack>
      </CustomModal>
    )
  }

  return { handleOpenModal, Dialog, open }
}
