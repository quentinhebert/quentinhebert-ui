import * as React from "react"
import { Box } from "@mui/system"
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
  Stack,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import RefreshIcon from "@mui/icons-material/Refresh"
import { alpha } from "@mui/material/styles"
import { visuallyHidden } from "@mui/utils"
import CustomSearch from "./custom-search"
import CustomSelect from "./custom-select"
import OutlinedButton from "../ReusableComponents/buttons/outlined-button"

export function EnhancedTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

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
            sx={{
              "&.Mui-checked": {
                color: (theme) => theme.palette.secondary.main,
              },
              "&.MuiCheckbox-indeterminate": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: (theme) => theme.palette.text.white,
              ".MuiTableSortLabel-root.Mui-active": {
                color: (theme) => theme.palette.text.secondary,
              },
            }}
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
  )
}

export function EnhancedTableToolbar(props) {
  const {
    headCells,
    allRows,
    setRows,
    arrayTitle,
    selectedRows,
    handleDelete,
    handleEdit,
    handleCreate,
    refreshData,
    noEdit,
  } = props

  const [filterKey, setFilterKey] = React.useState("id")
  const [filterValue, setFilterValue] = React.useState("")

  React.useEffect(() => {
    if (filterKey && filterValue) handleFilter()
    else refreshData()
  }, [filterValue, filterKey])

  const handleFilter = () => {
    const filteredRows = allRows.filter((row) => {
      if (typeof row[filterKey] === "string")
        return row[filterKey].toLowerCase().includes(filterValue.toLowerCase()) // Case incensitive
      if (typeof row[filterKey] === "boolean") {
        return `${row[filterKey]}`
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      }
    })
    setRows(filteredRows)
  }

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
          sx={{ flex: "1 1 100%", color: (theme) => theme.palette.text.white }}
          variant="subtitle1"
          component="div"
        >
          {selectedRows.length} selected element(s)
        </Typography>
      ) : arrayTitle ? (
        <Typography
          sx={{ flex: "1 1 100%", color: (theme) => theme.palette.text.white }}
          variant="subtitle1"
          component="div"
        >
          {arrayTitle}
        </Typography>
      ) : null}

      {selectedRows.length === 0 ? (
        <Tooltip title="Refresh">
          <IconButton
            onClick={(e) => refreshData()}
            sx={{ marginRight: "1rem" }}
          >
            <RefreshIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ) : null}

      {selectedRows.length === 0 && handleCreate ? (
        <OutlinedButton onClick={(e) => handleCreate()} startIcon={<AddIcon />}>
          Ajouter
        </OutlinedButton>
      ) : null}

      {selectedRows.length === 1 && !noEdit ? (
        <Tooltip title="Edit">
          <IconButton onClick={(e) => handleEdit(selectedRows)}>
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ) : null}

      {selectedRows.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={(e) => handleDelete(selectedRows)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ) : null}

      <Stack
        sx={{
          width: "500px",
          marginLeft: "2rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          height: "55px",
          flexDirection: "row",
        }}
      >
        <CustomSelect
          placeholder="Filter"
          options={headCells}
          value={filterKey}
          setValue={setFilterKey}
          backgroundColor={(theme) => theme.palette.background.main}
        />
        <CustomSearch value={filterValue} setValue={setFilterValue} />
      </Stack>
    </Toolbar>
  )
}
