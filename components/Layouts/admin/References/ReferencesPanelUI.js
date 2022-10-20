import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { Box, Stack, Typography } from "@mui/material"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import CustomSubmitButton from "../../../ReusableComponents/forms/custom-submit-button"
import SwitchButton from "../../../ReusableComponents/buttons/switch-button"
import AlertInfo from "../../../Other/alert-info"
import DeleteIcon from "@mui/icons-material/Delete"
import ScaleUpOnHoverStack from "../../../ReusableComponents/animations/scale-up-on-hover-stack"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import OutlinedButton from "../../../ReusableComponents/buttons/outlined-button"
import AddIcon from "@mui/icons-material/Add"
import BodyText from "../../../ReusableComponents/text/body-text"
import { AppContext } from "../../../../contexts/AppContext"
import AddReferenceModal from "../../../Modals/Create-Modals/add-reference-modal"
import DeleteReferenceModal from "../../../Modals/Delete-Modals/delete-reference-modal"
import EditReferenceModal from "../../../Modals/Edit-Modals/edit-reference-modal"

const SortableListItem = sortableElement(
  ({ item, fetchReferences, showMenu }) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [clickedReference, setClickedReference] = useState(null)
    const [destroyedEdit, triggerDestroyEdit] = useState(true)
    const [destroyedDelete, triggerDestroyDelete] = useState(true)

    const handleOpenEditModal = () => {
      setClickedReference(item)
      setOpenEditModal(true)
      triggerDestroyEdit(false)
    }
    const handleCloseEditModal = () => {
      setOpenEditModal(false)
      fetchReferences()
      setTimeout(() => {
        setClickedReference(null)
        triggerDestroyEdit(true)
      }, "500")
    }
    const handleOpenDeleteModal = (e) => {
      e.stopPropagation() // Prevent from open edit modal
      setClickedReference(item)
      setOpenDeleteModal(true)
      triggerDestroyDelete(false)
    }
    const handleCloseDeleteModal = () => {
      setOpenDeleteModal(false)
      fetchReferences()
      setTimeout(() => {
        triggerDestroyDelete(true)
      }, "500")
    }

    return (
      <>
        <Box
          component="li"
          className="list-style-none"
          width="calc(20% - 5px)"
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
                item.logo_url || "/medias/default.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              "&:hover": {
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${
                  item.logo_url || "/medias/default.jpg"
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
              {item.label}
            </Typography>
          </Stack>
        </Box>

        {!destroyedEdit && (
          <EditReferenceModal
            referenceId={clickedReference.id}
            openEditModal={openEditModal}
            handleCloseEditModal={handleCloseEditModal}
          />
        )}

        {!destroyedDelete && (
          <DeleteReferenceModal
            reference={clickedReference}
            open={openDeleteModal}
            handleClose={handleCloseDeleteModal}
          />
        )}
      </>
    )
  }
)

const SortableList = sortableContainer(
  ({ items, disabled, fetchReferences }) => (
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
          fetchReferences={fetchReferences}
        />
      ))}
    </Box>
  )
)

const SortHelper = () => (
  <AlertInfo
    content={{
      show: true,
      severity: "info",
      title: "Modifiez l'ordre des références",
      text: "Il vous suffit de glisser-déposer les éléments sur la grille puis de sauvegarder !",
    }}
  />
)

export default function ReferencesPanelUI(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [references, setReferences] = useState(null)
  const [disableSort, setDisableSort] = useState(true)
  const [openAddFilmModal, setOpenAddFilmModal] = useState(false)

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /***************** FETCH DATA ****************/
  const fetchReferences = async () => {
    setIsLoading(true)
    const res = await apiCall.admin.getAllReferences()
    if (res && res.ok) {
      const localRefernces = await res.json()
      setReferences(localRefernces)
    }
    setIsLoading(false)
  }
  // Initial fetch
  useEffect(() => {
    fetchReferences()
  }, [])

  /***************** HANDLERS ****************/
  const handleSuccess = () => {
    setDisableSort(true)
    setSnackSeverity("success")
    setSnackMessage("Ordre des références mis à jour")
    fetchReferences()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue...")
  }
  const handleSaveSortedVideos = async () => {
    // We only send the sorted ids
    let sortedReferenceIds = []
    references.map((reference) => {
      sortedReferenceIds.push(reference.id)
    })
    const res = await apiCall.admin.sortReferences(sortedReferenceIds)
    if (res && res.ok) handleSuccess()
    else handleError()
  }
  const handleOpenAddFilmModal = () => setOpenAddFilmModal(true)
  const handleCloseAddFilmModal = () => setOpenAddFilmModal(false)
  // Sort drag and drop handler
  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(references, e.oldIndex, e.newIndex)
    setReferences(newState)
    document.body.style.cursor = "default"
  }

  return (
    <>
      <Stack justifyContent="center" direction="column" gap={2}>
        <BodyText preventTransitionOut>
          Cliquez sur un logo pour voir et modifier les informations d'une
          référence. Ajoutez une nouvelle référence avec le bouton ci-dessous.
          Supprimez une référence en survolant un logo puis en cliquant sur
          l'icône Poubelle.
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
        ) : !!references ? (
          <SortableList
            axis="xy"
            items={references}
            fetchReferences={fetchReferences}
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

      <AddReferenceModal
        refreshData={fetchReferences}
        open={openAddFilmModal}
        handleClose={handleCloseAddFilmModal}
      />
    </>
  )
}
