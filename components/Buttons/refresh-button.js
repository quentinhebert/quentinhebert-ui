import RefreshIcon from "@mui/icons-material/Refresh"
import { CircularProgress, Tooltip } from "@mui/material"
import PillButton from "./pill-button"

export default function RefreshButton({ refresh, loading }) {
  return (
    <Tooltip title="Rafraîchîr">
      <div>
        <PillButton
          onClick={refresh}
          background="transparent !important"
          color={(theme) => theme.palette.text.secondary}
          padding="1rem"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="secondary" size="1.5rem" />
          ) : (
            <RefreshIcon sx={{ width: "1.5rem", height: "1.5rem" }} />
          )}
        </PillButton>
      </div>
    </Tooltip>
  )
}
