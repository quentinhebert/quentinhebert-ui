import RefreshIcon from "@mui/icons-material/Refresh"
import PillButton from "./pill-button"

export default function RefreshButton({ refresh, label }) {
  return (
    <PillButton startIcon={<RefreshIcon />} onClick={refresh}>
      {label || "Rafraîchir"}
    </PillButton>
  )
}
