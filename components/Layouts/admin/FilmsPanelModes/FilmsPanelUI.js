import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { Box, Stack, Typography } from "@mui/material"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import CustomSubmitButton from "../../../ReusableComponents/forms/custom-submit-button"
import SwitchButton from "../../../ReusableComponents/buttons/switch-button"
import AlertInfo from "../../../Other/alert-info"
import DeleteIcon from "@mui/icons-material/Delete"
import EditFilmModal from "../../../Modals/Edit-Modals/edit-film-modal"
import DeleteFilmModal from "../../../Modals/Delete-Modals/delete-film-modal"
import ScaleUpOnHoverStack from "../../../ReusableComponents/animations/scale-up-on-hover-stack"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import OutlinedButton from "../../../ReusableComponents/buttons/outlined-button"
import AddIcon from "@mui/icons-material/Add"
import AddFilmModal from "../../../Modals/Create-Modals/add-film-modal"
import BodyText from "../../../ReusableComponents/text/body-text"
import { AppContext } from "../../../../contexts/AppContext"

const SortableListItem = sortableElement(({ item, fetchFilms, showMenu }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [clickedFilm, setClickedFilm] = useState(null)
  const [destroyedEdit, triggerDestroyEdit] = useState(true)
  const [destroyedDelete, triggerDestroyDelete] = useState(true)

  const handleOpenEditModal = () => {
    setClickedFilm(item)
    setOpenEditModal(true)
    triggerDestroyEdit(false)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    fetchFilms()
    setTimeout(() => {
      setClickedFilm(null)
      triggerDestroyEdit(true)
    }, "500")
  }
  const handleOpenDeleteModal = (e) => {
    e.stopPropagation() // Prevent from open edit modal
    setClickedFilm(item)
    setOpenDeleteModal(true)
    triggerDestroyDelete(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    fetchFilms()
    setTimeout(() => {
      triggerDestroyDelete(true)
    }, "500")
  }

  return (
    <>
      <Box
        component="li"
        className="list-style-none"
        width="calc(33% - 3px)"
        onClick={handleOpenEditModal}
      >
        <Stack
          className="no-select flex-center relative"
          sx={{
            cursor: showMenu ? "pointer" : "grab",
            padding: ".5rem",
            borderRadius: "10px",
            height: { xs: "150px", md: "200px" },
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${
              item.thumbnail_url || "/medias/default.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            "&:hover": {
              background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${
                item.thumbnail_url || "/medias/default.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            },
          }}
        >
          <Box
            className="absolute"
            top={10}
            right={10}
            sx={{
              color: (theme) => theme.palette.text.white,
              display: showMenu ? "block" : "none",
            }}
            onClick={handleOpenDeleteModal}
          >
            <ScaleUpOnHoverStack>
              <DeleteIcon
                sx={{
                  fontSize: "2rem",
                  opacity: 0.2,
                  "&:hover": { opacity: 1 },
                }}
              />
            </ScaleUpOnHoverStack>
          </Box>

          <Typography
            fontSize="1rem"
            color="text.white"
            className="uppercase text-center"
          >
            {item.title}
          </Typography>
        </Stack>
      </Box>

      {!destroyedEdit && (
        <EditFilmModal
          filmId={clickedFilm?.id}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}

      {!destroyedDelete && (
        <DeleteFilmModal
          film={clickedFilm}
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
        />
      )}
    </>
  )
})

const SortableList = sortableContainer(({ items, disabled, fetchFilms }) => (
  <Box
    component="ul"
    className="list-style-none no-padding full-width flex-wrap"
    gap="4px"
  >
    {items.map((item, index) => (
      <SortableListItem
        disabled={disabled}
        showMenu={disabled}
        axis="xy"
        key={index}
        index={index}
        item={item}
        fetchFilms={fetchFilms}
      />
    ))}
  </Box>
))

const SortHelper = () => (
  <AlertInfo
    content={{
      show: true,
      severity: "info",
      title: "Modifiez l'ordre des films",
      text: "Il vous suffit de glisser-déposer les éléments sur la grille puis de sauvegarder !",
    }}
  />
)

export default function FilmsPanelUI(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [films, setFilms] = useState(null)
  const [disableSort, setDisableSort] = useState(true)
  const [openAddFilmModal, setOpenAddFilmModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchFilms = async () => {
    setIsLoading(true)
    const res = await apiCall.admin.getAllFilms()
    if (res && res.ok) {
      const films = await res.json()
      setFilms(films)
    }
    setIsLoading(false)
  }
  // Initial fetch
  useEffect(() => {
    fetchFilms()
  }, [])

  /***************** HANDLERS ****************/
  const handleSuccess = () => {
    setDisableSort(true)
    setSnackSeverity("success")
    setSnackMessage("Ordre des films mis à jour")
    fetchFilms()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  const handleSaveSortedVideos = async () => {
    // We only send the sorted ids
    let sortedFilmIds = []
    films.map((film) => {
      sortedFilmIds.push(film.id)
    })
    const res = await apiCall.admin.sortFilms(sortedFilmIds)
    if (res) handleSuccess()
    else handleError()
  }
  const handleOpenAddFilmModal = () => setOpenAddFilmModal(true)
  const handleCloseAddFilmModal = () => setOpenAddFilmModal(false)
  // Sort drag and drop handler
  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(films, e.oldIndex, e.newIndex)
    setFilms(newState)
    document.body.style.cursor = "default"
  }

  return (
    <>
      <Stack justifyContent="center" direction="column" gap={2}>
        <BodyText preventTransitionOut>
          Cliquez sur une vignette pour voir et modifier les informations d'un
          film. Ajoutez un nouveau film avec le bouton ci-dessous. Supprimez un
          film en survolant une vignette puis en cliquant sur l'icône Poubelle.
        </BodyText>

        <Stack width="100%" alignItems="end">
          <Stack className="row" gap={4}>
            <SwitchButton
              label="Modifier l'ordre"
              checked={!disableSort}
              handleCheck={() => setDisableSort(!disableSort)}
            />
            <Box>
              <OutlinedButton
                startIcon={<AddIcon />}
                onClick={handleOpenAddFilmModal}
              >
                Ajouter
              </OutlinedButton>
            </Box>
          </Stack>
          {!disableSort && <SortHelper />}
        </Stack>

        {isLoading ? (
          <PleaseWait />
        ) : !!films ? (
          <SortableList
            axis="xy"
            items={films}
            fetchFilms={fetchFilms}
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
                onClick={handleSaveSortedVideos}
              >
                Enregistrer
              </CustomSubmitButton>
            </Stack>
          </Stack>
        )}
      </Stack>

      <AddFilmModal
        refreshData={fetchFilms}
        open={openAddFilmModal}
        handleClose={handleCloseAddFilmModal}
      />
    </>
  )
}
