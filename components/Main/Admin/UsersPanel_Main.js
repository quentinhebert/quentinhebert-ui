import { Avatar, Box, Stack, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomTable from "../../Tables/custom-table"
import SignUpForm from "../../Forms/signup-form"
import { AppContext } from "../../../contexts/AppContext"
import CustomModal from "../../Modals/custom-modal"
import BodyText from "../../Text/body-text"
import AlertInfo from "../../Other/alert-info"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import GenerateClientSignupLink from "../../Forms/admin/generate-client-signup-link"

function getBoolValue(param) {
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
}

function getDateValue(param) {
  const year = param.split("T")[0].split("-")[0]
  const month = param.split("T")[0].split("-")[1]
  const day = param.split("T")[0].split("-")[2]
  const hour = param.split("T")[1].split(":")[0]
  const min = param.split("T")[1].split(":")[1]
  // return `${year}/${month}/${day} at ${hour}:${min}`
  return `${day}/${month}/${year} à ${hour}:${min}`
}

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
    valueGetter: function (param) {
      return <Avatar src={param} sx={{ width: "60px", height: "60px" }} />
    },
    centered: true,
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
    valueGetter: (param) => getDateValue(param),
  },
  {
    id: "email_confirmed",
    numeric: false,
    label: "E-mail confirmé",
    valueGetter: (param) => getBoolValue(param),
    centered: true,
  },
  {
    id: "password_forgotten",
    numeric: false,
    label: "Mot de passe oublié",
    valueGetter: (param) => getBoolValue(param),
    centered: true,
  },
  {
    id: "banned",
    numeric: false,
    label: "Banni",
    valueGetter: (param) => getBoolValue(param),
    centered: true,
  },
]

function UsersPanel_Main(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const [rows, setRows] = useState(null)
  const [allRows, setAllRows] = useState(null) // To keep a constant reference for search filter
  const [openSignUp, setOpenSignUp] = useState(false)

  const fetchUsers = async () => {
    const res = await apiCall.users.getAll()
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
      setSnackSeverity("success")
      setSnackMessage("User(s) deleted successfully.")
    } else {
      setSnackSeverity("error")
      setSnackMessage(
        `A problem occured while deletibg ${errors} of the selected users.`
      )
    }

    await fetchUsers() // Refresh data
  }
  const handleDeleteUser = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from table-helper.js)
    if (!usersToDelete.length) {
      setSnackSeverity("error")
      return setSnackMessage(
        `Un problème est survenu lors de la suppression de(s) ${usersToDelete.length} utilisateur(s)`
      )
    }
    // Open confirm modal
    setConfirmTitle(`Supprimer ${usersToDelete.length} utilisateur(s)`)
    setActionToFire(() => async () => await deleteUsers(usersToDelete))
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${usersToDelete.length} utilisateur(s) ?`,
    })
    setNextButtonText("Supprimer")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => {
    setOpenSignUp(true)
  }
  const handleCloseSignUp = async () => {
    setOpenSignUp(false)
    await fetchUsers()
  }

  const [clientLink, setClientLink] = useState(false)
  const handleClientLink = () => setClientLink(true)

  return (
    <>
      <Stack gap={2}>
        <BodyText preventTransitionOut>
          Ci-dessous, vous trouverez tous les utilisateurs de votre site.
        </BodyText>
        <CustomTable
          rows={rows}
          allRows={allRows}
          setRows={setRows}
          headCells={headCells}
          arrayTitle={
            rows ? `Utilisateurs - ${rows.length} resultat(s)` : "Utilisateurs"
          }
          handleDelete={handleDeleteUser}
          handleCreate={handleCreate}
          refreshData={fetchUsers}
          editDataModel="edit-user"
        />
      </Stack>

      <CustomModal open={openSignUp} handleClose={handleCloseSignUp} gap={2}>
        <ModalTitle>
          {clientLink
            ? "Générer un lien d'inscription"
            : "Ajouter un utilisateur"}
        </ModalTitle>
        <AlertInfo
          content={{
            severity: "info",
            title: "Générer un lien d'inscription",
            js: (
              <BodyText fontSize="1rem">
                Vous pouvez générer un{" "}
                <Box
                  component="span"
                  sx={{
                    textDecoration: "underline",
                    color: (theme) => theme.palette.text.secondary,
                    cursor: "pointer",
                  }}
                  onClick={handleClientLink}
                >
                  lien d'inscription
                </Box>{" "}
                (client uniquement). Le client pourra ainsi remplir tous les
                champs d'inscription lui-même.
              </BodyText>
            ),
          }}
        />
        {clientLink ? (
          <GenerateClientSignupLink
            handleCancel={() => setClientLink(false)}
            handleClose={handleCloseSignUp}
          />
        ) : (
          <SignUpForm handleClose={handleCloseSignUp} />
        )}
      </CustomModal>
    </>
  )
}

export default withConfirmAction(UsersPanel_Main)
