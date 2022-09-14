import Slide from "@mui/material/Slide"
import { Dialog, Stack, Typography } from "@mui/material"
import Link from "next/link"
import theme from "../../../config/theme"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export default function Menu(props) {
  const { open, handleClose, list, page } = props

  const handleCloseReset = () => {
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseReset}
      onClick={handleCloseReset}
      fullScreen
      sx={{
        zIndex: 999,
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
        <Slide
          direction={open ? "right" : "left"}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <Stack textAlign="center">
            {list?.length > 0 &&
              list.map((item, key) => {
                return (
                  <Link href={item.href} passHref key={key}>
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
                )
              })}
          </Stack>
        </Slide>
      </Stack>
    </Dialog>
  )
}
