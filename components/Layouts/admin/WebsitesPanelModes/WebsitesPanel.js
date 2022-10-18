import { Box, Paper, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import withConfirmAction from "../../../hocs/withConfirmAction"
import SortVideos from "../../../Modals/sort-videos"
import CustomTable from "../../../Sections/custom-table"
import BodyText from "../../../ReusableComponents/text/body-text"
import AddWebsiteModal from "../../../Modals/Create-Modals/add-website-modal"
import CustomOutlinedButton from "../../../ReusableComponents/buttons/custom-outlined-button"
import SortIcon from "@mui/icons-material/Sort"
import { AppContext } from "../../../../contexts/AppContext"

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
    id: "url",
    numeric: false,
    label: "Lien du site",
  },
  {
    id: "client",
    numeric: false,
    label: "Client",
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: "40%",
  },
  {
    id: "year",
    numeric: false,
    label: "Année",
  },
]

function WebsitesPanel(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [rows, setRows] = useState(null)
  const [openAddWebsiteModal, setOpenAddWebsiteModal] = useState(false)
  const [openSortWebsitesModal, setOpenSortWebsitesModal] = useState(false)

  /***************** FETCH DATA ****************/
  const fetchWebsites = async () => {
    const res = await apiCall.admin.getAllWebsites()
    if (res && res.ok) {
      const websites = await res.json()
      setRows(websites)
    }
  }
  // Initial fetch
  useEffect(() => {
    fetchWebsites()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteWebsites = async (websitesToDelete) => {
    // websitesToDelete must be an array of website ids (we get it from handleDeleteWebsites())
    const errorsCount = websitesToDelete.length
    const [errors] = await Promise.all(
      websitesToDelete.map(async (websiteId) => {
        const res = await apiCall.admin.deleteWebsite({ id: websiteId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSnackSeverity("success")
      setSnackMessage("Site(s) web supprimé(s)")
    } else {
      setSnackSeverity("error")
      setSnackMessage(
        `Une erreur est survenur lors de la suppression de ${errors} des sites web sélectionné(s).`
      )
    }

    await fetchWebsites() // Refresh data
  }

  /***************** HANDLERS *****************/
  const handleDeleteWebsites = async (websitesToDelete) => {
    // websitesToDelete must be an array of website ids (we get it from table-helper.js)
    if (!websitesToDelete.length) {
      setSnackSeverity("error")
      return setSnackMessage(
        "Une erreur est survenue lors de la suppression d'un des sites web"
      )
    }
    // Open confirm modal
    setConfirmTitle(`Supprimer ${websitesToDelete.length} site(s) web`)
    setActionToFire(() => async () => await deleteWebsites(websitesToDelete))
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${websitesToDelete.length} site(s) web ?`,
    })
    setNextButtonText("Supprimer")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => setOpenAddWebsiteModal(true)
  const handleCloseSortWebsitesModal = async () => {
    fetchWebsites()
    setOpenSortWebsitesModal(false)
  }

  return (
    <Stack justifyContent="center" direction="column" gap={2}>
      <BodyText fontSize="1rem">
        Ci-dessous, vous pouvez ajouter, modifier ou supprimer une ou plusieurs
        sites web de votre portfolio web.
      </BodyText>

      <Box>
        <CustomOutlinedButton
          onClick={() => setOpenSortWebsitesModal(true)}
          startIcon={<SortIcon />}
        >
          Modifier l'ordre des sites web
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
              rows ? `Sites web - ${rows.length} résultat(s)` : "Sites web"
            }
            handleDelete={handleDeleteWebsites}
            handleCreate={handleCreate}
            refreshData={() => fetchWebsites()}
            editDataModel="edit-website"
          />
        </Paper>
      </Stack>

      <AddWebsiteModal
        open={openAddWebsiteModal}
        handleClose={() => setOpenAddWebsiteModal(false)}
        refreshData={() => fetchWebsites()}
      />
      {rows && rows.length ? (
        <SortVideos
          videos={rows}
          open={openSortWebsitesModal}
          handleClose={handleCloseSortWebsitesModal}
        />
      ) : null}
    </Stack>
  )
}

export default withConfirmAction(WebsitesPanel)
