import {
  Avatar,
  Button,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { compose } from "redux"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import withSnacks from "../../hocs/withSnacks"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import PageTitle from "../../ReusableComponents/titles/page-title"
import CustomTable from "../../Sections/custom-table"
import SignUpModal from "../../Modals/signup-modal"

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "avatar_path",
    numeric: false,
    label: "Avatar",
    valueGetter: function (param, rowId) {
      return <Avatar src={param} sx={{ width: "60px", height: "60px" }} />
    },
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
  },
  {
    id: "firstname",
    numeric: false,
    label: "Prénom",
  },
  {
    id: "lastname",
    numeric: false,
    label: "Nom",
  },
  {
    id: "email",
    numeric: false,
    label: "E-mail",
  },
  {
    id: "phone",
    numeric: false,
    label: "Téléphone",
  },
  {
    id: "created_at",
    numeric: false,
    label: "Créé le",
    valueGetter: function (param, rowId) {
      const year = param.split("T")[0].split("-")[0]
      const month = param.split("T")[0].split("-")[1]
      const day = param.split("T")[0].split("-")[2]
      const hour = param.split("T")[1].split(":")[0]
      const min = param.split("T")[1].split(":")[1]
      // return `${year}/${month}/${day} at ${hour}:${min}`
      return `${day}/${month}/${year} à ${hour}:${min}`
    },
  },
  {
    id: "email_confirmed",
    numeric: false,
    label: "E-mail confirmé",
    valueGetter: function (param, rowId) {
      if (!param)
        return (
          <Tooltip
            title={`Pour filtrer, veuillez chercher ${param
              .toString()
              .toUpperCase()}`}
          >
            <div>❌</div>
          </Tooltip>
        )
      else
        return (
          <>
            <Tooltip
              title={`Pour filtrer, veuillez chercher ${param
                .toString()
                .toUpperCase()}`}
            >
              <div>✅</div>
            </Tooltip>
          </>
        )
    },
  },
  {
    id: "banned",
    numeric: false,
    label: "Banni",
    valueGetter: function (param) {
      if (!param)
        return (
          <Tooltip
            title={`Pour filtrer, veuillez chercher ${param
              .toString()
              .toUpperCase()}`}
          >
            <div>❌</div>
          </Tooltip>
        )
      else
        return (
          <>
            <Tooltip
              title={`Pour filtrer, veuillez chercher ${param
                .toString()
                .toUpperCase()}`}
            >
              <div>✅</div>
            </Tooltip>
          </>
        )
    },
  },
]

function AdminUsersPanel(props) {
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
  const [allRows, setAllRows] = useState(null) // To keep a constant reference for search filter
  const [openSignUp, setOpenSignUp] = useState(false)

  const router = useRouter()

  const fetchUsers = async () => {
    const res = await apiCall.admin.getAllUsers()
    if (res && res.ok) {
      const result = await res.json()
      // setRows(result);
      const localArray = []
      await result.map((user, key) => {
        localArray.push(user)
      })
      setRows(localArray)
      setAllRows(localArray)
    }
  }

  // Get users from DB
  useEffect(() => {
    fetchUsers()
  }, [])

  /***************** FUNCTIONS *****************/
  const deleteUsers = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from handleDeleteUser())

    const errorsCount = usersToDelete.length
    const [errors] = await Promise.all(
      usersToDelete.map(async (userId) => {
        const res = await apiCall.users.delete(userId)
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSeverity("success")
      setMessageSnack("User(s) deleted successfully.")
      setOpenSnackBar(true)
    } else {
      setSeverity("error")
      setMessageSnack(
        `A problem occured while deletibg ${errors} of the selected users.`
      )
      setOpenSnackBar(true)
    }

    await fetchUsers() // Refresh data
  }
  const handleDeleteUser = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from table-helper.js)
    if (!usersToDelete.length) {
      setSeverity("error")
      setMessageSnack("A problem occurred while deleting the selected user(s)")
      return setOpenSnackBar(true)
    }
    // Open confirm modal
    setConfirmTitle(`Delete ${usersToDelete.length} users`)
    setActionToFire(() => async () => await deleteUsers(usersToDelete))
    setConfirmContent({
      text: `Do you really want to delete ${usersToDelete.length} user(s) ?`,
    })
    setNextButtonText("Delete")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => {
    setOpenSignUp(true)
  }
  const handleCloseSignUp = async () => {
    setOpenSignUp(false)
    await fetchUsers()
  }

  return (
    <>
      <Stack
        justifyContent="center"
        direction="column"
        gap={4}
        padding="1rem"
        marginTop="100px"
      >
        <PageTitle zIndex={1} text="Gérer les utilisateurs" />
        <Breadcrumbs />

        <Typography component="span" variant="body1">
          Beneath, you can find all the users of your website.
        </Typography>
        <Paper variant="contained" sx={{ width: "100%" }}>
          <CustomTable
            rows={rows}
            allRows={allRows}
            setRows={setRows}
            headCells={headCells}
            arrayTitle={rows ? `Users - ${rows.length} result(s)` : "Users"}
            handleDelete={handleDeleteUser}
            handleCreate={handleCreate}
            refreshData={fetchUsers}
            editDataModel="edit-user"
          />
        </Paper>
      </Stack>

      <SignUpModal
        openSignUp={openSignUp}
        handleCloseSignUp={handleCloseSignUp}
        setSeverity={setSeverity}
        setOpenSnackBar={setOpenSnackBar}
        setMessageSnack={setMessageSnack}
      />
    </>
  )
}

export default compose(withSnacks, withConfirmAction)(AdminUsersPanel)
