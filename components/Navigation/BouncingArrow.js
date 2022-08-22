import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Box, Typography } from "@mui/material"
import styles from "../../styles/BouncingArrow.module.css"
import theme from "../../config/theme"

export default function BouncingArrow(props) {
  const { text, scrollTo, refForScroll } = props
  return (
    <Box
      className={styles.bounce}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          "&>p, &>svg": {
            color: `${theme.palette.secondary.main} !important`,
          },
        },
      }}
      component="a"
      onClick={(e) => scrollTo(refForScroll)}
    >
      {text ? (
        <Typography
          className="no-select"
          sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {text}
        </Typography>
      ) : null}
      <KeyboardArrowDownIcon
        sx={{
          color: "#fff !important",
          fontSize: "3rem",
        }}
      />
    </Box>
  )
}
