import Slide from "@mui/material/Slide"
import { Box, Dialog, Stack, Typography } from "@mui/material"
import { forwardRef, useContext, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import NextLink from "../../Helpers/next-link"
import { AppContext } from "../../../contexts/AppContext"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

export default function Menu(props) {
  const { open, handleClose, list, page } = props

  const { lang } = useContext(AppContext)

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
          background: (theme) => theme.palette.background.black,
        },
      }}
    >
      <Stack
        zIndex={1}
        sx={{
          width: "100%",
        }}
        margin="max(20vh, 80px) auto 2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Stack textAlign="right" ref={viewRef} gap={2}>
          {list?.length > 0 &&
            list.map((item, key) => {
              return (
                <motion.div
                  initial="hidden"
                  variants={variants(key)}
                  animate={controls}
                  key={key}
                >
                  <NextLink href={item.href}>
                    <Typography
                      fontFamily="trophy"
                      className="no-select"
                      key={key}
                      padding=".5rem 0"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "4vw", md: "min(6vw, 8vh)" },
                        lineHeight: { xs: "9vw", md: "min(8vw, 10vh)" },
                        letterSpacing: { xs: 1, md: 2 },
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color:
                          page === item.href
                            ? (theme) => theme.palette.text.secondary
                            : (theme) => theme.palette.text.white,
                        transition: "transform 0.4s ease-in-out",
                        textShadow: (theme) =>
                          page === item.href
                            ? {
                                xs: `0px 0px 10px #C6900E8C`,
                                md: `0px 0px 30px ${theme.palette.secondary.main}`,
                              }
                            : "",
                        "&:hover": {
                          transform: "translateX(1rem)",
                        },
                      }}
                    >
                      <Box
                        component="span"
                        className="cool-button"
                        marginLeft={2}
                        sx={{
                          "::after": {
                            marginTop: "0.5rem",
                          },
                        }}
                      >
                        {item.label[lang]}
                      </Box>
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: "3rem", md: "1rem" } }}
                        marginLeft="2rem"
                      >
                        0{key + 1}
                      </Box>
                    </Typography>
                  </NextLink>
                </motion.div>
              )
            })}
        </Stack>
      </Stack>
    </Dialog>
  )
}
