import RefreshIcon from "@mui/icons-material/Refresh"
import { CircularProgress } from "@mui/material"
import IconButton from "./icon-button"

export default function RefreshButton({ refresh, loading, ...props }) {
  return (
    <IconButton
      onClick={refresh}
      disabled={loading}
      tooltip="Rafraîchir"
      {...props}
    >
      {loading ? (
        <CircularProgress color="secondary" size="1.5rem" />
      ) : (
        <RefreshIcon />
      )}
    </IconButton>
  )
}
