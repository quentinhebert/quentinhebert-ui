import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"

export default function CustomCircularProgress() {
  return (
    <Stack sx={{ color: (theme) => theme.palette.secondary.main }}>
      <CircularProgress color="inherit" />
    </Stack>
  )
}
