import { Box, Typography } from "@mui/material"

export default function CancelTextButton({ handleCancel }) {
  return (
    <Box
      component="span"
      className="cool-button"
      onClick={handleCancel}
      sx={{ cursor: "pointer" }}
    >
      <Typography color="secondary">Annuler</Typography>
    </Box>
  )
}
