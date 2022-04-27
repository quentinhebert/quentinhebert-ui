import { Button, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { compose } from "redux";
import apiCall from "../../../services/apiCalls/apiCall";
import withConfirmAction from "../../hocs/withConfirmAction";
import withSnacks from "../../hocs/withSnacks";
import CustomTable from "../../sections/custom-table";

function AdminFilesPanel(props) {
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
  const [totalSize, setTotalSize] = useState(0);

  const router = useRouter();

  const fetchFiles = async () => {
    const res = await apiCall.admin.getFiles();
    if (res && res.ok) {
      const localTotalSize = 0;
      const localArray = [];
      const result = await res.json();
      await result.map((file, key) => {
        localArray.push(file);
        localTotalSize += file.size;
      });
      localTotalSize = Number(formatter.format(localTotalSize / 1024 / 1024));
      setTotalSize(localTotalSize);
      setRows(localArray);
      setAllRows(localArray);
    }
  };

  // Get files from DB
  useEffect(() => {
    fetchFiles();
  }, []);

  /***************** FUNCTIONS *****************/
  // Function to round param at closest decimal
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const deleteFiles = async (filesToDelete) => {
    // filesToDelete must be an array of user ids (we get it from handleDeleteFile())

    const errorsCount = filesToDelete.length;
    const [errors] = await Promise.all(
      filesToDelete.map(async (imageId) => {
        const res = await apiCall.admin.deleteFile({ id: imageId });
        if (res && res.ok) {
          errorsCount -= 1;
        }
        return errorsCount;
      })
    );

    if (errors === 0) {
      setSeverity("success");
      setMessageSnack("Image(s) supprimé(s) avec succès.");
      setOpenSnackBar(true);
    } else {
      setSeverity("error");
      setMessageSnack(
        `Un problème est survenu lors de la suppressions ${errors} des files sélectionnées.`
      );
      setOpenSnackBar(true);
    }

    await fetchFiles(); // Refresh data
  };
  const handleDeleteFile = async (filesToDelete) => {
    // filesToDelete must be an array of user ids (we get it from table-helper.js)
    if (!filesToDelete.length) {
      setSeverity("error");
      setMessageSnack(
        "Un problème est survenu lors de la suppressions des fichiers sélectionnées."
      );
      return setOpenSnackBar(true);
    }
    // Open confirm modal
    setConfirmTitle(`Confirmation`);
    setActionToFire(() => async () => await deleteFiles(filesToDelete));
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer ${filesToDelete.length} fichier(s) ?`,
    });
    setNextButtonText("Supprimer");
    setOpenConfirmModal(true);
  };

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
        return param ? <img src={param} style={{ width: "80px" }} /> : <></>;
      },
    },
    {
      id: "created_at",
      numeric: false,
      label: "Uploadé le",
      valueGetter: function (param, rowId) {
        const year = param.split("T")[0].split("-")[0];
        const month = param.split("T")[0].split("-")[1];
        const day = param.split("T")[0].split("-")[2];
        const hour = param.split("T")[1].split(":")[0];
        const min = param.split("T")[1].split(":")[1];
        const date = day + "/" + month + "/" + year.substring(2);
        const time = hour + ":" + min;
        return (
          <Tooltip title={`Pour filtrer, cherchez "${param}"`}>
            <div>{`Le ${date} à ${time}`}</div>
          </Tooltip>
        );
      },
    },
    {
      id: "type",
      numeric: false,
      label: "Type",
    },
    {
      id: "mimetype",
      numeric: false,
      label: "MIME-Type",
    },
    {
      id: "size",
      numeric: false,
      label: "Poids",
      valueGetter: function (param, rowId) {
        const size = formatter.format(param / 1024 / 1024);
        return (
          <Tooltip title={`Pour filtrer, cherchez "${param}"`}>
            <div>{`${size} Mo`}</div>
          </Tooltip>
        );
      },
    },
    {
      id: "author",
      numeric: false,
      label: "ID auteur",
    },
  ];

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Tableau de board
        </Link>
        {" > Fichiers"}
      </Typography>

      <Typography component="span" variant="body1">
        Ci-dessous, vous trouverez tous les fichiers de votre site.
      </Typography>
      <Paper variant="contained" sx={{ width: "100%" }}>
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
      </Paper>
    </Stack>
  );
}

export default compose(withSnacks, withConfirmAction)(AdminFilesPanel);
