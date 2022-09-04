import * as React from "react"
import { Button } from "@mui/material"
import { Stack, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"

export default function ScrollToTopBtn(props) {
  const { refForScroll } = props
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const [showButton, setShowButton] = React.useState(false)
  useScrollPosition(({ prevPos, currPos }) => {
    if (window.pageYOffset > 0) {
      setShowButton(true)
      setTimeout(() => {
        setShowButton(false)
      }, 3000)
    } else if (window.pageYOffset === 0) {
      setShowButton(false)
    }
  })

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom="5%"
      right="5%"
      zIndex={10}
    >
      <Button
        onClick={(e) => scrollTo(refForScroll)}
        startIcon={<AirplanemodeActiveIcon sx={{ marginRight: "1rem" }} />}
        sx={{
          opacity: showButton ? 1 : 0,
          padding: ".5rem 1rem",
          margin: "1rem auto",
          backgroundColor: "rgb(198, 144, 14, 0.8)",
          color: "#fff",
          transition: "opacity .25s ease-in-out",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          "&:hover": {
            color: "#fff",
            backgroundColor: (theme) => theme.palette.background.secondary,
          },
        }}
      >
        S'envoyer en l'air
      </Button>
    </Stack>
  )
}
