import { DialogContent, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "./Modal-Components/modal-title"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import BodyText from "../ReusableComponents/text/body-text"

const SortableItem = sortableElement(({ value }) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    sx={{
      zIndex: 10000, // Mandatory otherwise the object disappears on drag and drop
      cursor: "pointer",
      padding: ".5rem",
      margin: ".5rem 0",
      borderRadius: "10px",
      height: "100px",
      width: "180px",
      color: "#FFF",
      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${value.thumbnail_url})`,
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
      {value.title}
    </Typography>
  </Stack>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <Stack>{children}</Stack>
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

  const onSortEnd = (e) => {
    let newState = arrayMoveImmutable(state, e.oldIndex, e.newIndex)
    setState(newState)
  }

  const handleSaveSortedVideos = async () => {
    // We only send the sorted ids
    let sortedVideoIds = []
    state.map((video, key) => {
      sortedVideoIds.push(video.id)
    })
    const res = await apiCall.admin.sortCategoryVideos(sortedVideoIds)
    if (res) handleClose()
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      <ModalTitle>Modifier l'ordre des film</ModalTitle>
      <BodyText fontSize="1rem">
        Déplacez les films dans l'ordre que vous souhaitez puis enregistrez ! 😎
      </BodyText>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "grey",
          padding: "2rem",
        }}
      >
        <SortableContainer onSortEnd={onSortEnd}>
          {state.map((value, index) => (
            <SortableItem key={value.id} index={index} value={value} />
          ))}
        </SortableContainer>
      </Stack>

      <Stack
        position="sticky"
        bottom={0}
        padding={2}
        zIndex={10001}
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "5px",
          alignItems: "end",
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
