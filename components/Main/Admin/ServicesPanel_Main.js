import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { Stack, TextField, Typography } from "@mui/material"
import { AppContext } from "../../../contexts/AppContext"
import dynamic from "next/dynamic"
import BodyText from "../../Text/body-text"
import SortableGrid from "../../Grids/sortable-grid"
import SortableTextCard from "../../Cards/sortable-text-card"
import DeleteIcon from "@mui/icons-material/Delete"
import PillButton from "../../Buttons/pill-button"
import CustomModal from "../../Modals/custom-modal"
import BasicTooltip from "../../Helpers/basic-tooltip"
import useConfirm from "../../../hooks/useConfirm"
import CustomForm from "../../Forms/custom-form"
import CancelButton from "../../Buttons/cancel-button"
import AddIcon from "@mui/icons-material/Add"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"

const MODES = {
  edit: "EDIT",
  add: "ADD",
  delete: "DELETE",
}

export default function ServicesPanel_Main({}) {
  const [isLoading, setIsLoading] = useState(false)
  const [references, setServices] = useState(null)
  const [sortable, setSortable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const initialNewService = { name: { fr: "", en: "" } }
  const [newService, setNewService] = useState(initialNewService)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [])

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
          isFetching={isLoading}
        >
          {!!references?.length &&
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

      <CustomModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        gap={6}
      >
        <ModalTitle>Nouveau service</ModalTitle>
        <Stack gap={2}>
          <TextField
            autoFocus
            label="Nom du service"
            variant="standard"
            color="secondary"
            value={newService.name.fr}
            onChange={(e) =>
              setNewService({
                name: {
                  ...newService.name,
                  fr: e.target.value,
                },
              })
            }
            sx={{ "& .MuiInput-root": { color: "#fff" } }}
          />
          <TextField
            label="Traduction (EN)"
            variant="standard"
            color="secondary"
            value={newService.name.en}
            onChange={(e) => {
              setNewService({
                ...newService,
                name: {
                  ...newService.name,
                  en: e.target.value,
                },
              })
            }}
            sx={{ "& .MuiInput-root": { color: "#fff" } }}
          />
        </Stack>

        <Stack className="flex-center" gap={2}>
          <PillButton onClick={handleAddService} type="submit">
            Créer
          </PillButton>
          <CancelButton variant="text" handleCancel={handleCloseAddModal} />
        </Stack>
      </CustomModal>
    </>
  )

  /***************** FETCH DATA ****************/
  async function fetchData() {
    setIsLoading(true)
    const res = await apiCall.services.getAll({ auth: true })
    if (res && res.ok) {
      const localServices = await res.json()
      setServices(localServices)
    }
    setIsLoading(false)
  }
  /***************** HANDLERS ****************/
  function handleOpenAddModal() {
    return setOpenAddModal(true)
  }
  function handleCloseAddModal() {
    setNewService(initialNewService)
    return setOpenAddModal(false)
  }
  function handleSuccess() {
    setSnackSeverity("success")
    setSnackMessage("Ordre des services mis à jour")
    setSortable(false)
    fetchData()
  }
  function handleError() {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  async function handleSaveSortedItems() {
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
  async function handleAddService() {
    const res = await apiCall.services.add(newService)
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Service ajouté")
      handleCloseAddModal()
      await fetchData()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
    }
  }
}

function SortableItem({ disabled, item, index, fetchData }) {
  const [itemToDelete, setItemToDelete] = useState(null)
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
  const [
    setConfirmTitle,
    setConfirmMsg,
    setNextBtn,
    setConfirmAction,
    handleOpenConfirm,
    ConfirmDialog,
  ] = useConfirm()
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  return (
    <>
      <SortableTextCard disabled={disabled} item={item} index={index}>
        {!!disabled && (
          <Stack gap={4} height="100%">
            <BasicTooltip title="Ajouter un sous-service">
              <AddIcon
                className="pointer"
                onClick={handleAdd}
                sx={{
                  width: "30px",
                  height: "30px",
                  color: (theme) => theme.palette.background.main,
                  background: (theme) => theme.palette.secondary.main,
                  borderRadius: "50px",
                  transition: ".5s ease-in-out",
                  "&:hover": {
                    opacity: 0.8,
                    rotate: "180deg",
                  },
                }}
              />
            </BasicTooltip>

            <Stack gap={2}>
              {!!item.service_items?.length &&
                item.service_items.map((elt, key) => (
                  <ServiceItemsList key={key}>
                    <ServiceItemBox onClick={() => handleEdit({ elt, key })}>
                      <BodyText>
                        <BasicTooltip title="Modifier">
                          <div>{elt.fr}</div>
                        </BasicTooltip>
                      </BodyText>
                    </ServiceItemBox>

                    <CustomDeleteIcon
                      index={key}
                      onClick={() => confirmDeleteServiceItem(key)}
                    />
                  </ServiceItemsList>
                ))}
            </Stack>

            <DeleteServiceBtn onClick={() => confirmDeleteService(item)} />
          </Stack>
        )}
      </SortableTextCard>

      <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
        {mode === MODES.edit && (
          <Stack gap={6} padding={1}>
            <Typography variant="h4" color="#fff">
              Modifier l'exemple de service
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
                onChange={(e) => {
                  e.stopPropagation()
                  setSelectedServiceItem({
                    ...selectedServiceItem,
                    en: e.target.value,
                  })
                }}
                sx={{ "& .MuiInput-root": { color: "#fff" } }}
              />
            </Stack>

            <Stack className="flex-center" gap={2}>
              <PillButton onClick={() => handleEditServiceItem()}>
                Enregistrer
              </PillButton>
              <CancelButton
                variant="text"
                onClick={(e) => setOpenModal(false)}
              />
            </Stack>
          </Stack>
        )}
        {mode === MODES.add && (
          <CustomForm>
            <Stack gap={6} padding={1}>
              <Typography variant="h4" color="#fff">
                Ajouter un exemple de service
              </Typography>

              <Stack gap={2}>
                <TextField
                  autoFocus
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

              <Stack className="flex-center" gap={2}>
                <PillButton onClick={handleAddServiceItem} type="submit">
                  Ajouter le sous-service
                </PillButton>
                <CancelButton
                  variant="text"
                  handleCancel={(e) => setOpenModal(false)}
                />
              </Stack>
            </Stack>
          </CustomForm>
        )}
        {mode === MODES.delete && (
          <CustomForm>
            <Stack gap={6} padding={1}>
              <Typography variant="h4" color="#fff" textAlign="center">
                Supprimer le service
              </Typography>

              <BodyText>
                Voulez-vous vraiment supprimer le service "
                {itemToDelete.name.fr}" ?
              </BodyText>

              <Stack className="flex-center" gap={2}>
                <PillButton
                  onClick={() => handleDeleteService(itemToDelete)}
                  type="submit"
                >
                  Oui, supprimer
                </PillButton>
                <CancelButton
                  variant="text"
                  handleCancel={(e) => setOpenModal(false)}
                />
              </Stack>
            </Stack>
          </CustomForm>
        )}
      </CustomModal>

      <ConfirmDialog bg={(theme) => theme.alert.title.error.color} />
    </>
  )

  /*************** HANDLERS ***************/
  function confirmDeleteService(item) {
    setItemToDelete(item)
    setMode(MODES.delete)
    return setOpenModal(true)
  }
  function handleAdd() {
    setMode(MODES.add)
    return setOpenModal(true)
  }
  async function handleAddServiceItem() {
    const localItem = item
    localItem.service_items.push(selectedServiceItem)
    setOpenModal(false)
    const res = await apiCall.services.update(localItem)
    if (res && res.ok) {
      setSnackMessage("Ajouté avec succès !")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur s'est produite...")
      setSnackSeverity("error")
    }
    await fetchData()
  }
  async function deleteServiceItem(index) {
    const localItem = item
    localItem.service_items.splice(index, 1)
    const res = await apiCall.services.update(localItem)
    if (res && res.ok) {
      setSnackMessage("Supprimé avec succès")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur s'est produite...")
      setSnackSeverity("error")
    }
    await fetchData()
  }
  function handleEdit({ elt, key }) {
    setSelectedServiceItem(elt)
    setSelectedServiceItemIndex(key)
    setMode(MODES.edit)
    return setOpenModal(true)
  }
  async function handleEditServiceItem() {
    const localItem = item
    localItem.service_items[selectedServiceItemIndex] = selectedServiceItem
    const res = await apiCall.services.update(localItem)
    if (res && res.ok) {
      setSnackMessage("Modifications enregistrées")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur s'est produite...")
      setSnackSeverity("error")
    }
    await fetchData()
  }
  function confirmDeleteServiceItem(index) {
    setConfirmAction(() => () => deleteServiceItem(index))
    setNextBtn("Oui, supprimer")
    setConfirmTitle("Supprimer l'exemple de service")
    setConfirmMsg(
      `Voulez-vous vraiment supprimer l'élément "${item.service_items[index].fr}" ?`
    )
    handleOpenConfirm()
  }
  async function handleDeleteService(item) {
    const res = await apiCall.services.delete(item)
    if (res && res.ok) {
      setSnackMessage("Service supprimé")
      setSnackSeverity("success")
      await fetchData()
      return setOpenModal(false)
    }
  }
}
function ServiceItemBox({ borderColor, ...props }) {
  return (
    <Stack
      className="gap-10"
      padding=".5rem"
      flexGrow={1}
      sx={{
        cursor: "pointer",
        border: "1px solid",
        borderColor: borderColor || "gray",
        borderRadius: "10px",
        "&:hover": {
          background: (theme) => theme.palette.secondary.main,
          "& .MuiTypography-root": {
            color: "#fff",
          },
        },
      }}
      {...props}
    />
  )
}
function CustomDeleteIcon({ ...props }) {
  return (
    <Stack {...props}>
      <BasicTooltip title="Supprimer">
        <DeleteIcon
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: (theme) => theme.alert.title.error.color,
            },
          }}
        />
      </BasicTooltip>
    </Stack>
  )
}
function ServiceItemsList({ ...props }) {
  return <Stack className="row" alignItems="center" gap={2} {...props} />
}
function DeleteServiceBtn({ onClick }) {
  return (
    <Stack height="100%" justifyContent="end">
      <PillButton
        background="transparent"
        border={(theme) => `2px solid ${theme.alert.title.error.color}`}
        color={(theme) => theme.alert.title.error.color}
        startIcon={<DeleteIcon />}
        onClick={onClick}
      >
        Supprimer le service
      </PillButton>
    </Stack>
  )
}
