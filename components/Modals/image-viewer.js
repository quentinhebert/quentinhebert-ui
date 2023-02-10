import { Box, Dialog, Grow, Stack } from "@mui/material"
import { forwardRef, useEffect, useRef, useState } from "react"
import { buildPublicURL } from "../../services/utils"
import ArrowButton from "../Buttons/arrow-button"
import BrowserLayout from "../Layouts/BrowserLayout"
import Carousel from "framer-motion-carousel"
import ProgressiveImage from "react-progressive-image"

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Grow
      ref={ref}
      {...props}
      {...{ timeout: 300, easing: [0.83, 0, 0.17, 0] }}
    />
  )
})

export default function ImageViewer({ open, handleClose, title, images }) {
  const [triggerNext, setTriggerN] = useState(false)
  const [triggerPrevious, setTriggerP] = useState(false)

  // Handle key press for arrow keys navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      e = e || window.event
      if (e.keyCode === 37) setTriggerP(true) // arrow left key pressed
      else if (e.keyCode === 39) setTriggerN(true) // arrow right key pressed
    }

    if (!open) return // To avoid adding listeners for image viewers not opened

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [open])

  // Render functions for carousel controls customization
  const renderDots = ({ activeIndex, setActiveIndex }) => {
    const [dotsOpacity, setDotsOpacity] = useState(0)

    useEffect(() => {
      setDotsOpacity(1)
      setTimeout(() => {
        setDotsOpacity(0)
      }, 3000)
    }, [])

    return (
      <Stack
        width="100%"
        className="absolute full-width flex-center"
        bottom="calc(7% + 0.5rem)"
        sx={{
          padding: "0 .5rem",
          opacity: dotsOpacity,
          transition: ".3s ease",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Stack
          sx={{
            overflow: "hidden",
            background: (theme) => theme.palette.background.main,
            borderRadius: "15px",
            padding: "0 1rem",
            maxWidth: "100%",
          }}
        >
          <Stack
            className="row"
            sx={{
              gap: 1,
              overflowX: "scroll",
              padding: "17px 0",
              marginBottom: "-17px",
              flexWrap: "no-wrap",
            }}
            maxWidth="100%"
            width="100%"
            height="100%"
            margin="auto auto 0 auto"
          >
            {images.map((image, key) => (
              <Box
                key={key}
                onClick={() => setActiveIndex(key)}
                width="5rem"
                height="4rem"
                sx={{
                  background: `url(${
                    !!image.path
                      ? buildPublicURL(image.path, { imgSize: "small" })
                      : image
                  })`,
                  float: "left",
                  backgroundSize: "cover",
                  opacity: activeIndex === key ? "1" : "0.5",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: ".3s ease",
                  flex: "0 0 5rem",
                  flexWrap: "no-wrap",
                  border:
                    activeIndex === key
                      ? (theme) => `2px solid ${theme.palette.secondary.main}`
                      : "none",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    )
  }
  const renderArrowLeft = ({ handlePrev, activeIndex }) => {
    useEffect(() => {
      if (triggerPrevious) {
        handlePrev()
        setTriggerP(false)
      }
    }, [triggerPrevious])

    return (
      <Box
        className="absolute"
        zIndex={1}
        sx={{ margin: "auto 20px", top: "calc(50% - 50px)" }}
      >
        <ArrowButton
          left
          onClick={handlePrev}
          index={activeIndex}
          totalItems={images.length}
        />
      </Box>
    )
  }
  const renderArrowRight = ({ handleNext, activeIndex }) => {
    useEffect(() => {
      if (triggerNext) {
        handleNext()
        setTriggerN(false)
      }
    }, [triggerNext])

    return (
      <Box
        className="absolute"
        zIndex={1}
        sx={{ margin: "auto 20px", right: 0, top: "calc(50% - 50px)" }}
      >
        <ArrowButton
          right
          onClick={handleNext}
          index={activeIndex}
          totalItems={images.length}
        />
      </Box>
    )
  }

  return (
    <Dialog
      open={open}
      gap={2}
      background="transparent"
      fullWidth
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        backgroundColor: "rgb(0,0,0, 0.8)",
        backdropFilter: "blur(3px)",
        "& .MuiDialog-paper": {
          margin: "2vw",
          background: "none",
          minHeight: 0,
          maxWidth: "100%",
          height: "100%",
        },
      }}
    >
      <BrowserLayout
        title={title + " – Galerie"}
        onBtnClicks={{ red: handleClose }}
        rootPadding={{ xs: ".25rem .1rem", md: "1rem 2rem" }}
      >
        <Stack
          sx={{
            position: "relative",
            width: "auto",
            height: "100%",
            margin: "0 auto",
          }}
        >
          <Carousel
            autoPlay={false}
            renderDots={renderDots}
            renderArrowLeft={renderArrowLeft}
            renderArrowRight={renderArrowRight}
          >
            {images.map((img, key) => (
              <ProgressiveImage
                src={!!img.path ? buildPublicURL(img.path) : img}
                placeholder={
                  !!img.path
                    ? buildPublicURL(img.path, { imgSize: "small" })
                    : img
                }
              >
                {(src) => (
                  <img
                    src={src}
                    draggable="false"
                    key={key}
                    width="100%"
                    height="98%"
                    alt=""
                    loading="lazy"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                )}
              </ProgressiveImage>
            ))}
          </Carousel>
        </Stack>
      </BrowserLayout>
    </Dialog>
  )
}
