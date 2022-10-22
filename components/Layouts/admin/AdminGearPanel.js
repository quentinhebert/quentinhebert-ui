import { Box, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AdminPagesLayout from "../AdminPagesLayout"
import BodyText from "../../ReusableComponents/text/body-text"
import { AppContext } from "../../../contexts/AppContext"
import withConfirmAction from "../../hocs/withConfirmAction"
import apiCall from "../../../services/apiCalls/apiCall"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import DeleteIcon from "@mui/icons-material/Delete"
import SwitchButton from "../../ReusableComponents/buttons/switch-button"
import OutlinedButton from "../../ReusableComponents/buttons/outlined-button"
import AddIcon from "@mui/icons-material/Add"
import AddFilmGearModal from "../../Modals/Create-Modals/add-film-gear-modal"
import EditFilmGearModal from "../../Modals/Edit-Modals/edit-film-gear-modal"
import DeleteFilmGearModal from "../../Modals/Delete-Modals/delete-film-gear-modal"
import ECommerceCard from "../../ReusableComponents/cards/e-commerce-card"
import PillButton from "../../ReusableComponents/buttons/pill-button"
import EditIcon from "@mui/icons-material/Edit"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import AlertInfo from "../../Other/alert-info"
import { arrayMoveImmutable } from "array-move"
import RefreshIcon from "@mui/icons-material/Refresh"

const SortableListItem = sortableElement(({ item, fetchGear, showMenu }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [clickedGear, setClickedGear] = useState(null)
  const [destroyedEdit, triggerDestroyEdit] = useState(true)
  const [destroyedDelete, triggerDestroyDelete] = useState(true)

  const handleOpenEditModal = () => {
    setClickedGear(item)
    setOpenEditModal(true)
    triggerDestroyEdit(false)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    fetchGear()
    setTimeout(() => {
      setClickedGear(null)
      triggerDestroyEdit(true)
    }, "500")
  }
  const handleOpenDeleteModal = (e) => {
    e.stopPropagation() // Prevent from open edit modal
    setClickedGear(item)
    setOpenDeleteModal(true)
    triggerDestroyDelete(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    fetchGear()
    setTimeout(() => {
      triggerDestroyDelete(true)
    }, "500")
  }

  return (
    <>
      <Box
        component="li"
        className="list-style-none no-select"
        display="flex"
        sx={{
          position: "relative",
          background: "transparent",
          width: {
            xs: "100%",
            sm: "calc(50% - .5rem)",
            md: "calc(33.3% - .5rem)",
            lg: "calc(25% - .5rem)",
            xl: "calc(20% - .5rem)",
          },
        }}
      >
        <ECommerceCard
          img={item.image}
          title={item.label}
          description={item.description}
          imgCover
        >
          <Stack gap={2} direction="row" justifyContent="center">
            <PillButton
              onClick={handleOpenDeleteModal}
              fullWidth
              padding=".5rem 0"
              background={(theme) => theme.palette.tersary.main}
              color={(theme) => theme.palette.text.white}
            >
              <DeleteIcon />
            </PillButton>
            <PillButton
              onClick={handleOpenEditModal}
              fullWidth
              padding=".5rem 0"
              color={(theme) => theme.palette.text.white}
            >
              <EditIcon />
            </PillButton>
          </Stack>
        </ECommerceCard>

        {!showMenu && (
          <Box
            height="100%"
            width="100%"
            sx={{
              background: "#000",
              opacity: 0.5,
              cursor: "move",
              position: "absolute",
              borderRadius: "15px",
              "&:hover": {
                opacity: 0.2,
              },
            }}
          />
        )}
      </Box>

      {!destroyedEdit && (
        <EditFilmGearModal
          gearId={clickedGear?.id}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}

      {!destroyedDelete && (
        <DeleteFilmGearModal
          item={clickedGear}
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
        />
      )}
    </>
  )
})

const SortableList = sortableContainer(({ items, disabled, fetchGear }) => (
  <Box
    component="ul"
    className="list-style-none no-padding full-width flex-wrap"
    gap=".5rem"
  >
    {items.map((item, index) => (
      <SortableListItem
        disabled={disabled}
        showMenu={disabled}
        axis="xy"
        key={index}
        index={index}
        item={item}
        fetchGear={fetchGear}
      />
    ))}
  </Box>
))

const SortHelper = () => (
  <AlertInfo
    content={{
      show: true,
      severity: "info",
      title: "Modifiez l'ordre des items",
      text: "Il vous suffit de glisser-déposer les éléments sur la grille puis de sauvegarder !",
    }}
  />
)

function AdminGearPanel(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [gear, setGear] = useState(null)
  const [disableSort, setDisableSort] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchGear = async () => {
    const res = await apiCall.films.gear.getAll()
    if (res && res.ok) {
      const gear = await res.json()
      setGear(gear)
    }
  }
  // Initial fetch
  useEffect(() => {
    fetchGear()
  }, [])

  /***************** HANDLERS ****************/
  const handleSuccess = () => {
    setDisableSort(true)
    setSnackSeverity("success")
    setSnackMessage("Ordre des items mis à jour")
    fetchGear()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  const handleSaveSortedItems = async () => {
    // We only send the sorted ids
    let sortedIds = []
    gear.map((item) => {
      sortedIds.push(item.id)
    })
    const res = await apiCall.films.gear.sort(sortedIds)
    if (res) handleSuccess()
    else handleError()
  }
  const handleopenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => setOpenAddModal(false)
  // Sort drag and drop handler
  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(gear, e.oldIndex, e.newIndex)
    setGear(newState)
    document.body.style.cursor = "default"
  }

  return (
    <AdminPagesLayout title="Mon matériel vidéo">
      <Stack justifyContent="center" direction="column" gap={2}>
        <BodyText preventTransitionOut>
          Cliquez sur une vignette pour voir et modifier les informations d'un
          matériel. Ajoutez un nouveau matériel avec le bouton ci-dessous.
          Supprimez un matériel en survolant une vignette puis en cliquant sur
          l'icône Poubelle.
        </BodyText>

        <Stack width="100%" alignItems="end">
          <Stack className="row flex-center" gap={4}>
            <SwitchButton
              label="Modifier l'ordre"
              checked={!disableSort}
              handleCheck={() => setDisableSort(!disableSort)}
            />
            <RefreshIcon
              color="secondary"
              onClick={() => fetchGear()}
              sx={{
                display: "flex",
                cursor: "pointer",
                "&:hover": { opacity: 0.5 },
              }}
            />
            <Box>
              <OutlinedButton
                startIcon={<AddIcon />}
                onClick={handleopenAddModal}
              >
                Ajouter
              </OutlinedButton>
            </Box>
          </Stack>
          {!disableSort && <SortHelper />}
        </Stack>

        {isLoading ? (
          <PleaseWait />
        ) : !!gear ? (
          <SortableList
            axis="xy"
            items={gear}
            fetchGear={fetchGear}
            disabled={disableSort}
            onSortEnd={onSortEnd}
            onSortStart={() => (document.body.style.cursor = "grabbing")}
          />
        ) : null}

        {!disableSort && (
          <Stack
            position="sticky"
            bottom={0}
            padding={2}
            borderRadius="5px"
            alignItems="end"
            sx={{
              backgroundColor: (theme) => theme.palette.background.main,
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
            }}
          >
            <Stack flexDirection="row" gap={2}>
              <CustomSubmitButton
                onClick={() => {
                  setDisableSort(true)
                }}
              >
                Annuler
              </CustomSubmitButton>
              <CustomSubmitButton
                secondary="true"
                onClick={handleSaveSortedItems}
              >
                Enregistrer
              </CustomSubmitButton>
            </Stack>
          </Stack>
        )}
      </Stack>

      <AddFilmGearModal
        refreshData={fetchGear}
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />
    </AdminPagesLayout>
  )
}

export default withConfirmAction(AdminGearPanel)
