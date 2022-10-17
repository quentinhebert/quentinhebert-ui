import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Stack } from "@mui/material"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import Slide from "@mui/material/Slide"

export default function ScrollToTopBtn(props) {
  const { refForScroll } = props
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    let timeout = 0

    const handleScroll = () => {
      if (window.pageYOffset !== 0) setShowButton(true)
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
            margin: "1rem auto",
            padding: { xs: "0.5rem 1rem", md: ".75rem 1.5rem" },
            backgroundColor: "rgb(198, 144, 14, 0.8)",
            color: "#000",
            letterSpacing: "1px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            boxShadow: "5px 10px 30px 5px rgb(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.background.secondary,
            },
          }}
        >
          S'envoyer en l'air
        </Button>
      </Stack>
    </Slide>
  )
}
