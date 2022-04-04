import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
      contrastText: "#272727",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      main: "#272727",
      tableEven: "#424242",
      paper: "#272727",
      alert: "rgb(255, 226, 183)",
    },
    notification: {
      main: "rgb(158, 218, 243)",
    },
    text: {
      primaryContrast: "#424242",
      secondary: "#f2f2f2",
      greyed: "rgba(242, 242, 242, 0.7)",
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
        {
          props: { variant: "whiteText", color: "secondary" },
          style: {
            textTransform: "none",
            color: "#fffdfd",
            fontSize: "16px",
          },
        },
      ],
    },
  },
});

const lightTheme = createTheme({
  ...mainTheme,
  palette: {
    primary: {
      main: "#caab57",
    },
    secondary: {
      main: "#f50057",
    },
    notification: {
      main: "rgb(158, 218, 243)",
    },
  },
});

export { lightTheme };
export default mainTheme;
