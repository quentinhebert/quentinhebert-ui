import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { Stack } from "@mui/material"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import BodyText from "../../../ReusableComponents/text/body-text"
import { AppContext } from "../../../../contexts/AppContext"
import SortableCard from "../../../ReusableComponents/cards/sortable-card"
import EditDeleteButtons from "../../../ReusableComponents/buttons/edit-delete-buttons"
import SortableGrid from "../../../ReusableComponents/grids/sortable-grid"
import dynamic from "next/dynamic"

const AddReferenceModal = dynamic(() =>
  import("../../../Modals/Create-Modals/add-reference-modal")
)
const DeleteReferenceModal = dynamic(() =>
  import("../../../Modals/Delete-Modals/delete-reference-modal")
)
const EditReferenceModal = dynamic(() =>
  import("../../../Modals/Edit-Modals/edit-reference-modal")
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
        img={item.logo_url} // FIXME: need to change that attribute each time i copy paste that code
        index={index}
      >
        <EditDeleteButtons
          handleDelete={handleOpenDeleteModal}
          handleEdit={handleOpenEditModal}
        />
      </SortableCard>

      <EditReferenceModal
        referenceId={clickedItem?.id}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
        fetch={fetchData}
      />
      <DeleteReferenceModal
        item={clickedItem}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        fetch={fetchData}
      />
    </>
  )
}

export default function ReferencesPanelUI(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [references, setReferences] = useState(null)
  const [sortable, setSortable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchData = async () => {
    setIsLoading(true)
    const res = await apiCall.references.getAll()
    if (res && res.ok) {
      const localRefernces = await res.json()
      setReferences(localRefernces)
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
    setSnackMessage("Ordre des références mis à jour")
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
        <BodyText preventTransitionOut>
          Cliquez sur une vignette pour voir et modifier les informations d'un
          matériel. Ajoutez du nouveau matériel avec le bouton ci-dessous.
          Supprimez un matériel en survolant une vignette puis en cliquant sur
          l'icône Poubelle.
        </BodyText>

        <SortableGrid
          items={references}
          setItems={setReferences}
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
