import { Typography } from "@mui/material"
import styles from "../../../styles/TextShine.module.css"

export const ModalTitle = (props) => (
  <Typography
    component="h2"
    variant="h5"
    sx={{
      letterSpacing: 1,
      color: (theme) => theme.palette.text.secondary,
    }}
    className={styles.shine}
    {...props}
  />
)
