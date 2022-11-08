import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Box, Typography } from "@mui/material"
import styles from "../../styles/BouncingArrow.module.css"
import theme from "../../config/theme"
import ScaleUpOnHoverStack from "../Animation/scale-up-on-hover-stack"

export default function BouncingArrow(props) {
  const { text, scrollTo, refForScroll } = props
  return (
    <ScaleUpOnHoverStack>
      <Box
        component="a"
        className={styles.bounce}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          paddingBottom: { xs: 0, md: 2 },
          "&:hover": {
            "&>p, &>svg": {
              color: `${theme.palette.secondary.main} !important`,
            },
          },
        }}
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
    </ScaleUpOnHoverStack>
  )
}
