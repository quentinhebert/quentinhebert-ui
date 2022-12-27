import { Box, Typography } from "@mui/material"

export default function CancelTextButton({ handleCancel }) {
  return (
    <Box
      component="span"
      onClick={handleCancel}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
    >
      <Typography color="secondary">Annuler</Typography>
    </Box>
  )
}
