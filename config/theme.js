import { createTheme } from "@mui/material/styles"

const primary = "#262525"
const secondary = "#C6900E"
const tersary = "#AE1B1E"
const link = "#06c"
const errorColor = "#AE1B1E"
const grey = "#696969"

const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    tersary: {
      main: tersary,
    },
    background: {
      main: primary,
      primary: primary,
      secondary: secondary,
      paper: primary,
      alert: "rgb(255, 226, 183)",
      white: "#dddddd",
      grey: grey,
    },
    text: {
      primary: primary,
      secondary: secondary,
      white: "#fff",
      grey: grey,
      link: link,
    },
    error: {
      main: errorColor,
    },
  },
  navbar: {
    marginTop: "0px",
  },
  spacing: 8,
  typography: {
    fontFamily: "Helmet",
    h1: {
      fontFamily: "Helmet",
    },
    h2: {
      fontFamily: "Helmet",
    },
    h3: {
      fontFamily: "Helmet",
    },
    h4: {
      fontFamily: "Helmet",
    },
    h5: {
      fontFamily: "Helmet",
    },
    h6: {
      fontFamily: "Helmet",
    },
    body1: {
      fontFamily: "Helmet",
    },
  },
  alert: {
    title: {
      info: "#4fc3f7",
      warning: "#ffb74d",
      success: "#81c784",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "whiteText", color: "primary" },
          style: {
            textTransform: "none",
            color: "#fff",
            fontSize: "16px",
          },
        },
      ],
    },
  },
})

const lightTheme = createTheme({
  ...mainTheme,
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#0d7377",
    },
  },
})

export { lightTheme }
export default mainTheme
