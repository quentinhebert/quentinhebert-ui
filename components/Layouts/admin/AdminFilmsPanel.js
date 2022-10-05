import { Box, Stack } from "@mui/material"
import { useState } from "react"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import AppsIcon from "@mui/icons-material/Apps"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FilmsPanel from "./FilmsPanelModes/FilmsPanel"
import FilmsPanelUI from "./FilmsPanelModes/FilmsPanelUI"
import CustomOutlinedButton from "../../ReusableComponents/buttons/custom-outlined-button"
import withSnacks from "../../hocs/withSnacks"

function AdminFilmsPanel(props) {
  const { setSeverity, setOpenSnackBar, setMessageSnack } = props

  const MODES = { PANEL: "panel", UI: "ui" }
  const [mode, setMode] = useState(MODES.UI)

  return (
    <Stack flexGrow={1}>
      <Stack
        justifyContent="center"
        direction="column"
        gap={2}
        padding="1rem"
        margin="100px 0"
      >
        <PageTitle zIndex={1} text="Gérer les films" />
        <Breadcrumbs panel="admin" />

        <Stack gap={2} flexDirection="row">
          <Box>
            <CustomOutlinedButton
              startIcon={<FormatListBulletedIcon />}
              onClick={() => setMode(MODES.PANEL)}
              color={
                mode === MODES.PANEL
                  ? (theme) => theme.palette.secondary.main
                  : (theme) => theme.palette.text.grey
              }
              hoverColor={
                mode === MODES.UI
                  ? (theme) => theme.palette.secondary.main
                  : (theme) => theme.palette.text.grey
              }
            >
              Panneau de gestion
            </CustomOutlinedButton>
          </Box>
          <Box>
            <CustomOutlinedButton
              startIcon={<AppsIcon />}
              onClick={() => setMode(MODES.UI)}
              color={
                mode === MODES.UI
                  ? (theme) => theme.palette.secondary.main
                  : (theme) => theme.palette.text.grey
              }
              hoverColor={
                mode === MODES.PANEL
                  ? (theme) => theme.palette.secondary.main
                  : (theme) => theme.palette.text.grey
              }
            >
              Interface de gestion
            </CustomOutlinedButton>
          </Box>
        </Stack>

        {mode === MODES.PANEL && <FilmsPanel />}
        {mode === MODES.UI && (
          <FilmsPanelUI
            setSeverity={setSeverity}
            setOpenSnackBar={setOpenSnackBar}
            setMessageSnack={setMessageSnack}
          />
        )}
      </Stack>
    </Stack>
  )
}

export default withSnacks(AdminFilmsPanel)
