import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import Link from "next/link"

export default function DuoTextBand(props) {
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: key / 2 },
      },
      hidden: { opacity: 0, x: 200 },
    }
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Stack
      width="100%"
      bgcolor={theme.palette.background.secondary}
      alignItems="center"
      ref={ref}
    >
      <Stack
        padding="2rem"
        width="80%"
        flexDirection={sm ? "column" : "row"}
        overflow="hidden"
      >
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={{
            width: sm ? "100%" : "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            padding="2rem 0.5rem"
          >
            <Box>
              <Typography
                component="h5"
                variant="h6"
                color={theme.palette.text.light}
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}
              >
                Want more
              </Typography>
              <Typography
                component="h5"
                variant="h6"
                color={theme.palette.text.secondary}
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: "bold",
                }}
              >
                Check my videos out !
              </Typography>
              <Link href="/work">
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    justifyContent: "left",
                    letterSpacing: 2,
                    marginTop: 2,
                    padding: "0.2rem 1.5rem",
                    backgroundColor: (theme) =>
                      theme.palette.background.secondary,
                    color: (theme) => theme.palette.text.light,
                    "&:hover": {
                      transform: "scale(1.2)",
                      transition: "transform 0.2s 0s ease-in-out",
                    },
                  }}
                >
                  Work
                </Button>
              </Link>
            </Box>
          </Stack>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(1)}
          animate={controls}
          style={{
            width: sm ? "100%" : "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            padding="2rem 0.5rem"
          >
            <Box>
              <Typography
                component="h5"
                variant="h6"
                color={theme.palette.text.light}
                sx={{ textTransform: "uppercase", letterSpacing: 1 }}
              >
                Want to work with me ?
              </Typography>
              <Typography
                component="h5"
                variant="h6"
                color={theme.palette.text.secondary}
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: "bold",
                }}
              >
                Let's create together !
              </Typography>
              <Link href="/contact">
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    justifyContent: "left",
                    letterSpacing: 2,
                    marginTop: 2,
                    padding: "0.2rem 1.5rem",
                    backgroundColor: (theme) =>
                      theme.palette.background.secondary,
                    color: (theme) => theme.palette.text.light,
                    "&:hover": {
                      transform: "scale(1.2)",
                      transition: "transform 0.2s 0s ease-in-out",
                    },
                  }}
                >
                  Let's go
                </Button>
              </Link>
            </Box>
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  )
}
