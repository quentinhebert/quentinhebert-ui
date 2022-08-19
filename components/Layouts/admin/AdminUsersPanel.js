import {
  Avatar,
  Button,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
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
    id: "avatar_path",
    numeric: false,
    label: "Avatar",
    valueGetter: function (param, rowId) {
      return <Avatar src={param} sx={{ width: "60px", height: "60px" }} />;
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
    label: "Firstname",
  },
  {
    id: "lastname",
    numeric: false,
    label: "Lastname",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
  },
  {
    id: "created_at",
    numeric: false,
    label: "Created on",
    valueGetter: function (param, rowId) {
      const year = param.split("T")[0].split("-")[0];
      const month = param.split("T")[0].split("-")[1];
      const day = param.split("T")[0].split("-")[2];
      const hour = param.split("T")[1].split(":")[0];
      const min = param.split("T")[1].split(":")[1];
      return `${year}/${month}/${day} at ${hour}:${min}`;
    },
  },
  {
    id: "email_confirmed",
    numeric: false,
    label: "Email confirmed",
    valueGetter: function (param, rowId) {
      if (!param)
        return (
          <Tooltip
            title={`To filter, please search ${param.toString().toUpperCase()}`}
          >
            <div style={{ maxWidth: "150px" }}>❌</div>
          </Tooltip>
        );
      else
        return (
          <>
            <Tooltip
              title={`To filter, please search ${param
                .toString()
                .toUpperCase()}`}
            >
              <div>✅</div>
            </Tooltip>
          </>
        );
    },
  },
  {
    id: "banned",
    numeric: false,
    label: "Banned",
    valueGetter: function (param) {
      if (!param)
        return (
          <Tooltip
            title={`To filter, please search ${param.toString().toUpperCase()}`}
          >
            <div style={{ maxWidth: "150px" }}>❌</div>
          </Tooltip>
        );
      else
        return (
          <>
            <Tooltip
              title={`To filter, please search ${param
                .toString()
                .toUpperCase()}`}
            >
              <div>✅</div>
            </Tooltip>
          </>
        );
    },
  },
];

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
  } = props;

  const [rows, setRows] = useState(null);
  const [allRows, setAllRows] = useState(null); // To keep a constant reference for search filter
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
      setAllRows(localArray);
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
      setMessageSnack("User(s) deleted successfully.");
      setOpenSnackBar(true);
    } else {
      setSeverity("error");
      setMessageSnack(
        `A problem occured while deletibg ${errors} of the selected users.`
      );
      setOpenSnackBar(true);
    }

    await fetchUsers(); // Refresh data
  };
  const handleDeleteUser = async (usersToDelete) => {
    // usersToDelete must be an array of user ids (we get it from table-helper.js)
    if (!usersToDelete.length) {
      setSeverity("error");
      setMessageSnack("A problem occurred while deleting the selected user(s)");
      return setOpenSnackBar(true);
    }
    // Open confirm modal
    setConfirmTitle(`Delete ${usersToDelete.length} users`);
    setActionToFire(() => async () => await deleteUsers(usersToDelete));
    setConfirmContent({
      text: `Do you really want to delete ${usersToDelete.length} user(s) ?`,
    });
    setNextButtonText("Delete");
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
          Dashboard
        </Link>
        {" > Users"}
      </Typography>

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

export default compose(withSnacks, withConfirmAction)(AdminUsersPanel);
