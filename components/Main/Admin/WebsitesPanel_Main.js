import { Box, Stack } from "@mui/material"
import { useState } from "react"
import AppsIcon from "@mui/icons-material/Apps"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import dynamic from "next/dynamic"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"

const WebsitesPanelSection = dynamic(() =>
  import("../../Sections/Admin/Websites/WebsitesPanelSection")
)
const WebsitesPanelUISection = dynamic(() =>
  import("../../Sections/Admin/Websites/WebsitesPanelUISection")
)

export default function WebsitesPanel_Main(props) {
  const {} = props

  const MODES = { PANEL: "panel", UI: "ui" }
  const [mode, setMode] = useState(MODES.UI)

  return (
    <>
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

        {mode === MODES.PANEL && <WebsitesPanelSection />}
        {mode === MODES.UI && <WebsitesPanelUISection />}
      </Stack>
    </>
  )
}
