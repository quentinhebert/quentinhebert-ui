export const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const ignoreNavbar = {
  mt: "-82px",
  pt: "82px",
}

export const background = (url) => ({
  background: (theme) =>
    `linear-gradient(${theme.palette.background.black} 0%, rgb(0,0,0,0.3) 50%, ${theme.palette.background.black} 70%), url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
})

export const heroScreen = {
  width: "100%",
  height: "100svh",
}

export const absoluteFullScreen = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}
