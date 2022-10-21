import { Stack, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../contexts/AppContext"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import BodyText from "../../ReusableComponents/text/body-text"
import PageTitle from "../../ReusableComponents/titles/page-title"
import CustomTable from "../../Sections/custom-table"
import AdminPagesLayout from "../AdminPagesLayout"

// Function to round param at closest decimal
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// TABLE HEADCELLS
const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "public_url",
    numeric: false,
    label: "Fichier",
    valueGetter: function (param, rowId) {
      return param ? <img src={param} style={{ width: "80px" }} /> : <></>
    },
  },
  {
    id: "created_at",
    numeric: false,
    label: "Uploadé le",
    valueGetter: function (param, rowId) {
      const year = param.split("T")[0].split("-")[0]
      const month = param.split("T")[0].split("-")[1]
      const day = param.split("T")[0].split("-")[2]
      const hour = param.split("T")[1].split(":")[0]
      const min = param.split("T")[1].split(":")[1]
      const date = day + "/" + month + "/" + year.substring(2)
      const time = hour + ":" + min
      return (
        <Tooltip title={`Pour filtrer, veuillez rechercher "${param}"`}>
          <div>{`Le ${date} à ${time}`}</div>
        </Tooltip>
      )
    },
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
  },
  {
    id: "mime_type",
    numeric: false,
    label: "MIME-Type",
  },
  {
    id: "size",
    numeric: false,
    label: "Poids",
    valueGetter: function (param, rowId) {
      const size = formatter.format(param / 1024 / 1024)
      return (
        <Tooltip title={`To filter, please search "${param}"`}>
          <div>{`${size} Mo`}</div>
        </Tooltip>
      )
    },
  },
  {
    id: "author",
    numeric: false,
    label: "ID auteur",
  },
]

function AdminFilesPanel(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [rows, setRows] = useState(null)
  const [allRows, setAllRows] = useState(null) // To keep a constant reference for search filter
  const [totalSize, setTotalSize] = useState(0)

  const fetchFiles = async () => {
    const res = await apiCall.files.getFiles()
    if (res && res.ok) {
      const localTotalSize = 0
      const localArray = []
      const result = await res.json()
      await result.map((file, key) => {
        localArray.push(file)
        localTotalSize += Number(file.size)
      })
      localTotalSize = Number(formatter.format(localTotalSize / 1024 / 1024))
      setTotalSize(localTotalSize)
      setRows(localArray)
      setAllRows(localArray)
    }
  }

  // Get files from DB
  useEffect(() => {
    fetchFiles()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteFiles = async (filesToDelete) => {
    // filesToDelete must be an array of user ids (we get it from handleDeleteFile())

    const errorsCount = filesToDelete.length
    const [errors] = await Promise.all(
      filesToDelete.map(async (imageId) => {
        const res = await apiCall.files.deleteFile({ id: imageId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSnackSeverity("success")
      setSnackMessage("File(s) deleted successfully.")
    } else {
      setSnackSeverity("error")
      setSnackMessage(
        `A problem occurred while deleting ${errors} of the selected files.`
      )
    }

    await fetchFiles() // Refresh data
  }
  const handleDeleteFile = async (filesToDelete) => {
    // filesToDelete must be an array of user ids (we get it from table-helper.js)
    if (!filesToDelete.length) {
      setSnackSeverity("error")
      return setSnackMessage(
        "A problem occurred while deleting the selected files"
      )
    }
    // Open confirm modal
    setConfirmTitle(`Confirmation`)
    setActionToFire(() => async () => await deleteFiles(filesToDelete))
    setConfirmContent({
      text: `Do you really want to delete ${filesToDelete.length} file(s) ?`,
    })
    setNextButtonText("Delete")
    setOpenConfirmModal(true)
  }

  return (
    <AdminPagesLayout title="Gérer les fichiers">
      <Stack gap={2}>
        <BodyText preventTransitionOut>
          Ci-dessous, vous trouverez tous les fichiers de votre site.
        </BodyText>
        <CustomTable
          rows={rows}
          allRows={allRows}
          setRows={setRows}
          headCells={headCells}
          arrayTitle={
            rows
              ? `Fichiers – ${rows.length} résultats (${totalSize} Mo)`
              : "Fichiers"
          }
          handleDelete={handleDeleteFile}
          refreshData={fetchFiles}
          noEdit
        />
      </Stack>
    </AdminPagesLayout>
  )
}

export default withConfirmAction(AdminFilesPanel)
