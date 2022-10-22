import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { Box, Stack } from "@mui/material"
import EditFilmModal from "../../../Modals/Edit-Modals/edit-film-modal"
import DeleteFilmModal from "../../../Modals/Delete-Modals/delete-film-modal"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import AddFilmModal from "../../../Modals/Create-Modals/add-film-modal"
import BodyText from "../../../ReusableComponents/text/body-text"
import { AppContext } from "../../../../contexts/AppContext"
import SortableCard from "../../../ReusableComponents/cards/sortable-card"
import DeleteIcon from "@mui/icons-material/Delete"
import SortableGrid from "../../../ReusableComponents/grids/sortable-grid"

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
        img={item.thumbnail_url} // FIXME: need to change that attribute each time i copy paste that code
        index={index}
        imageOnly
      >
        <Box
          className="full-width absolute top left full-height flex"
          flexGrow={1}
          onClick={handleOpenEditModal}
        >
          <DeleteIcon
            className="absolute"
            sx={{
              color: "#fff",
              top: 10,
              right: 10,
              fontSize: "2rem",
              opacity: 0.5,
              "&:hover": {
                opacity: 1,
              },
            }}
            onClick={handleOpenDeleteModal}
          />
        </Box>
      </SortableCard>

      <EditFilmModal
        filmId={clickedItem?.id}
        open={openEditModal}
        handleClose={handleCloseEditModal}
        fetch={fetchData}
      />
      <DeleteFilmModal
        film={clickedItem}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        fetch={fetchData}
      />
    </>
  )
}

export default function FilmsPanelUI(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [films, setFilms] = useState(null)
  const [sortable, setSortable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchData = async () => {
    setIsLoading(true)
    const res = await apiCall.films.getAll()
    if (res && res.ok) {
      const films = await res.json()
      setFilms(films)
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
    films.map((item) => sortedIds.push(item.id))
    // ApiCall
    const res = await apiCall.films.sort(sortedIds)
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
          films. Ajoutez du nouveau film avec le bouton ci-dessous. Supprimez un
          film en survolant une vignette puis en cliquant sur l'icône Poubelle.
        </BodyText>

        <SortableGrid
          items={films}
          setItems={setFilms}
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
            films?.length &&
            films.map((item, index) => (
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

      <AddFilmModal
        refreshData={fetchData}
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />
    </>
  )
}
