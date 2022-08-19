import { Box, Button, Stack } from "@mui/material"
import { useState } from "react"
import Menu from "./menu"
import FlashingRedDot from "../FlashingRedDot"

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
            backgroundColor: "#fff",
            color: "#fff",
            letterSpacing: "1px",
            padding: ".25rem .75rem",
            margin: ".5rem",
            backgroundColor: (theme) => theme.palette.background.main,
            border: "1px solid #fff",
            borderRadius: 0,
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
              backgroundColor: (theme) => theme.palette.background.main,
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
              backgroundColor: (theme) => theme.palette.background.main,
            }}
          />
          <FlashingRedDot />
          <Box sx={{ zIndex: 1 }}>Menu</Box>
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
