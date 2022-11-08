import { Box, Paper, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomTable from "../../Sections/custom-table"
import AddWebsiteSlideModal from "../../Modals/Create-Modals/add-website-slide-modal"
import SortIcon from "@mui/icons-material/Sort"
import { AppContext } from "../../../contexts/AppContext"
import { removeHtmlTags } from "../../../services/utils"
import SortWebsiteSlides from "../../Modals/sort-websites-slides"
import AdminPagesLayout from "../AdminPagesLayout"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"
import BodyText from "../../Text/body-text"

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    label: "Titre",
    valueGetter: function (param) {
      return removeHtmlTags(param)
    },
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: "40%",
    valueGetter: function (param) {
      return removeHtmlTags(param)
    },
  },
]

function WebsitesSlidesPanel(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [rows, setRows] = useState(null)
  const [openAddWebsiteSlideModal, setOpenAddWebsiteSlideModal] =
    useState(false)
  const [openSortWebsitesModal, setOpenSortWebsitesModal] = useState(false)

  /***************** FETCH DATA ****************/
  const fetchWebsiteSLides = async () => {
    const res = await apiCall.websites.slides.getAll()
    if (res && res.ok) {
      const websiteSlides = await res.json()
      setRows(websiteSlides)
    }
  }
  // Initial fetch
  useEffect(() => {
    fetchWebsiteSLides()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteWebsiteSlides = async (slidesToDelete) => {
    // slidesToDelete must be an array of website ids (we get it from handleDeleteWebsiteSlides())
    const errorsCount = slidesToDelete.length
    const [errors] = await Promise.all(
      slidesToDelete.map(async (slideId) => {
        const res = await apiCall.websites.slides.delete({ id: slideId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSnackSeverity("success")
      setSnackMessage("Diapositive(s) textuelle(s) supprimée(s)")
    } else {
      setSnackSeverity("error")
      setSnackMessage(
        `Une erreur est survenue lors de la suppression de ${errors} des diapositives textuelles sélectionnée(s).`
      )
    }

    await fetchWebsiteSLides() // Refresh data
  }

  /***************** HANDLERS *****************/
  const handleDeleteWebsiteSlides = async (slidesToDelete) => {
    // slidesToDelete must be an array of website slides ids (we get it from table-helper.js)
    if (!slidesToDelete.length) {
      setSnackSeverity("error")
      return setSnackMessage(
        "Une erreur est survenue lors de la suppression d'un des diapositives textuelles"
      )
    }
    // Open confirm modal
    setConfirmTitle(`Supprimer ${slidesToDelete.length} site(s) web`)
    setActionToFire(() => async () => await deleteWebsiteSlides(slidesToDelete))
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${slidesToDelete.length} diapositives(s) textuelle(s) ?`,
    })
    setNextButtonText("Supprimer")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => setOpenAddWebsiteSlideModal(true)
  const handleCloseSortWebsitesModal = async () => {
    fetchWebsiteSLides()
    setOpenSortWebsitesModal(false)
  }

  return (
    <AdminPagesLayout title="Gérer les diapositives textuelles">
      <Stack gap={2}>
        <BodyText preventTransitionOut>
          Ci-dessous, vous pouvez ajouter, modifier ou supprimer une ou
          plusieurs diapositives textuelles de votre page de développeur.
        </BodyText>

        <Box>
          <CustomOutlinedButton
            onClick={() => setOpenSortWebsitesModal(true)}
            startIcon={<SortIcon />}
          >
            Modifier l'ordre des diapositives
          </CustomOutlinedButton>
        </Box>

        <Stack alignItems="center" justifyContent="center" direction="column">
          <Paper
            variant="contained"
            sx={{ width: "100%", flexDirection: "column" }}
          >
            <CustomTable
              rows={rows}
              allRows={rows}
              setRows={setRows}
              headCells={headCells}
              arrayTitle={
                rows
                  ? `Diapositives textuelles - ${rows.length} résultat(s)`
                  : "Diapositives textuelles"
              }
              handleDelete={handleDeleteWebsiteSlides}
              handleCreate={handleCreate}
              refreshData={() => fetchWebsiteSLides()}
              editDataModel="edit-website-slide"
            />
          </Paper>
        </Stack>
      </Stack>

      <AddWebsiteSlideModal
        open={openAddWebsiteSlideModal}
        handleClose={() => setOpenAddWebsiteSlideModal(false)}
        refreshData={() => fetchWebsiteSLides()}
      />
      {rows && rows.length ? (
        <SortWebsiteSlides
          slides={rows}
          open={openSortWebsitesModal}
          handleClose={handleCloseSortWebsitesModal}
        />
      ) : null}
    </AdminPagesLayout>
  )
}

export default withConfirmAction(WebsitesSlidesPanel)
