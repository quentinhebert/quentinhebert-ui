import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useContext, useState } from "react"
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

export default function useAddProspect({ refreshData }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpenAddProspectModal = () => setOpen(true)
  const handleCancel = handleClose

  const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    activity_type: [],
    budget: "",
    website: "",
    description: "",
  }
  const [formData, setFormData] = useState(initialData)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  async function handleAddProspect() {
    const res = await apiCall.dashboard.prospects.add(formData)
    if (res && res.ok) {
      setSnackMessage("Le prospect à bien été ajouté")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    handleClose()
    if (!!refreshData) refreshData()
  }
  function handleChange(attribute) {
    return (e) => setFormData({ ...formData, [attribute]: e.target.value })
  }

  const AddProspectDialog = ({}) => {
    return (
      <CustomModal open={open} handleClose={handleClose} gap={6}>
        {/**** TITLE ****/}
        <ModalTitle>Ajouter un prospect</ModalTitle>

        <CustomForm onSubmit={handleAddProspect}>
          <ToggleButtonGroup
            sx={{ width: "100%" }}
            color="secondary"
            value={formData.activity_type}
            onChange={(e, newValue) => {
              setFormData({ ...formData, activity_type: newValue })
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
          <PillButton onClick={handleAddProspect}>Ajouter</PillButton>
          <CancelButton variant="text" handleCancel={handleCancel} />
        </Stack>
      </CustomModal>
    )
  }

  return { handleOpenAddProspectModal, AddProspectDialog }
}
