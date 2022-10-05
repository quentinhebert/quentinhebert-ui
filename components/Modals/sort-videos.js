import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "./Modal-Components/modal-title"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import SwitchButton from "../ReusableComponents/buttons/switch-button"
import AlertInfo from "../Other/alert-info"
import DeleteIcon from "@mui/icons-material/Delete"
import EditFilmModal from "./Edit-Modals/edit-film-modal"
import withSnacks from "../hocs/withSnacks"
import DeleteFilmModal from "./Delete-Modals/delete-film-modal"
import ScaleUpOnHoverStack from "../ReusableComponents/animations/scale-up-on-hover-stack"

const SortableListItem = withSnacks(
  sortableElement(
    ({ item, showMenu, setSeverity, setOpenSnackBar, setMessageSnack }) => {
      const [openEditModal, setOpenEditModal] = useState(false)
      const [openDeleteModal, setOpenDeleteModal] = useState(false)
      const [clickedFilm, setClickedFilm] = useState(null)
      const [destroyedEdit, triggerDestroyEdit] = useState(true)
      const [destroyedDelete, triggerDestroyDelete] = useState(true)
      const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setTimeout(() => {
          setClickedFilm(null)
          triggerDestroyEdit(true)
        }, "500")
      }
      const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)

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
            zIndex={10000} // Mandatory otherwise the object disappears on drag and drop
            onClick={() => {
              setClickedFilm(item)
              setOpenEditModal(true)
              triggerDestroyEdit(false)
            }}
          >
            <Stack
              className="no-select flex-center bg-cover-hover relative"
              sx={{
                cursor: showMenu ? "pointer" : "grab",
                padding: ".5rem",
                borderRadius: "10px",
                height: { xs: "150px", md: "200px" },
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.thumbnail_url})`,
                "&:hover": {
                  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.thumbnail_url})`,
                },
              }}
            >
              <Box
                className="absolute"
                top={10}
                right={10}
                zIndex={1001}
                sx={{
                  color: (theme) => theme.palette.text.white,
                  display: showMenu ? "block" : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setClickedFilm(item)
                  setOpenDeleteModal(true)
                  triggerDestroyDelete(false)
                }}
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
              setSeverity={setSeverity}
              setOpenSnackBar={setOpenSnackBar}
              setMessageSnack={setMessageSnack}
            />
          )}

          {!destroyedDelete && (
            <DeleteFilmModal
              film={clickedFilm}
              open={openDeleteModal}
              handleClose={handleCloseDeleteModal}
              setSeverity={setSeverity}
              setOpenSnackBar={setOpenSnackBar}
              setMessageSnack={setMessageSnack}
            />
          )}
        </>
      )
    }
  )
)

const SortableList = sortableContainer(({ items, disabled }) => {
  return (
    <Box
      component="ul"
      className="list-style-none no-padding full-width flex-wrap"
      gap="6px"
    >
      {items.map((item, index) => (
        <SortableListItem
          disabled={disabled}
          showMenu={disabled}
          axis="xy"
          key={index}
          index={index}
          item={item}
        />
      ))}
    </Box>
  )
})

function SortVideos(props) {
  const { videos, open, handleClose } = props

  // TODO: Récupérer cette data avec l'API
  const [state, setState] = useState([])

  const [disableSort, setDisableSort] = useState(true)

  useEffect(() => {
    if (videos) {
      const newState = []
      videos.map((video) => {
        newState.push({
          id: video.id,
          title: video.title,
          thumbnail_url: video.thumbnail_url,
        })
      })
      setState(newState)
    }
  }, [videos])

  const handleSaveSortedVideos = async () => {
    // We only send the sorted ids
    let sortedVideoIds = []
    state.map((video) => {
      sortedVideoIds.push(video.id)
    })
    const res = await apiCall.admin.sortFilms(sortedVideoIds)
    if (res) handleClose()
  }

  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(state, e.oldIndex, e.newIndex)
    setState(newState)
    document.body.style.cursor = "default"
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4} fullscreen>
      <ModalTitle>Interface de gestion des films (Bêta)</ModalTitle>

      <Stack>
        <SwitchButton
          label="Modifier l'ordre"
          checked={!disableSort}
          handleCheck={() => setDisableSort(!disableSort)}
        />
        {!disableSort && (
          <AlertInfo
            content={{
              show: true,
              severity: "info",
              title: "Modifiez l'ordre des films",
              text: "Il vous suffit de glisser-déposer les éléments sur la grille puis de sauvegarder !",
            }}
          />
        )}
      </Stack>

      <SortableList
        axis="xy"
        items={state}
        disabled={disableSort}
        onSortEnd={onSortEnd}
        onSortStart={() => (document.body.style.cursor = "grabbing")}
      />

      {!disableSort && (
        <Stack
          position="sticky"
          bottom={0}
          padding={2}
          zIndex={10001}
          borderRadius="5px"
          alignItems="end"
          sx={{
            backgroundColor: (theme) => theme.palette.background.main,
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Stack flexDirection="row" gap={2}>
            <CustomSubmitButton onClick={handleClose}>
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
    </CustomModal>
  )
}

export default SortVideos
