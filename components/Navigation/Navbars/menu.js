import Slide from "@mui/material/Slide"
import { Dialog, Stack, Typography } from "@mui/material"
import Link from "next/link"
import theme from "../../../config/theme"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
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
        zIndex: 500,
        ".MuiPaper-root": {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          transition: "width .5s ease-in-out, height .5s ease-in-out",
          backgroundColor: theme.palette.background.secondary,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack textAlign="center" ref={viewRef}>
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
                      justifyContent="center"
                      fontWeight="bold"
                      marginLeft={page === item.href ? -3 : 0}
                      sx={{
                        textTransform: "uppercase",
                        cursor: page === item.href ? "default" : "pointer",
                        color:
                          page === item.href
                            ? (theme) => theme.palette.text.primary
                            : (theme) => theme.palette.text.white,
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      {page === item.href ? <PlayArrowIcon /> : null}
                      {item.label}
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
