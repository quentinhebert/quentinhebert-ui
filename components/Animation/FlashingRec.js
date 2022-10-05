import { Box, Stack, Typography } from "@mui/material"
import styles from "../../styles/FlashingRedDot.module.css"
import CircleIcon from "@mui/icons-material/Circle"

export default function FlashingRec(props) {
  return (
    <Stack position="relative">
      <Stack
        alignItems="center"
        flexDirection="row"
        className={styles.flash}
        sx={{
          zIndex: "0",
          position: "absolute",
          top: "-1.5rem",
          right: "-3rem",
          display: "flex",
          alignSelf: "flex-end",
        }}
      >
        <CircleIcon
          sx={{
            color: props.color || ((theme) => theme.palette.text.secondary),
            display: "flex",
            marginRight: ".25rem",
            width: ".5rem",
          }}
        />
        <Typography
          letterSpacing={1.5}
          fontSize="0.75rem"
          sx={{
            color: props.color || ((theme) => theme.palette.text.secondary),
          }}
        >
          Rec
        </Typography>
      </Stack>
    </Stack>
  )
}
