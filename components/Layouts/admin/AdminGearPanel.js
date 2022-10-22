import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AdminPagesLayout from "../AdminPagesLayout"
import BodyText from "../../ReusableComponents/text/body-text"
import { AppContext } from "../../../contexts/AppContext"
import withConfirmAction from "../../hocs/withConfirmAction"
import apiCall from "../../../services/apiCalls/apiCall"
import SortableGrid from "../../ReusableComponents/grids/sortable-cards-grid"
import SortableCard from "../../ReusableComponents/cards/sortable-card"
import PleaseWait from "../../ReusableComponents/helpers/please-wait"
import EditDeleteButtons from "../../ReusableComponents/buttons/edit-delete-buttons"
import dynamic from "next/dynamic"

const AddFilmGearModal = dynamic(() =>
  import("../../Modals/Create-Modals/add-film-gear-modal")
)
const EditFilmGearModal = dynamic(() =>
  import("../../Modals/Edit-Modals/edit-film-gear-modal")
)
const DeleteFilmGearModal = dynamic(() =>
  import("../../Modals/Delete-Modals/delete-film-gear-modal")
)

const SortableItem = ({ disabled, item, index, fetchData }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [clickedItem, setClickedItem] = useState(null)

  const handleOpenEditModal = () => {
    setClickedItem(item)
    setOpenEditModal(true)
  }
  const handleOpenDeleteModal = (e) => {
    e.stopPropagation() // Prevent from open edit modal
    setClickedItem(item)
    setOpenDeleteModal(true)
  }
  const handleCloseEditModal = () => setOpenEditModal(false)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  return (
    <>
      <SortableCard
        disabled={disabled}
        item={item}
        img={item.image} // FIXME: need to change that attribute each time i copy paste that code
        index={index}
        imgCover
      >
        <EditDeleteButtons
          handleDelete={handleOpenDeleteModal}
          handleEdit={handleOpenEditModal}
        />
      </SortableCard>

      <EditFilmGearModal
        gearId={clickedItem?.id}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
        fetch={fetchData}
      />
      <DeleteFilmGearModal
        item={clickedItem}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        fetch={fetchData}
      />
    </>
  )
}

function AdminGearPanel(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [gear, setGear] = useState(null)
  const [sortable, setSortable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchData = async () => {
    setIsLoading(true)
    const res = await apiCall.films.gear.getAll()
    if (res && res.ok) {
      const gear = await res.json()
      setGear(gear)
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
    setSnackMessage("Ordre des items mis à jour")
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
    gear.map((item) => sortedIds.push(item.id))
    // ApiCall
    const res = await apiCall.films.gear.sort(sortedIds)
    // Handle response
    if (res && res.ok) handleSuccess()
    else handleError()

    setIsLoading(false)
  }

  return (
    <AdminPagesLayout title="Mon matériel vidéo">
      <Stack justifyContent="center" direction="column" gap={2}>
        <BodyText preventTransitionOut>
          Cliquez sur une vignette pour voir et modifier les informations d'un
          matériel. Ajoutez du nouveau matériel avec le bouton ci-dessous.
          Supprimez un matériel en survolant une vignette puis en cliquant sur
          l'icône Poubelle.
        </BodyText>

        <SortableGrid
          items={gear}
          setItems={setGear}
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
            gear?.length &&
            gear.map((item, index) => (
              <SortableItem
                disabled={!sortable}
                item={item}
                img
                key={index}
                index={index}
                fetchData={fetchData}
              />
            ))}
        </SortableGrid>
      </Stack>

      <AddFilmGearModal
        refreshData={fetchData}
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />
    </AdminPagesLayout>
  )
}

export default withConfirmAction(AdminGearPanel)
