import { Box, Button, Paper, Stack } from "@mui/material"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { compose } from "redux"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import withSnacks from "../../hocs/withSnacks"
import SortVideos from "../../Modals/sort-videos"
import CustomTable from "../../Sections/custom-table"
import SortIcon from "@mui/icons-material/Sort"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import BodyText from "../../ReusableComponents/text/body-text"
const AddCategoryVideoModal = dynamic(() =>
  import("../../Modals/Create-Modals/add-video-modal")
)

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "thumbnail_url",
    numeric: false,
    label: "Miniature",
    valueGetter: function (param) {
      return param ? <img src={param} style={{ width: "100px" }} /> : <></>
    },
  },
  {
    id: "title",
    numeric: false,
    label: "Title",
  },
  {
    id: "client",
    numeric: false,
    label: "Client",
  },
  {
    id: "type",
    numeric: false,
    label: "Catégorie",
  },
  {
    id: "year",
    numeric: false,
    label: "Année",
  },
]

function AdminBackOfficeFilms(props) {
  const {
    user,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const [rows, setRows] = useState(null)
  const [openAddVideoModal, setOpenAddVideoModal] = useState(false)
  const [openSortVideosModal, setOpenSortVideosModal] = useState(false)

  /***************** FETCH DATA ****************/
  const fetchFilms = async () => {
    const res = await apiCall.admin.getAllFilms()
    if (res && res.ok) {
      const films = await res.json()
      setRows(films)
    }
  }
  // Initial fetch
  useEffect(() => {
    fetchFilms()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteVideos = async (videosToDelete) => {
    // videosToDelete must be an array of videos ids (we get it from handleDeleteVideos())
    const errorsCount = videosToDelete.length
    const [errors] = await Promise.all(
      videosToDelete.map(async (videoId) => {
        const res = await apiCall.admin.deleteCategoryVideo({ id: videoId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSeverity("success")
      setMessageSnack("Video(s) deleted successfully.")
      setOpenSnackBar(true)
    } else {
      setSeverity("error")
      setMessageSnack(
        `A problem occured while deleting ${errors} of the selected videos.`
      )
      setOpenSnackBar(true)
    }

    await fetchFilms() // Refresh data
  }

  /***************** HANDLERS *****************/
  const handleDeleteVideos = async (videosToDelete) => {
    // videosToDelete must be an array of video ids (we get it from table-helper.js)
    if (!videosToDelete.length) {
      setSeverity("error")
      setMessageSnack("A problem occurred while deleting the selected video(s)")
      return setOpenSnackBar(true)
    }
    // Open confirm modal
    setConfirmTitle(`Delete ${videosToDelete.length} video(s)`)
    setActionToFire(() => async () => await deleteVideos(videosToDelete))
    setConfirmContent({
      text: `Do you really want to delete ${videosToDelete.length} video(s) ?`,
    })
    setNextButtonText("Delete")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => {
    setOpenAddVideoModal(true)
  }
  const handleCloseSortVideosModal = async () => {
    fetchFilms()
    setOpenSortVideosModal(false)
  }

  return (
    <Stack flexGrow={1}>
      <Stack
        justifyContent="center"
        direction="column"
        gap={2}
        padding="1rem"
        margin="100px 0"
      >
        <PageTitle zIndex={1} text="Gérer les utilisateurs" />
        <Breadcrumbs panel="admin" />

        <BodyText fontSize="1rem">
          Ci-dessous, vous pouvez ajouter, modifier ou supprimer une ou
          plusieurs films de votre site.
        </BodyText>

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenSortVideosModal(true)}
            startIcon={<SortIcon />}
          >
            Modifier l'ordre des videos
          </Button>
        </Box>

        <Stack alignItems="center" justifyContent="center" direction="column">
          <Paper
            variant="contained"
            sx={{ width: "100%", flexDirection: "column" }}
          >
            <CustomTable
              rows={rows}
              setRows={setRows}
              headCells={headCells}
              arrayTitle={rows ? `Films - ${rows.length} résultat(s)` : "Films"}
              handleDelete={handleDeleteVideos}
              handleCreate={handleCreate}
              refreshData={() => fetchFilms()}
              editDataModel="edit-film"
            />
          </Paper>
          {openAddVideoModal ? (
            <AddCategoryVideoModal
              open={openAddVideoModal}
              handleClose={() => setOpenAddVideoModal(false)}
              refreshData={() => fetchFilms()}
            />
          ) : null}
        </Stack>
      </Stack>

      {rows && rows.length ? (
        <SortVideos
          videos={rows}
          open={openSortVideosModal}
          handleClose={handleCloseSortVideosModal}
        />
      ) : null}
    </Stack>
  )
}

export default compose(withSnacks, withConfirmAction)(AdminBackOfficeFilms)
