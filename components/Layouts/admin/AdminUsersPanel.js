import { Button, Link, Paper, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { compose } from "redux";
import apiCall from "../../../services/apiCalls/apiCall";
import withConfirmAction from "../../hocs/withConfirmAction";
import withSnacks from "../../hocs/withSnacks";
import CustomTable from "../../sections/custom-table";
const SignUpModal = dynamic(() => import("../../Modals/signup-modal"));

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
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
    valueGetter: function (param) {
      const year = param.split("T")[0].split("-")[0];
      const month = param.split("T")[0].split("-")[1];
      const day = param.split("T")[0].split("-")[2];
      const hour = param.split("T")[1].split(":")[0];
      const min = param.split("T")[1].split(":")[1];
      return `${year}/${month}/${day} à ${hour}:${min}`;
      // return param;
    },
  },
  {
    id: "email_confirmed",
    numeric: false,
    label: "E-mail confirmé",
    valueGetter: function (param) {
      if (param) return "Oui";
      return "Non";
    },
  },
  {
    id: "banned",
    numeric: false,
    label: "Banni",
    valueGetter: function (param) {
      if (param) return "Oui";
      return "Non";
    },
  },
];

function AdminIndex(props) {
  const {
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props;

  const [rows, setRows] = useState(null);
  const [openSignUp, setOpenSignUp] = useState(false);

  const router = useRouter();

  const fetchUsers = async () => {
    const res = await apiCall.admin.getAllUsers();
    if (res && res.ok) {
      const result = await res.json();
      // setRows(result);
      const localArray = [];
      await result.map((user, key) => {
        localArray.push(user);
      });
      setRows(localArray);
    }
  };

  // Get users from DB
  useEffect(() => {
    fetchUsers();
  }, []);

  /***************** FUNCTIONS *****************/
  const deleteUsers = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from handleDeleteUser())

    const errorsCount = usersToDelete.length;
    const [errors] = await Promise.all(
      usersToDelete.map(async (userId) => {
        const res = await apiCall.users.delete(userId);
        if (res && res.ok) {
          errorsCount -= 1;
        }
        return errorsCount;
      })
    );

    if (errors === 0) {
      setSeverity("success");
      setMessageSnack("Utilisateur(s) supprimé(s) avec succès.");
      setOpenSnackBar(true);
    } else {
      setSeverity("error");
      setMessageSnack(
        `Un problème est survenu lors de la suppressions ${errors} des utilisateurs sélectionnés.`
      );
      setOpenSnackBar(true);
    }

    await fetchUsers(); // Refresh data
  };

  const handleDeleteUser = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from table-helper.js)
    if (!usersToDelete.length) {
      setSeverity("error");
      setMessageSnack(
        "Un problème est survenu lors de la suppressions des utilisateurs sélectionnés."
      );
      return setOpenSnackBar(true);
    }
    // Open confirm modal
    setConfirmTitle(`Supprimer ${usersToDelete.length} utilisateurs`);
    setActionToFire(() => async () => await deleteUsers(usersToDelete));
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${usersToDelete.length} utilisateur(s) ?`,
    });
    setNextButtonText("Supprimer");
    setOpenConfirmModal(true);
  };

  const handleCreate = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = async () => {
    setOpenSignUp(false);
    await fetchUsers();
  };

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Tableau de board
        </Link>
        {" > Utilisateurs"}
      </Typography>

      <Typography component="span" variant="body1">
        Ci-dessous, vous trouverez tous les utilisateurs de votre site.
      </Typography>
      <Paper variant="contained" sx={{ width: "100%" }}>
        <CustomTable
          rows={rows}
          headCells={headCells}
          arrayTitle={"Utilisateurs"}
          handleDelete={handleDeleteUser}
          handleCreate={handleCreate}
          refreshData={fetchUsers}
          editDataModel="edit-user"
        />
        {openSignUp ? (
          <SignUpModal
            openSignUp={openSignUp}
            handleCloseSignUp={handleCloseSignUp}
            setSeverity={setSeverity}
            setOpenSnackBar={setOpenSnackBar}
            setMessageSnack={setMessageSnack}
          />
        ) : null}
      </Paper>
    </Stack>
  );
}

export default compose(withSnacks, withConfirmAction)(AdminIndex);
