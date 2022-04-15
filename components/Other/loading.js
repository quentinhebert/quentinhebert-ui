import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../config/theme";
import { Stack } from "@mui/material";

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
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100vh", backgroundColor: "#000" }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Stack>
    </Backdrop>
  );
}
