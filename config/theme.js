import { createTheme } from "@mui/material/styles"

const primary = "#262525"
const secondary = "#C6900E"
// const tersary = "#AE1B1E"
const tersary = "#C46602"
const link = "#06c"
const errorColor = "#AE1B1E"
const grey = "#696969"
const darkGrey = "#161616"
const black = "#050505"
const white = "#E7E0D2"

let theme = createTheme({})

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
      black: black,
      main: primary,
      primary: primary,
      secondary: secondary,
      paper: primary,
      alert: "rgb(255, 226, 183)",
      white: "#dddddd",
      grey: grey,
      darkGrey: darkGrey,
    },
    text: {
      primary: primary,
      secondary: secondary,
      white,
      grey: grey,
      black,
      link: link,
    },
    error: {
      main: errorColor,
    },
  },
  navbar: {
    marginTop: "88px",
  },
  spacing: 8,
  typography: {
    fontFamily: "Helmet",
    h1: {
      fontFamily: "POPFINE",
      [theme.breakpoints.up("xs")]: {
        fontSize: "4rem",
        lineHeight: "4rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "6rem",
        lineHeight: "6rem",
      },
    },
    h2: {
      fontFamily: "POPFINE !important",
      [theme.breakpoints.up("xs")]: {
        fontSize: "3rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "5rem",
      },
    },
    h3: {
      fontFamily: "POPFINE !important",
      [theme.breakpoints.up("xs")]: {
        fontSize: "2rem",
        lineHeight: "2rem",
        fontWeight: "normal",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
        lineHeight: "3rem",
        fontWeight: "normal",
      },
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
      info: {
        color: "#4fc3f7",
        background: "#00013B",
      },
      warning: { color: "#ffb74d", background: "#702F00" },
      success: { color: "#7FF589", background: "#184A1D" },
      error: { color: "#FF6860", background: "#7D0000" },
      disabled: { color: "#fff", background: darkGrey },
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 700,
      lg: 900,
      xl: 1400,
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

mainTheme.breakpoints.values.md = 780

export { lightTheme }
export default mainTheme
