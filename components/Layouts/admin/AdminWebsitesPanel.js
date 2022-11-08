import { Box, Stack } from "@mui/material"
import { useState } from "react"
import AppsIcon from "@mui/icons-material/Apps"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import dynamic from "next/dynamic"
import AdminPagesLayout from "../AdminPagesLayout"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"

const WebsitesPanel = dynamic(() =>
  import("./WebsitesPanelModes/WebsitesPanel")
)
const WebsitesPanelUI = dynamic(() =>
  import("./WebsitesPanelModes/WebsitesPanelUI")
)

export default function AdminFilmsPanel(props) {
  const {} = props

  const MODES = { PANEL: "panel", UI: "ui" }
  const [mode, setMode] = useState(MODES.UI)

  return (
    <AdminPagesLayout title="Mes sites web">
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

        {mode === MODES.PANEL && <WebsitesPanel />}
        {mode === MODES.UI && <WebsitesPanelUI />}
      </Stack>
    </AdminPagesLayout>
  )
}
