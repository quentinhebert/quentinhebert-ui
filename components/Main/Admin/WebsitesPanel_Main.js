import { Box, Stack } from "@mui/material"
import { useState } from "react"
import AppsIcon from "@mui/icons-material/Apps"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import dynamic from "next/dynamic"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"
import ModesToggle from "../../Navigation/modes-toggle"
import { MODES_ENUM } from "../../../enums/modesEnum"

const WebsitesPanelSection = dynamic(() =>
  import("../../Sections/Admin/Websites/websites-panel-section")
)
const WebsitesPanelUISection = dynamic(() =>
  import("../../Sections/Admin/Websites/websites-panel-ui-section")
)

export default function WebsitesPanel_Main({}) {
  const [mode, setMode] = useState(MODES_ENUM.GRID)

  return (
    <>
      <Stack gap={2}>
        <Stack gap={2} flexDirection="row">
          <ModesToggle mode={mode} setMode={setMode} />
        </Stack>

        {mode === MODES_ENUM.LIST && <WebsitesPanelSection />}
        {mode === MODES_ENUM.GRID && <WebsitesPanelUISection />}
      </Stack>
    </>
  )
}
