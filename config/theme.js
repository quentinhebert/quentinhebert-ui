import { createTheme } from "@mui/material/styles"

const primary = "#1B3957"
const primaryLight = "#2b5b8a"
const primaryDark = "#111a23"
const secondary = "#C6900E"
const secondaryDark = "#825E09"
const secondaryLight = "#F5BB5F"
const link = "#06c"

/*

TITLE
  fontSize: 
TEXT (normal)
  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
  letterSpacing: { xs: 0.25, sm: 1, md: 2 },
  lineHeight: { xs: "1.3rem", sm: '1.5rem', md: "2rem" },
TEXT (small)

*/

const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primary,
      light: primaryLight,
    },
    secondary: {
      main: secondary,
    },
    background: {
      main: primaryDark,
      secondary: secondary,
      paper: primaryDark,
      alert: "rgb(255, 226, 183)",
      white: "#dddddd",
    },
    text: {
      primary: primary,
      primaryLight: primaryLight,
      primaryDark: primaryDark,
      secondary: secondary,
      secondaryDark: secondaryDark,
      secondaryLight: secondaryLight,
      white: "#fff",
      link: link,
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Arial",
    h1: {
      fontFamily: "Arial",
    },
    h2: {
      fontFamily: "Arial",
    },
    h3: {
      fontFamily: "Arial",
    },
    h4: {
      fontFamily: "Arial",
    },
    h5: {
      fontFamily: "Arial",
    },
    h6: {
      fontFamily: "Arial",
    },
    body1: {
      fontFamily: "Arial",
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
