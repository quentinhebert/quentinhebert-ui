import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import CustomModal from "../../Modals/custom-modal"
import AlertInfo from "../../Other/alert-info"
import RectangleButton from "../../Buttons/rectangle-button"

const SortableListItem = sortableElement(({ item }) => (
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
        cursor: "grab",
        padding: ".5rem",
        borderRadius: "10px",
        height: { xs: "150px", md: "200px" },
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
        {item.title}
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

export default function SortFilmGear(props) {
  const { videos, open, handleClose } = props

  // TODO: Récupérer cette data avec l'API
  const [state, setState] = useState([])

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
    const res = await apiCall.films.sort(sortedVideoIds)
    if (res) handleClose()
  }

  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(state, e.oldIndex, e.newIndex)
    setState(newState)
    document.body.style.cursor = "default"
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4} fullscreen>
      <ModalTitle>Modifier l'ordre des films</ModalTitle>

      <AlertInfo
        content={{
          show: true,
          severity: "info",
          title: "Modifiez l'ordre des films",
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
          <RectangleButton onClick={handleClose}>Annuler</RectangleButton>
          <RectangleButton secondary="true" onClick={handleSaveSortedVideos}>
            Enregistrer
          </RectangleButton>
        </Stack>
      </Stack>
    </CustomModal>
  )
}
