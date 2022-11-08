import DeleteIcon from "@mui/icons-material/Delete"
import { Stack } from "@mui/material"
import PillButton from "./pill-button"

export default function EditDeleteButtons({ handleDelete, handleEdit }) {
  return (
    <Stack gap={2} direction="row" className="flex-center">
      <PillButton
        onClick={handleDelete}
        background="transparent"
        border={(theme) => `1px solid ${theme.palette.secondary.main}`}
        color={(theme) => theme.palette.text.white}
      >
        <DeleteIcon color="secondary" />
      </PillButton>
      <PillButton
        onClick={handleEdit}
        color={(theme) => theme.palette.text.primary}
      >
        Modifier
      </PillButton>
    </Stack>
  )
}
