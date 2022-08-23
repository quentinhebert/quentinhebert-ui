import { Box, Stack, Typography } from "@mui/material"
import styles from "../../styles/FlashingRedDot.module.css"
import CircleIcon from "@mui/icons-material/Circle"

export default function FlashingRedDot() {
  return (
    <Stack className={styles.flash} flexDirection="row">
      <Typography letterSpacing={1.5} color="text.secondary">
        Rec
      </Typography>
      <CircleIcon
        sx={{
          color: (theme) => theme.palette.text.secondary,
          display: "flex",
          margin: "auto 1.25vw auto 0.5vw",
          width: "1rem",
        }}
      />
    </Stack>
  )
}
