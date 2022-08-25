import { Stack, Typography, Zoom } from "@mui/material"
import Link from "next/link"
import theme from "../../../config/theme"
import { motion } from "framer-motion"

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + key * 0.1, duration: 1 }}
            >
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
            </motion.div>
          </Link>
        )
      })}
    </Stack>
  )
}
