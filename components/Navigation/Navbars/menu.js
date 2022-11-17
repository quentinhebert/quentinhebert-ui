import Slide from "@mui/material/Slide"
import { Box, Dialog, Fade, Grow, Stack, Typography, Zoom } from "@mui/material"
import Link from "next/link"
import theme from "../../../config/theme"
import { forwardRef, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

export default function Menu(props) {
  const { open, handleClose, list, page } = props

  const handleCloseReset = () => {
    handleClose()
  }

  /********** ANIMATION **********/
  const [viewRef, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Dialog
      open={open}
      onClose={handleCloseReset}
      onClick={handleCloseReset}
      fullScreen
      TransitionComponent={Transition}
      keepMounted
      sx={{
        zIndex: 1000,
        ".MuiPaper-root": {
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
        },
      }}
    >
      <Stack
        zIndex={1}
        sx={{
          width: "100%",
          height: "100%",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack textAlign="left" ref={viewRef}>
          {list?.length > 0 &&
            list.map((item, key) => {
              return (
                <motion.div
                  initial="hidden"
                  variants={variants(key)}
                  animate={controls}
                  key={key}
                >
                  <Link href={item.href} passHref>
                    <Typography
                      className="no-select"
                      key={key}
                      padding=".5rem 0"
                      display="flex"
                      alignItems="center"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "10vw", md: "12vw" },
                        lineHeight: { xs: "9vw", md: "10vw" },
                        letterSpacing: { xs: 1, md: 2 },
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color:
                          page === item.href
                            ? (theme) => theme.palette.text.secondary
                            : (theme) => theme.palette.text.white,
                        transition: "transform 0.4s ease-in-out",
                        "&:hover": {
                          transform: "translateX(1rem)",
                        },
                      }}
                    >
                      0{key + 1}{" "}
                      <Box
                        component="span"
                        className="cool-button"
                        marginLeft={2}
                      >
                        {item.label}
                      </Box>
                    </Typography>
                  </Link>
                </motion.div>
              )
            })}
        </Stack>
      </Stack>
    </Dialog>
  )
}
