import { CircularProgress, Tooltip } from "@mui/material"
import PillButton from "./pill-button"

export default function CustomIconButton({ onClick, icon, tooltip, loading }) {
  return (
    <Tooltip title={tooltip || ""}>
      <div>
        <PillButton
          onClick={onClick}
          background="transparent !important"
          color={(theme) => theme.palette.text.secondary}
          padding="1rem"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="secondary" size="1.5rem" />
          ) : (
            icon
          )}
        </PillButton>
      </div>
    </Tooltip>
  )
}
