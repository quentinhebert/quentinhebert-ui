import { createTheme } from "@mui/material/styles"

const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
      contrastText: "#212121",
    },
    secondary: {
      main: "#C6900E",
      dark: "#152D35",
    },
    background: {
      main: "#070135",
      // main: "#1E3230",
      // dark: "#100720",
      dark: "#111a23",
      // dark: "#111f1e",
      // main: "#353D2F",
      // main: "#310D20",
      // main: "#A64253",
      // main: "#B0BBBF",
      secondary: "#C6900E",
      tersary: "#B0BBBF",
      secondaryDark: "#152D35",
      tableEven: "#424242",
      paper: "#212121",
      alert: "rgb(255, 226, 183)",
      white: "#fff",
    },
    text: {
      primary: "#fff",
      primaryContrast: "#212121",
      secondary: "#C6900E",
      tersary: "#F5BB5F",
      greyed: "rgba(242, 242, 242, 0.7)",
      light: "#fff",
      secondaryDark: "#152D35",
    },
    divider: "#707070",
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
