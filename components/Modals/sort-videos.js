import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "./Modal-Components/modal-title"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import BodyText from "../ReusableComponents/text/body-text"

const SortableListItem = sortableElement(({ item }) => {
  return (
    <Box
      component="li"
      sx={{
        zIndex: 10000, // Mandatory otherwise the object disappears on drag and drop
        listStyle: "none",
        width: "calc(33% - 0.6rem)",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          cursor: "pointer",
          padding: ".5rem",
          borderRadius: "10px",
          height: { xs: "100px", md: "200px" },
          color: "#FFF",
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.thumbnail_url})`,
          backgroundSize: "cover",
          userSelect: "none",
          msUserSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
        }}
      >
        <Typography
          component="h5"
          variant="h6"
          fontSize="1rem"
          textTransform="uppercase"
        >
          {item.title}
        </Typography>
      </Stack>
    </Box>
  )
})

const SortableList = sortableContainer(({ items }) => {
  return (
    <Box
      component="ul"
      sx={{
        width: "100%",
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {items.map((item, index) => {
        return (
          <SortableListItem axis="xy" key={index} index={index} item={item} />
        )
      })}
    </Box>
  )
})

export default function SortVideos(props) {
  const { videos, open, handleClose } = props

  // TODO: Récupérer cette data avec l'API
  const [state, setState] = useState([])

  useEffect(() => {
    if (videos) {
      let newState = []
      videos.map((video, key) => {
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
    let newState = arrayMoveImmutable(state, e.oldIndex, e.newIndex)
    setState(newState)
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4} fullscreen>
      <ModalTitle>Modifier l'ordre des film</ModalTitle>
      <BodyText fontSize="1rem">
        Déplacez les films dans l'ordre que vous souhaitez puis enregistrez ! 😎
      </BodyText>

      <Stack justifyContent="center" alignItems="center" flexGrow={1}>
        <SortableList axis={"xy"} items={state} onSortEnd={onSortEnd} />
      </Stack>

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
          <CustomSubmitButton secondary="true" onClick={handleSaveSortedVideos}>
            Enregistrer
          </CustomSubmitButton>
        </Stack>
      </Stack>
    </CustomModal>
  )
}
