import { AlertTitle, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import theme from "../../config/theme";

function AlertInfo(props) {
  const { content } = props;

  return (
    <Stack style={{ marginTop: 10, width: "100%" }}>
      <Alert
        variant="outlined"
        color={content.severity}
        severity={content.severity}
        sx={{
          color: "#FFF",
          "&.MuiAlert-outlined": {
            backgroundColor: (theme) => theme.palette.background.main,
          },
        }}
      >
        {content?.title ? (
          <AlertTitle color={theme.alert.title[content.severity]}>
            {content.title}
          </AlertTitle>
        ) : null}
        {content.text}
      </Alert>
    </Stack>
  );
}

export default AlertInfo;
