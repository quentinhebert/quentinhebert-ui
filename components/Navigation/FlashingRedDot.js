import { Box } from "@mui/material"
import styles from "../../styles/FlashingRedDot.module.css"
import CircleIcon from "@mui/icons-material/Circle"

export default function FlashingRedDot() {
  return (
    <Box
      className={styles.flash}
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
      }}
    >
      <CircleIcon sx={{ color: "red", width: "6px" }} />
    </Box>
  )
}
