import { Box, Button, Stack, Typography, Zoom } from "@mui/material"
import Link from "next/link"
import theme from "../../../config/theme"
import FlashingRedDot from "../FlashingRedDot"

export default function DesktopNavbar(props) {
  const { mainColor, list, page } = props

  return (
    <Stack
      flexDirection="row"
      gap={1}
      sx={{
        position: "relative",
        letterSpacing: "2px",
      }}
    >
      {list.map((item, key) => {
        return (
          <Link href={item.href} key={key}>
            <Zoom in {...(true ? { timeout: 750 + key * 250 } : {})}>
              <Typography
                variant="h6"
                fontFamily="Arial"
                textAlign="center"
                lineHeight="1.3rem"
                className="cool-button no-select"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  // color: theme.palette.text.secondary,
                  color: "#fff",
                  borderColor: theme.palette.secondary.main,
                  cursor: "pointer",
                  margin: 0.5,
                  fontSize: "0.8rem",
                  padding: "3px 1rem",
                  "&:hover": { color: theme.palette.secondary.main },
                }}
              >
                {item.label}
              </Typography>
            </Zoom>
          </Link>
        )
      })}
    </Stack>
  )
}
