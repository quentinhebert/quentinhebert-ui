import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Stack, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import Slide from "@mui/material/Slide"

export default function ScrollToTopBtn(props) {
  const { refForScroll } = props
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    let timeout = 0

    const handleScroll = () => {
      setShowButton(true)
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        setShowButton(false)
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useScrollPosition(({ prevPos, currPos }) => {
    if (window.pageYOffset === 0) setShowButton(false)
  })

  const [showButton, setShowButton] = useState(false)

  return (
    <Slide direction="left" in={showButton} mountOnEnter unmountOnExit>
      <Stack
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom="5%"
        right="5%"
        zIndex={100}
      >
        <Button
          onClick={(e) => scrollTo(refForScroll)}
          startIcon={<AirplanemodeActiveIcon sx={{ margin: "0 .25rem" }} />}
          sx={{
            borderRadius: "30px",
            opacity: showButton ? 1 : 0,
            padding: ".5rem 1rem",
            margin: "1rem auto",
            padding: ".75rem 1.5rem",
            backgroundColor: "rgb(198, 144, 14, 0.8)",
            color: "#fff",
            transition: "opacity .25s ease-in-out",
            letterSpacing: "2px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            "&:hover": {
              color: "#fff",
              backgroundColor: (theme) => theme.palette.background.secondary,
              opacity: 1,
            },
          }}
        >
          S'envoyer en l'air
        </Button>
      </Stack>
    </Slide>
  )
}
