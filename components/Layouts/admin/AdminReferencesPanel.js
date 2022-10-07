import { Link, Paper, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../contexts/AppContext"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomTable from "../../Sections/custom-table"
const AddReferenceModal = dynamic(() =>
  import("../../Modals/Create-Modals/add-reference-modal")
)

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "logo_url",
    numeric: false,
    label: "Logo",
    valueGetter: function (param, rowId) {
      return param ? <img src={param} style={{ width: "100px" }} /> : <></>
    },
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
]

function AdminReferencesPanel(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [rows, setRows] = useState(null)
  const [allRows, setAllRows] = useState(null)
  const [openAddReferenceModal, setOpenAddReferenceModal] = useState(false)
  const router = useRouter()

  /***************** FETCH DATA ****************/
  const fetchReferences = async () => {
    const res = await apiCall.unauthenticated.getReferences()
    if (res && res.ok) {
      const result = await res.json()
      const localArray = []
      await result.map((category, key) => {
        localArray.push(category)
      })
      setRows(localArray)
      setAllRows(localArray)
    }
  }

  // Imediately fetch up-to-date data
  useEffect(() => {
    fetchReferences()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteReferences = async (referencesToDelete) => {
    // referencesToDelete must be an array of reference ids (we get it from handleDeleteReferences())
    const errorsCount = referencesToDelete.length
    const [errors] = await Promise.all(
      referencesToDelete.map(async (referenceId) => {
        const res = await apiCall.admin.deleteReference({
          id: referenceId,
        })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSnackSeverity("success")
      setSnackMessage("Reference(s) deleted successfully.")
      fetchReferences() // Refresh data
    } else {
      setSnackSeverity("error")
      setSnackMessage(
        `A problem occured while deleting ${errors} of the selected reference.`
      )
    }
  }

  /***************** HANDLERS *****************/
  const handleDeleteReferences = async (referencesToDelete) => {
    // referencesToDelete must be an array of reference ids (we get it from table-helper.js)
    if (!referencesToDelete.length) {
      setSnackSeverity("error")
      return setSnackMessage(
        "A problem occurred while deleting the selected reference(s)"
      )
    }
    // Open confirm modal
    setConfirmTitle(`Delete ${referencesToDelete.length} reference(s)`)
    setActionToFire(
      () => async () => await deleteReferences(referencesToDelete)
    )
    setConfirmContent({
      text: `Do you really want to delete ${referencesToDelete.length} reference(s) ?`,
    })
    setNextButtonText("Delete")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => {
    setOpenAddReferenceModal(true)
  }

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Manage work content"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can add, edit or delete any of your references.
      </Typography>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <Paper
          variant="contained"
          sx={{ width: "100%", flexDirection: "column" }}
        >
          <CustomTable
            rows={rows}
            allRows={allRows}
            setRows={setRows}
            headCells={headCells}
            arrayTitle={
              rows ? `References - ${rows.length} result(s)` : "References"
            }
            handleDelete={handleDeleteReferences}
            handleCreate={handleCreate}
            refreshData={fetchReferences}
            editDataModel="edit-reference"
          />
        </Paper>
        {openAddReferenceModal ? (
          <AddReferenceModal
            open={openAddReferenceModal}
            handleClose={() => setOpenAddReferenceModal(false)}
            refreshData={fetchReferences}
          />
        ) : null}
      </Stack>
    </Stack>
  )
}

export default withConfirmAction(AdminReferencesPanel)
