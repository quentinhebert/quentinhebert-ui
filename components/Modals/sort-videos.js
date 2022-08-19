import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material"
// import { arrayMove } from "array-move"
import { useEffect, useState } from "react"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import theme from "../../config/theme"
import apiCall from "../../services/apiCalls/apiCall"

const SortableItem = sortableElement(({ value }) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    sx={{
      zIndex: 100000,
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
  const { videos, category, open, handleClose } = props

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
    const res = await apiCall.admin.sortCategoryVideos(
      sortedVideoIds,
      category.id
    )
    if (res) handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Sort your {category.label} videos</DialogTitle>
      <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <Typography
          color="gray"
          margin="0 1rem"
          fontStyle="italic"
          display="flex"
        >
          Just drag and drop ! As easy as ABC 😎
        </Typography>
        <Button
          variant="contained"
          display="flex"
          onClick={handleSaveSortedVideos}
        >
          Save
        </Button>
      </Stack>
      <DialogContent sx={{ marginTop: "1rem" }}>
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
      </DialogContent>
    </Dialog>
  )
}
