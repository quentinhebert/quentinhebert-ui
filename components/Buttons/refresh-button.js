import RefreshIcon from "@mui/icons-material/Refresh"
import { Tooltip } from "@mui/material"
import PillButton from "./pill-button"

export default function RefreshButton({ refresh, label }) {
  return (
    <Tooltip title="Rafraîchîr">
      <div>
        <PillButton
          startIcon={<RefreshIcon sx={{ width: "1.5rem", height: "1.5rem" }} />}
          onClick={refresh}
          background="transparent"
          color={(theme) => theme.palette.text.secondary}
        />
      </div>
    </Tooltip>
  )
}
