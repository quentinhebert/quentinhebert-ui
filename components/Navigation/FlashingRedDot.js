import { Box, Stack, Typography } from "@mui/material"
import styles from "../../styles/FlashingRedDot.module.css"
import CircleIcon from "@mui/icons-material/Circle"

export default function FlashingRedDot() {
  return (
    <Stack className={styles.flash} flexDirection="row">
      <Typography letterSpacing={2} sx={{ color: "red" }}>
        Rec
      </Typography>
      <CircleIcon
        sx={{
          color: "red",
          display: "flex",
          marginLeft: ".5rem",
          width: "1rem",
        }}
      />
    </Stack>
  )
}