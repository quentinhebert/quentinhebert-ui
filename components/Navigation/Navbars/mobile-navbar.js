import { Box, Button, Stack } from "@mui/material"
import { useState } from "react"
import Menu from "./menu"
import FlashingRedDot from "../FlashingRedDot"
import DragHandleIcon from "@mui/icons-material/DragHandle"

export default function MobileNavbar(props) {
  const { mainColor, list } = props

  const [openMenuDialog, setOpenMenuDialog] = useState(false)

  const handleOpenMenuDialog = () => {
    setOpenMenuDialog(true)
  }
  const handleCloseMenuDialog = () => {
    setOpenMenuDialog(false)
  }

  return (
    <>
      <Stack flexDirection="row" sx={{ letterSpacing: "2px" }}>
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            letterSpacing: "1px",
            padding: ".25rem .75rem",
            margin: ".5rem",
            border: "none",
            "&:hover": {
              color: (theme) => theme.palette.text.primary,
            },
          }}
          onClick={handleOpenMenuDialog}
        >
          <Box
            sx={{
              zIndex: 0,
              position: "absolute",
              top: "-5%",
              left: "10%",
              height: "110%",
              width: "80%",
            }}
          />
          <Box
            sx={{
              zIndex: 0,
              position: "absolute",
              top: "15%",
              left: "-5%",
              height: "70%",
              width: "110%",
            }}
          />
          {/* <FlashingRedDot /> */}
          {/* <Box sx={{ zIndex: 1 }}>Menu</Box> */}
          <Box sx={{ zIndex: 1 }}>
            <DragHandleIcon />
          </Box>
        </Button>
      </Stack>
      <Menu
        open={openMenuDialog}
        handleClose={handleCloseMenuDialog}
        list={list}
      />
    </>
  )
}
