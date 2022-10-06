import { Box, Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { compose } from "redux"
import apiCall from "../../../../services/apiCalls/apiCall"
import withConfirmAction from "../../../hocs/withConfirmAction"
import withSnacks from "../../../hocs/withSnacks"
import SortVideos from "../../../Modals/sort-videos"
import CustomTable from "../../../Sections/custom-table"
import BodyText from "../../../ReusableComponents/text/body-text"
import AddFilmModal from "../../../Modals/Create-Modals/add-film-modal"
import CustomOutlinedButton from "../../../ReusableComponents/buttons/custom-outlined-button"
import SortIcon from "@mui/icons-material/Sort"

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

function FilmsPanel(props) {
  const {
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
  const [openAddFilmModal, setOpenAddFilmModal] = useState(false)
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
  const deleteFilms = async (filmsToDelete) => {
    // filmsToDelete must be an array of videos ids (we get it from handleDeleteFilms())
    const errorsCount = filmsToDelete.length
    const [errors] = await Promise.all(
      filmsToDelete.map(async (videoId) => {
        const res = await apiCall.admin.deleteFilm({ id: videoId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSeverity("success")
      setMessageSnack("Film(s) supprimé(s)")
      setOpenSnackBar(true)
    } else {
      setSeverity("error")
      setMessageSnack(
        `Une erreur est survenur lors de la suppression de ${errors} des films sélectionné(s).`
      )
      setOpenSnackBar(true)
    }

    await fetchFilms() // Refresh data
  }

  /***************** HANDLERS *****************/
  const handleDeleteFilms = async (filmsToDelete) => {
    // filmsToDelete must be an array of video ids (we get it from table-helper.js)
    if (!filmsToDelete.length) {
      setSeverity("error")
      setMessageSnack(
        "Une erreur est survenue lors de la suppression d'un des films"
      )
      return setOpenSnackBar(true)
    }
    // Open confirm modal
    setConfirmTitle(`Supprimer ${filmsToDelete.length} film(s)`)
    setActionToFire(() => async () => await deleteFilms(filmsToDelete))
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${filmsToDelete.length} film(s) ?`,
    })
    setNextButtonText("Supprimer")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => setOpenAddFilmModal(true)
  const handleCloseSortVideosModal = async () => {
    fetchFilms()
    setOpenSortVideosModal(false)
  }

  return (
    <Stack justifyContent="center" direction="column" gap={2}>
      <BodyText fontSize="1rem">
        Ci-dessous, vous pouvez ajouter, modifier ou supprimer une ou plusieurs
        films de votre site.
      </BodyText>

      <Box>
        <CustomOutlinedButton
          onClick={() => setOpenSortVideosModal(true)}
          startIcon={<SortIcon />}
        >
          Modifier l'ordre des films
        </CustomOutlinedButton>
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
            handleDelete={handleDeleteFilms}
            handleCreate={handleCreate}
            refreshData={() => fetchFilms()}
            editDataModel="edit-film"
          />
        </Paper>
      </Stack>

      <AddFilmModal
        open={openAddFilmModal}
        handleClose={() => setOpenAddFilmModal(false)}
        refreshData={() => fetchFilms()}
      />
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

export default compose(withSnacks, withConfirmAction)(FilmsPanel)