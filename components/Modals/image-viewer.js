import { Box, Dialog, Grow, Stack } from "@mui/material"
import { forwardRef, useState } from "react"
import { buildPublicURL } from "../../services/utils"
import ArrowButton from "../Buttons/arrow-button"
import BrowserLayout from "../Layouts/BrowserLayout"

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Grow
      ref={ref}
      {...props}
      {...{ timeout: 300, easing: [0.83, 0, 0.17, 0] }}
    />
  )
})

export default function ImageViewer({
  open,
  handleClose,
  title,
  images,
  index,
  setIndex,
}) {
  const handleNext = () => {
    if (index < 0) return
    setIndex(index + 1)
  }
  const handlePrevious = () => {
    if (index < 0) return
    setIndex(index - 1)
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
        backgroundColor: "rgb(0,0,0, 0.7)",
        backdropFilter: "blur(3px)",
        "& .MuiDialog-paper": {
          margin: "2vw",
          background: "none",
          minHeight: 0,
          maxWidth: "100vw",
          height: "100%",
        },
      }}
    >
      <BrowserLayout
        title={title + " – Galerie"}
        onBtnClicks={{ red: handleClose }}
        rootPadding={{ xs: ".25rem .1rem", md: "1rem 2rem" }}
      >
        <Box
          className="absolute"
          sx={{ margin: "auto 20px", top: "calc(50% - 50px)" }}
        >
          <ArrowButton
            left
            onClick={handlePrevious}
            index={index}
            totalItems={images.length}
          />
        </Box>
        <Stack
          component="img"
          src={
            !!images[index]?.path
              ? buildPublicURL(images[index].path)
              : images[index]
          }
          sx={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
          }}
        />
        <Box
          className="absolute"
          sx={{ margin: "auto 20px", top: "calc(50% - 50px)", right: 0 }}
        >
          <ArrowButton
            right
            onClick={handleNext}
            index={index}
            totalItems={images.length}
          />
        </Box>
      </BrowserLayout>
    </Dialog>
  )
}
