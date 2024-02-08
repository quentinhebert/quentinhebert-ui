import Dialog from "@mui/material/Dialog"
import { Slide, Stack, useMediaQuery } from "@mui/material"
import { forwardRef } from "react"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomModal({
  fullscreen,
  open,
  handleClose,
  background,
  StickyTop,
  StickyBottom,
  ...props
}) {
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <Dialog
      fullScreen={fullscreen || sm}
      fullWidth
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        backgroundColor: "rgb(0,0,0, 0.9)",
        "& .MuiDialog-paper": {
          background: "none",
          borderRadius: fullscreen || sm ? "" : "20px",
          overflowX: "hidden",
        },
      }}
    >
      {StickyTop && (
        <Stack
          zIndex={1}
          position="sticky"
          top={0}
          padding="1rem 2rem"
          sx={{
            boxShadow: "0 0 10px 10px rgb(0,0,0,0.1)",
            background:
              background || ((theme) => theme.palette.background.mainDark),
          }}
        >
          {StickyTop}
        </Stack>
      )}

      <Stack
        sx={{
          padding: { xs: 2, md: 4 },
          gap: 4,
          margin: "auto 0",
          // height: fullscreen ? "auto" : { xs: "100%", md: "" },
          flexGrow: fullscreen ? 1 : null,
          background: background || ((theme) => theme.palette.background.main),
        }}
        {...props}
      />

      {StickyBottom && (
        <Stack
          zIndex={1}
          position="sticky"
          bottom={0}
          padding="1rem 2rem"
          sx={{
            boxShadow: "0 0 10px 10px rgb(0,0,0,0.1)",
            background:
              background || ((theme) => theme.palette.background.mainDark),
          }}
        >
          {StickyBottom}
        </Stack>
      )}
    </Dialog>
  )
}
