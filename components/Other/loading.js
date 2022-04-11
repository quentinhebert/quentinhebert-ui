import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../config/theme";

export default function Loading() {
  return (
    <Backdrop
      open
      sx={{
        color: "#fff",
        backgroundColor: theme.palette.background.main,
        zIndex: (theme) => theme.zIndex.drawer + 100,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
