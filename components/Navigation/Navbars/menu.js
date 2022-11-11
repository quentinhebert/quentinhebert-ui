import Slide from "@mui/material/Slide"
import { Box, Dialog, Stack, Typography } from "@mui/material"
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
          background: (theme) => theme.palette.background.secondary,
        },
      }}
    >
      <Box
        className="absolute top left"
        zIndex={0}
        width="100%"
        height="100vh"
        sx={{
          // backgroundImage: "url(/medias/grain.jpg)",
          // backgroundSize: "cover",
          mixBlendMode: "luminosity",
        }}
      />
      <Stack
        zIndex={1}
        sx={{
          width: "100%",
          height: "100%",
          transition: "width .5s ease-in-out, height .5s ease-in-out",
          // backgroundColor: theme.palette.background.secondary,
          background: "radial-gradient(rgb(0,0,0,0.3) 10%, rgb(0,0,0,0.8) 90%)",
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
                      sx={{
                        fontSize: { xs: "1.2rem", md: "2.5vw" },
                        letterSpacing: { xs: 1, md: 2 },
                        textTransform: "uppercase",
                        cursor: page === item.href ? "default" : "pointer",
                        color:
                          page === item.href
                            ? "#000"
                            : (theme) => theme.palette.text.white,
                        "&:hover": {
                          color: "#000",
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
      </Stack>
    </Dialog>
  )
}
