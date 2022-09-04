import { Box, Button, Stack } from "@mui/material"
import { useState } from "react"
import Menu from "./menu"
import DragHandleIcon from "@mui/icons-material/DragHandle"

export default function MobileNavbar(props) {
  const { list } = props

  const [openMenuDialog, setOpenMenuDialog] = useState(false)

  const handleOpenMenuDialog = () => {
    setOpenMenuDialog(true)
  }
  const handleCloseMenuDialog = () => {
    setOpenMenuDialog(false)
  }

  return (
    <>
      <Button
        variant="text"
        sx={{
          color: (theme) => theme.palette.text.white,
          letterSpacing: "1px",
          padding: ".25rem",
          margin: ".5rem 0",
          "&:hover": {
            color: (theme) => theme.palette.secondary.main,
          },
        }}
        onClick={handleOpenMenuDialog}
      >
        <DragHandleIcon />
      </Button>

      <Menu
        open={openMenuDialog}
        handleClose={handleCloseMenuDialog}
        list={list}
      />
    </>
  )
}
