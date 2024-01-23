import { Box, Typography } from "@mui/material"

export default function CancelTextButton({ handleCancel, ...props }) {
  return (
    <Box
      component="span"
      className="cool-button"
      onClick={handleCancel}
      sx={{ cursor: "pointer" }}
      {...props}
    >
      <Typography color="secondary">Annuler</Typography>
    </Box>
  )
}
