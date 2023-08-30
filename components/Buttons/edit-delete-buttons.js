import { Stack, Tooltip, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import PillButton from "./pill-button"

export default function EditDeleteButtons({ handleDelete, handleEdit }) {
  return (
    <Stack gap={2} className="flex-center">
      <PillButton
        width="100%"
        onClick={handleEdit}
        startIcon={<EditIcon />}
        preventTransitionOut
      >
        Modifier
      </PillButton>

      <Stack
        color="error.main"
        onClick={handleDelete}
        width="100%"
        className="row flex-center pointer"
        gap={1}
        sx={{
          "&:hover": { textDecoration: "underline" },
        }}
      >
        <DeleteIcon />
        <Typography>Supprimer</Typography>
      </Stack>
    </Stack>
  )
}
