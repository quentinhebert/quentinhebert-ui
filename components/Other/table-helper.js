import * as React from "react";
import { Box } from "@mui/system";
import {
  Checkbox,
  IconButton,
  Button,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

export function EnhancedTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function EnhancedTableToolbar(props) {
  const {
    arrayTitle,
    selectedRows,
    handleDelete,
    handleEdit,
    handleCreate,
    refreshData,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedRows.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedRows.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedRows.length} élément(s) sélectionné(s)
        </Typography>
      ) : arrayTitle ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {arrayTitle}
        </Typography>
      ) : null}

      {selectedRows.length === 0 ? (
        <Tooltip title="Rafraîchir">
          <IconButton onClick={(e) => refreshData()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {selectedRows.length === 0 ? (
        <Button
          variant="outlined"
          onClick={(e) => handleCreate()}
          sx={{ textTransform: "capitalize" }}
          startIcon={<AddIcon />}
        >
          <Typography variant="body2">Ajouter</Typography>
        </Button>
      ) : null}

      {selectedRows.length === 1 ? (
        <Tooltip title="Modifier">
          <IconButton onClick={(e) => handleEdit(selectedRows)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {selectedRows.length > 0 ? (
        <Tooltip title="Supprimer">
          <IconButton onClick={(e) => handleDelete(selectedRows)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
