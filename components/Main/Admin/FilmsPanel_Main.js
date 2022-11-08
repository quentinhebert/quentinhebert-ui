import { Box, Stack } from "@mui/material"
import { useState } from "react"
import AppsIcon from "@mui/icons-material/Apps"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FilmsPanelSection from "../../Sections/Admin/Films/films-panel-section"
import FilmsPanelUISection from "../../Sections/Admin/Films/films-panel-ui-section"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"

export default function FilmsPanel_Main(props) {
  const {} = props

  const MODES = { PANEL: "panel", UI: "ui" }
  const [mode, setMode] = useState(MODES.UI)

  return (
    <Stack gap={2}>
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

      {mode === MODES.PANEL && <FilmsPanelSection />}
      {mode === MODES.UI && <FilmsPanelUISection />}
    </Stack>
  )
}
