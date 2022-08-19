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
      setMessageSnack("File(s) deleted successfully.");
      setOpenSnackBar(true);
    } else {
      setSeverity("error");
      setMessageSnack(
        `A problem occurred while deleting ${errors} of the selected files.`
      );
      setOpenSnackBar(true);
    }

    await fetchFiles(); // Refresh data
  };
  const handleDeleteFile = async (filesToDelete) => {
    // filesToDelete must be an array of user ids (we get it from table-helper.js)
    if (!filesToDelete.length) {
      setSeverity("error");
      setMessageSnack("A problem occurred while deleting the selected files");
      return setOpenSnackBar(true);
    }
    // Open confirm modal
    setConfirmTitle(`Confirmation`);
    setActionToFire(() => async () => await deleteFiles(filesToDelete));
    setConfirmContent({
      text: `Do you really want to delete ${filesToDelete.length} file(s) ?`,
    });
    setNextButtonText("Delete");
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
      label: "File",
      valueGetter: function (param, rowId) {
        return param ? <img src={param} style={{ width: "80px" }} /> : <></>;
      },
    },
    {
      id: "created_at",
      numeric: false,
      label: "Uploades on",
      valueGetter: function (param, rowId) {
        const year = param.split("T")[0].split("-")[0];
        const month = param.split("T")[0].split("-")[1];
        const day = param.split("T")[0].split("-")[2];
        const hour = param.split("T")[1].split(":")[0];
        const min = param.split("T")[1].split(":")[1];
        const date = day + "/" + month + "/" + year.substring(2);
        const time = hour + ":" + min;
        return (
          <Tooltip title={`To filter, search "${param}"`}>
            <div>{`On ${date} at ${time}`}</div>
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
      label: "Size",
      valueGetter: function (param, rowId) {
        const size = formatter.format(param / 1024 / 1024);
        return (
          <Tooltip title={`To filter, please search "${param}"`}>
            <div>{`${size} Mo`}</div>
          </Tooltip>
        );
      },
    },
    {
      id: "author",
      numeric: false,
      label: "ID author",
    },
  ];

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Fichiers"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can find all the files of the website.
      </Typography>
      <Paper variant="contained" sx={{ width: "100%" }}>
        <CustomTable
          rows={rows}
          allRows={allRows}
          setRows={setRows}
          headCells={headCells}
          arrayTitle={
            rows ? `Files – ${rows.length} results (${totalSize} Mo)` : "Files"
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
