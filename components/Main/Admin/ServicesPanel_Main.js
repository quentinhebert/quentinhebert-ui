import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { Stack, TextField, Tooltip, Typography } from "@mui/material"
import { AppContext } from "../../../contexts/AppContext"
import dynamic from "next/dynamic"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import SortableGrid from "../../Grids/sortable-grid"
import SortableTextCard from "../../Cards/sortable-text-card"
import DeleteIcon from "@mui/icons-material/Delete"
import PillButton from "../../Buttons/pill-button"
import CustomModal from "../../Modals/custom-modal"
import withConfirmAction from "../../hocs/withConfirmAction"

const AddReferenceModal = dynamic(() =>
  import("../../Modals/Create-Modals/add-reference-modal")
)
const DeleteReferenceModal = dynamic(() =>
  import("../../Modals/Delete-Modals/delete-reference-modal")
)

const MODES = {
  edit: "EDIT",
  add: "ADD",
}

const SortableItem = withConfirmAction(
  ({
    disabled,
    item,
    index,
    fetchData,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [clickedItem, setClickedItem] = useState(null)
    const [mode, setMode] = useState(MODES.add)
    const [openModal, setOpenModal] = useState(false)
    const initialSelectedServiceItem = {
      fr: "",
      en: null,
    }
    const [selectedServiceItem, setSelectedServiceItem] = useState(
      initialSelectedServiceItem
    )
    const [selectedServiceItemIndex, setSelectedServiceItemIndex] = useState(0)

    const handleOpenDeleteModal = (e) => {
      e.stopPropagation() // Prevent from open edit modal
      setClickedItem(item)
      setOpenDeleteModal(true)
    }
    const handleCloseDeleteModal = () => setOpenDeleteModal(false)

    const handleAddServiceItem = async () => {
      const localItem = item
      localItem.service_items.push(selectedServiceItem)
      setOpenModal(false)
      const res = await apiCall.services.update(localItem)
      if (res && res.ok) alert("success")
      else alert("failure")
      await fetchData()
    }
    const deleteServiceItem = async (index) => {
      const localItem = item
      localItem.service_items.splice(index, 1)
      const res = await apiCall.services.update(localItem)
      if (res && res.ok) alert("success")
      else alert("failure") // TODO: Implement snacks UI (for all 3 functions)
      await fetchData()
    }
    const handleDeleteServiceItem = (index) => {
      setActionToFire(() => async () => await deleteServiceItem(index))
      setOpenConfirmModal(true)
      setConfirmTitle("Supprimer")
      setNextButtonText("Supprimer")
      setConfirmContent({
        text: `Voulez-vous vraiment supprimer l'élément "${item.service_items[index].fr}" ?`,
      })
    }
    const handleEditServiceItem = async () => {
      const localItem = item
      localItem.service_items[selectedServiceItemIndex] = selectedServiceItem
      const res = await apiCall.services.update(localItem)
      if (res && res.ok) alert("success")
      else alert("failure")
      await fetchData()
    }

    return (
      <>
        <SortableTextCard disabled={disabled} item={item} index={index}>
          <Stack gap={4}>
            <ServiceItemBox
              onClick={() => {
                setMode(MODES.add)
                setOpenModal(true)
              }}
            >
              <BodyText>+ Ajouter</BodyText>
            </ServiceItemBox>

            <Stack gap={2}>
              {item.service_items?.length &&
                item.service_items.map((elt, key) => (
                  <Stack className="row" alignItems="center" gap={2} key={key}>
                    <Tooltip title="Supprimer">
                      <DeleteIcon
                        onClick={() => handleDeleteServiceItem(key)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: (theme) => theme.palette.secondary.main,
                          },
                        }}
                      />
                    </Tooltip>

                    <Tooltip title="Modifier">
                      <ServiceItemBox
                        onClick={() => {
                          setSelectedServiceItem(elt)
                          setSelectedServiceItemIndex(key)
                          setMode(MODES.edit)
                          setOpenModal(true)
                        }}
                      >
                        <BodyText>{elt.fr}</BodyText>
                      </ServiceItemBox>
                    </Tooltip>
                  </Stack>
                ))}
            </Stack>

            <Stack flexGrow={1} />

            <PillButton
              background="transparent"
              border={(theme) => `2px solid ${theme.alert.title.error.color}`}
              color={(theme) => theme.alert.title.error.color}
              startIcon={<DeleteIcon />}
            >
              Supprimer le service
            </PillButton>
          </Stack>
        </SortableTextCard>

        <DeleteReferenceModal
          reference={clickedItem}
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          fetch={fetchData}
        />

        <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
          {mode === MODES.edit && (
            <Stack gap={4} padding={1}>
              <Typography variant="h4" color="#fff">
                Modifier l'élément
              </Typography>

              <Stack gap={2}>
                <TextField
                  label="Description"
                  variant="standard"
                  color="secondary"
                  value={selectedServiceItem.fr}
                  onChange={(e) =>
                    setSelectedServiceItem({
                      ...selectedServiceItem,
                      fr: e.target.value,
                    })
                  }
                  sx={{ "& .MuiInput-root": { color: "#fff" } }}
                />
                <TextField
                  label="Traduction (EN)"
                  variant="standard"
                  color="secondary"
                  value={selectedServiceItem.en}
                  onChange={(e) =>
                    setSelectedServiceItem({
                      ...selectedServiceItem,
                      en: e.target.value,
                    })
                  }
                  sx={{ "& .MuiInput-root": { color: "#fff" } }}
                />
              </Stack>

              <Stack className="row flex-center gap-10">
                <PillButton onClick={(e) => setOpenModal(false)}>
                  Annuler
                </PillButton>
                <PillButton onClick={() => handleEditServiceItem()}>
                  Ajouter
                </PillButton>
              </Stack>
            </Stack>
          )}
          {mode === MODES.add && (
            <Stack gap={4} padding={1}>
              <Typography variant="h4" color="#fff">
                Ajouter un exemple de service
              </Typography>

              <Stack gap={2}>
                <TextField
                  label="Description"
                  variant="standard"
                  color="secondary"
                  onChange={(e) =>
                    setSelectedServiceItem({
                      ...selectedServiceItem,
                      fr: e.target.value,
                    })
                  }
                  sx={{ "& .MuiInput-root": { color: "#fff" } }}
                />
                <TextField
                  label="Traduction (EN)"
                  variant="standard"
                  color="secondary"
                  onChange={(e) =>
                    setSelectedServiceItem({
                      ...selectedServiceItem,
                      en: e.target.value,
                    })
                  }
                  sx={{ "& .MuiInput-root": { color: "#fff" } }}
                />
              </Stack>

              <Stack className="row flex-center gap-10">
                <PillButton onClick={(e) => setOpenModal(false)}>
                  Annuler
                </PillButton>
                <PillButton onClick={handleAddServiceItem}>Ajouter</PillButton>
              </Stack>
            </Stack>
          )}
        </CustomModal>
      </>
    )
  }
)

export default function ServicesPanel_Main(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [references, setServices] = useState(null)
  const [sortable, setSortable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchData = async () => {
    setIsLoading(true)
    const res = await apiCall.services.getAll({ auth: true })
    if (res && res.ok) {
      const localServices = await res.json()
      setServices(localServices)
    }
    setIsLoading(false)
  }
  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [])

  /***************** HANDLERS ****************/
  const handleOpenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => setOpenAddModal(false)
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Ordre des services mis à jour")
    setSortable(false)
    fetchData()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  const handleSaveSortedItems = async () => {
    setIsLoading(true)

    // Format data (we only send the sorted ids)
    let sortedIds = []
    references.map((item) => sortedIds.push(item.id))
    // ApiCall
    const res = await apiCall.references.sort(sortedIds)
    // Handle response
    if (res && res.ok) handleSuccess()
    else handleError()

    setIsLoading(false)
  }

  return (
    <>
      <Stack justifyContent="center" direction="column" gap={2}>
        <SortableGrid
          items={references}
          setItems={setServices}
          fetch={fetchData}
          handleCreate={handleOpenAddModal}
          handleSave={handleSaveSortedItems}
          setSortable={setSortable}
          sortable={sortable}
        >
          {isLoading && (
            <Stack width="100%">
              <PleaseWait />
            </Stack>
          )}

          {!isLoading &&
            references?.length &&
            references.map((item, index) => (
              <SortableItem
                disabled={!sortable}
                item={item}
                key={index}
                index={index}
                fetchData={fetchData}
              />
            ))}
        </SortableGrid>
      </Stack>

      <AddReferenceModal
        refreshData={fetchData}
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />
    </>
  )
}

function ServiceItemBox({ ...props }) {
  return (
    <Stack
      className="gap-10"
      padding=".5rem"
      flexGrow={1}
      sx={{
        cursor: "pointer",
        border: "1px solid grey",
        borderRadius: "10px",
        "&:hover": {
          background: (theme) => theme.palette.secondary.main,
        },
      }}
      {...props}
    />
  )
}
