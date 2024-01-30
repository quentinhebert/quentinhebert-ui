import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useContext, useRef } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import AddIcon from "@mui/icons-material/Add"

import { Context } from "./module"
import StatusTabs from "./components/status-tabs"
import ProspectsList from "./components/prospect-list"
import PillButton from "../../../Buttons/pill-button"
import useAddProspect from "../../../../hooks/useAddProspect"
import useViewProspect from "../../../../hooks/useViewProspect"

export function ProspectsSection() {
  const { state, fetchProspects } = useContext(Context)

  const { handleOpenAddProspectModal, AddProspectDialog } = useAddProspect({
    refreshData: fetchProspects,
  })
  const { handleOpenViewProspectModal, ViewProspectDialog } = useViewProspect({
    id: state.selectedProspectId,
    refreshData: fetchProspects,
  })

  return (
    <>
      <Stack
        position="relative"
        gap={4}
        sx={{
          background: (theme) => theme.palette.background.main,
          borderRadius: "30px",
        }}
        padding={{ xs: "2rem .75rem", md: "2rem" }}
      >
        <Typography variant="h5" color="#fff" textAlign="center">
          Prospects{" "}
          {state.prospects.filter((elt) => elt.opened === false).length
            ? `(${
                state.prospects.filter((elt) => elt.opened === false).length
              })`
            : null}
        </Typography>

        <RefreshBtn />
        <NewProspectBtn />
        <StatusTabs />

        <Stack gap={2} overflow="hidden">
          <ProspectsList handleOpenEditModal={handleOpenViewProspectModal} />
        </Stack>

        {AddProspectDialog({})}
        {ViewProspectDialog({})}
      </Stack>
    </>
  )

  function RefreshBtn() {
    return (
      <Box sx={{ position: "absolute", left: 30, top: 30 }}>
        <Tooltip title="Raffraîchir">
          <IconButton
            onClick={fetchProspects}
            sx={{
              aspectRatio: 1,
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.main,
              "&:hover": { color: (theme) => theme.palette.secondary.main },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
  function NewProspectBtn() {
    return (
      <Box sx={{ position: "absolute", right: 30, top: 30 }}>
        <Tooltip title="Nouveau prospect">
          <IconButton
            onClick={handleOpenAddProspectModal}
            sx={{
              aspectRatio: 1,
              display: { xs: "block", md: "none" },
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.main,
              "&:hover": { color: (theme) => theme.palette.secondary.main },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <PillButton
          preventTransition
          startIcon={<AddIcon />}
          onClick={handleOpenAddProspectModal}
          display={{ xs: "none", md: "flex" }}
        >
          Créer
        </PillButton>
      </Box>
    )
  }
}
