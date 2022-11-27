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
        className="flex-center"
        position="fixed"
        bottom="5%"
        right="5%"
        zIndex={100}
      >
        <Button
          variant="contained"
          onClick={() => scrollTo(refForScroll)}
          startIcon={<AirplanemodeActiveIcon sx={{ margin: "0 .25rem" }} />}
          color="secondary"
          sx={{
            borderRadius: "30px",
            padding: { xs: "0.5rem 1rem", md: ".75rem 1.5rem" },
            color: "#000",
            letterSpacing: { xs: "1px", md: "0.5px" },
            fontSize: { xs: "0.6rem", md: "1rem" },
            fontWeight: "bold",
            boxShadow: "5px 10px 30px 5px rgb(0,0,0,0.3)",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
              background: (theme) => theme.palette.secondary.main,
            },
          }}
        >
          S'envoyer en l'air
        </Button>
      </Stack>
    </Slide>
  )
}
