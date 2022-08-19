import { Box, Button, Stack, Zoom } from "@mui/material"
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
              <Button
                key={key}
                className="cool-button"
                sx={{
                  borderRadius: 0,
                  margin: 0.5,
                  borderColor: theme.palette.secondary.main,
                  padding: "3px 1rem",
                  fontSize: "0.8rem",
                  letterSpacing: "2px",
                  "&:hover": {
                    color: theme.palette.text.secondary,
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            </Zoom>
          </Link>
        )
      })}
    </Stack>
  )
}
