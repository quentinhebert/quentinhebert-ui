import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "./Modal-Components/modal-title"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import AlertInfo from "../Other/alert-info"
import { removeHtmlTags } from "../../services/utils"

const SortableListItem = sortableElement(({ item }) => (
  <Box
    component="li"
    className="list-style-none"
    width="calc(20% - 5px)"
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
        cursor: "grab",
        padding: ".5rem",
        borderRadius: "10px",
        height: { xs: "150px", md: "100px" },
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.thumbnail_url})`,
        "&:hover": {
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.thumbnail_url})`,
        },
      }}
    >
      <Typography
        fontSize="1rem"
        color="text.white"
        className="uppercase text-center"
      >
        {removeHtmlTags(item.title)}
      </Typography>
    </Stack>
  </Box>
))

const SortableList = sortableContainer(({ items }) => (
  <Box
    component="ul"
    className="list-style-none no-padding full-width flex-wrap"
    gap="6px"
  >
    {items.map((item, index) => (
      <SortableListItem axis="xy" key={index} index={index} item={item} />
    ))}
  </Box>
))

export default function SortWebsiteSlides(props) {
  const { slides, open, handleClose } = props

  // TODO: Récupérer cette data avec l'API
  const [state, setState] = useState([])

  useEffect(() => {
    if (slides) {
      const newState = []
      slides.map((slide) => {
        newState.push({
          id: slide.id,
          title: slide.title,
        })
      })
      setState(newState)
    }
  }, [slides])

  const handleSaveSortedWebsites = async () => {
    // We only send the sorted ids
    let sortedWebsiteSlideIds = []
    state.map((slide) => {
      sortedWebsiteSlideIds.push(slide.id)
    })
    const res = await apiCall.websites.slides.sort(sortedWebsiteSlideIds)
    if (res) handleClose()
  }

  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(state, e.oldIndex, e.newIndex)
    setState(newState)
    document.body.style.cursor = "default"
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4} fullscreen>
      <ModalTitle>Modifier l'ordre des diapositives textuelles</ModalTitle>

      <AlertInfo
        content={{
          show: true,
          severity: "info",
          title: "Modifiez l'ordre des diapositives textuelles",
          text: "Il vous suffit de glisser-déposer les éléments sur la grille puis de sauvegarder !",
        }}
      />

      <SortableList
        axis="xy"
        items={state}
        onSortEnd={onSortEnd}
        onSortStart={() => (document.body.style.cursor = "grabbing")}
      />

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
          <CustomSubmitButton onClick={handleClose}>Annuler</CustomSubmitButton>
          <CustomSubmitButton
            secondary="true"
            onClick={handleSaveSortedWebsites}
          >
            Enregistrer
          </CustomSubmitButton>
        </Stack>
      </Stack>
    </CustomModal>
  )
}
