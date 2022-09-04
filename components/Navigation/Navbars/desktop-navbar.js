import { Stack, Typography, Zoom } from "@mui/material"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DesktopNavbar(props) {
  const { list, page, isReduced } = props

  return (
    <Stack
      flexDirection="row"
      sx={{
        gap: { xs: "2rem", lg: isReduced ? "2.75rem" : "3rem" },
        paddingRight: { xs: ".5rem", lg: "1rem" },
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
                textTransform="uppercase"
                letterSpacing={2}
                sx={{
                  color: "#fff",
                  borderColor: (theme) => theme.palette.secondary.main,
                  cursor: "pointer",
                  fontSize: isReduced ? "0.75rem" : "0.8rem",
                  "&:hover": { color: (theme) => theme.palette.secondary.main },
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
