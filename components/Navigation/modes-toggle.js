import { Stack, Tooltip } from "@mui/material"
import { MODES_ENUM } from "../../enums/modesEnum"
import ViewListIcon from "@mui/icons-material/ViewList"
import ViewModuleIcon from "@mui/icons-material/ViewModule"

export default function ModesToggle({ mode, setMode }) {
  return (
    <Stack
      color="#fff"
      className="row"
      flexGrow={1}
      sx={{ visibility: { xs: "hidden", sm: "visible" } }}
    >
      <Tooltip title="Grille">
        <ViewModuleIcon
          onClick={() => setMode(MODES_ENUM.GRID)}
          sx={{
            cursor: "pointer",
            color:
              mode === MODES_ENUM.GRID
                ? (theme) => theme.palette.text.secondary
                : "",
            "&:hover": {
              color: (theme) => theme.palette.text.secondary,
              opacity: 0.5,
            },
          }}
        />
      </Tooltip>
      <Tooltip title="Liste">
        <ViewListIcon
          onClick={() => setMode(MODES_ENUM.LIST)}
          sx={{
            cursor: "pointer",
            color:
              mode === MODES_ENUM.LIST
                ? (theme) => theme.palette.text.secondary
                : "",
            "&:hover": {
              color: (theme) => theme.palette.text.secondary,
              opacity: 0.5,
            },
          }}
        />
      </Tooltip>
    </Stack>
  )
}
