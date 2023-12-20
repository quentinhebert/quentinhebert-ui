import { Box, Divider, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import CustomModal from "../components/Modals/custom-modal"
import { ModalTitle } from "../components/Modals/Modal-Components/modal-title"
import PillButton from "../components/Buttons/pill-button"
import CancelButton from "../components/Buttons/cancel-button"
import apiCall from "../services/apiCalls/apiCall"
import ProspectDD from "../components/Data-Display/Prospect-DD"
import useEditProspect from "./useEditProspect"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

export default function useViewProspect({ id, refreshData }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpenViewProspectModal = () => setOpen(true)
  const handleCancel = handleClose
  const { handleOpenEditProspectModal, EditProspectDialog } = useEditProspect({
    id,
    refreshData,
  })

  const initialData = {
    id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    activity_type: [],
    budget: "",
    website: "",
    description: "",
    status: "DRAFT",
  }
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await apiCall.dashboard.prospects.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setData(jsonRes)
    }
    setLoading(false)
  }
  useEffect(() => {
    if (open) fetchData()
    else setData(initialData)
  }, [open])

  const ViewProspectDialog = ({}) => {
    return (
      <CustomModal open={open} handleClose={handleClose} gap={6}>
        {/**** TITLE ****/}
        <ModalTitle>Prospect</ModalTitle>

        <ProspectDD
          id={id}
          firstname={data.firstname}
          lastname={data.lastname}
          budget={data.budget}
          created_at={data.created_at}
          email={data.email}
          description={data.description}
          opened={data.opened}
          company={data.company}
          phone={data.phone}
          services={data.activity_type}
        />

        {/**** BOTTOM BUTTONS ****/}
        <Stack gap={2} width="100%">
          <PillButton disabled={loading} onClick={handleOpenEditProspectModal}>
            Modifier
          </PillButton>
          <CancelButton
            variant="text"
            handleCancel={handleCancel}
            label="Fermer"
          />

          <Divider />

          <Box component="a" href="/dashboard/orders/create" target="_blank">
            <PillButton
              disabled={loading}
              endIcon={<OpenInNewIcon />}
              background="transparent"
              border={(theme) => `1px solid ${theme.palette.secondary.main}`}
              color={(theme) => theme.palette.secondary.main}
            >
              Créer un devis
            </PillButton>
          </Box>
        </Stack>

        {EditProspectDialog({})}
      </CustomModal>
    )
  }

  return { handleOpenViewProspectModal, ViewProspectDialog }
}
