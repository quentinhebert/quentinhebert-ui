import { Stack } from "@mui/material"
import { useState } from "react"
import Menu from "./menu"
import { Cross as Hamburger } from "hamburger-react"

export default function MobileNavbar(props) {
  const { list, page } = props

  const [openMenuDialog, setOpenMenuDialog] = useState(false)

  const handleOpenMenuDialog = () => {
    setOpenMenuDialog(true)
  }
  const handleCloseMenuDialog = () => {
    setOpenMenuDialog(false)
  }

  return (
    <>
      <Stack position="relative" zIndex={1000}>
        <Hamburger
          toggled={openMenuDialog}
          toggle={setOpenMenuDialog}
          color="#fff"
          rounded
          size={20}
          onToggle={(toggled) => {
            if (toggled) handleOpenMenuDialog()
            else handleCloseMenuDialog()
          }}
        />
      </Stack>

      <Menu
        open={openMenuDialog}
        handleClose={handleCloseMenuDialog}
        list={list}
        page={page}
      />
    </>
  )
}
