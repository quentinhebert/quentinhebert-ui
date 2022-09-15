import * as React from "react"
import { Box } from "@mui/system"
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material"
import { EnhancedTableHead, EnhancedTableToolbar } from "../Other/table-helper"
import dynamic from "next/dynamic"
const EditModalSwitch = dynamic(() => import("../Modals/edit-modal-switch"))

/******************** FUNCTIONS ********************/
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export default function CustomTable(props) {
  const {
    rows,
    allRows,
    setRows,
    headCells,
    arrayTitle,
    handleDelete,
    handleCreate,
    refreshData,
    editDataModel,
    noEdit,
  } = props
  const [order, setOrder] = React.useState("desc")
  const [orderBy, setOrderBy] = React.useState("created_at")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [openEditModal, setOpenEditModal] = React.useState(false)

  // WARNING: first column of the array MUST BE a primary key/id in DB
  const renderData = (row) =>
    headCells.slice(1).map((headCell) => {
      let data = `${row[headCell.id]}`
      if (headCell.valueGetter) {
        data = headCell.valueGetter(row[headCell.id], row.id)
      }
      return (
        <TableCell align="left" sx={{ cursor: "default" }} key={headCell.id}>
          {data}
        </TableCell>
      )
    })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCloseEditModal = async () => {
    await refreshData()
    setOpenEditModal(false)
  }

  const handleOpenEditModal = (usersToEdit) => {
    // usersToEdit must be an array of user ids (we get it from table-helper.js)
    // We don't allow editing several rows at the same time, so we will take the first element of the array
    if (!usersToEdit.length) {
      setSeverity("error")
      setMessageSnack(
        "Un problème est survenu lors de l'édition de l'utilisateur sélectionné."
      )
      return setOpenSnackBar(true)
    }
    // TODO: Open Edit Modal with usersToEdit[0].id => then fetch data of user from id => create component one row edit modal
    setOpenEditModal(true)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const selectedRows = []

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  if (rows)
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            headCells={headCells}
            allRows={allRows}
            setRows={setRows}
            numSelected={selected.length}
            arrayTitle={arrayTitle}
            selectedRows={selectedRows}
            handleDelete={handleDelete}
            handleEdit={handleOpenEditModal}
            noEdit={noEdit}
            handleCreate={handleCreate}
            refreshData={refreshData}
          />
          <TableContainer>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    // Let's stock somewhere the list of the ids of the selected rows, to transmit to the ToolBar for some functions (eg. delete row(s))
                    if (isItemSelected) selectedRows.push(row.id)
                    else if (selectedRows.includes(row.id) && !isItemSelected)
                      selectedRows.pop(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "rgba(144, 202, 249, 0.16)",
                          },
                        }}
                      >
                        {/* Row selection checkbox */}
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="secondary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: (theme) => theme.palette.text.secondary,
                              },
                            }}
                          />
                        </TableCell>
                        {/* ID */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          sx={{
                            cursor: "default",
                            maxWidth: "10rem",
                            wordBreak: "break-all",
                          }}
                        >
                          {row.id}
                        </TableCell>
                        {renderData(row)}
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    sx={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Elements per page:"}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
            }
          />
        </Paper>

        {openEditModal && editDataModel && (
          <EditModalSwitch
            dataId={selectedRows[0]}
            dataModel={editDataModel}
            openEditModal={openEditModal}
            handleCloseEditModal={handleCloseEditModal}
          />
        )}
      </Box>
    )
  // If !rows
  return <></>
}
