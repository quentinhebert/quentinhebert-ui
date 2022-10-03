import { Stack, Typography } from "@mui/material"
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
      {list?.length &&
        list.map((item, key) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + key * 0.1, duration: 1 }}
              key={key}
            >
              <Link href={item.href} passHref>
                <Typography
                  variant="h6"
                  fontFamily="Helmet"
                  textAlign="center"
                  lineHeight="1.3rem"
                  className="cool-button no-select"
                  textTransform="uppercase"
                  letterSpacing={2}
                  component="a"
                  sx={{
                    color: "#fff",
                    borderColor: (theme) => theme.palette.secondary.main,
                    cursor: "pointer",
                    fontSize: isReduced ? "0.85rem" : "0.9rem",
                    "&:hover": {
                      color: (theme) => theme.palette.secondary.main,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </motion.div>
          )
        })}
    </Stack>
  )
}
