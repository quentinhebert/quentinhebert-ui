import * as React from "react"

import Slide from "@mui/material/Slide"
import { Dialog, Paper, Stack, Box, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Link from "next/link"
import Boop from "../../Animation/boop"
import theme from "../../../config/theme"

export default function Menu(props) {
  const { open, handleClose, list, mainColor } = props
  const [width, setWidth] = React.useState("50%")
  const [height, setHeight] = React.useState("50%")
  const [opacity, setOpacity] = React.useState(0)
  const [rotate, setRotate] = React.useState(0)

  const handleCloseReset = () => {
    setWidth("50%")
    setHeight("50%")
    setOpacity(0)
    setRotate("0")
    setTimeout(() => {
      handleClose()
    }, 500)
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (open) {
        setWidth("100%")
        setHeight("100%")
        setOpacity(1)
        setRotate("1293deg")
      }
    }, 200)
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={handleCloseReset}
      fullScreen
      sx={{
        ".MuiPaper-root": {
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      onClick={handleCloseReset}
    >
      <Stack
        sx={{
          width: width,
          height: height,
          transition: "width .5s ease-in-out, height .5s ease-in-out",
          backgroundColor: theme.palette.background.secondary,
          borderRadius: width === "50%" ? "10px" : "0",
          padding: "1rem 0",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          sx={{
            fontFamily: "Arial",
            position: "absolute",
            right: "2rem",
            top: "2rem",
            borderRadius: 10,
            width: "2rem",
            height: "2rem",
            textAlign: "center",
            border: `${theme.palette.background.white} 2px solid`,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            opacity: opacity,
            transition: "opacity 1s ease-in-out .75s",
          }}
        >
          <Boop>
            <CloseIcon sx={{ color: theme.palette.text.white }} />
          </Boop>
        </Stack>
        <Slide
          direction={open ? "right" : "left"}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <Stack textAlign="center">
            {list.map((item, key) => {
              return (
                <Link href={item.href} passHref key={key}>
                  <Box
                    component="div"
                    key={key}
                    sx={{
                      fontFamily: "Arial",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      padding: ".5rem 0",
                      color: (theme) => theme.palette.text.white,
                      "&:hover": {
                        color: (theme) => theme.palette.text.primary,
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                </Link>
              )
            })}
          </Stack>
        </Slide>
      </Stack>
    </Dialog>
  )
}
