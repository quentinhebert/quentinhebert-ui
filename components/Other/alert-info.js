import { AlertTitle, Stack } from "@mui/material"
import Alert from "@mui/material/Alert"
import React from "react"
import theme from "../../config/theme"
import { motion } from "framer-motion"

function AlertInfo({ content, noAnimation }) {
  return (
    <motion.div
      initial={{ opacity: noAnimation ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%" }}
    >
      <Stack style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
        <Alert
          variant="outlined"
          color={content.severity}
          severity={content.severity}
          sx={{
            color: "#FFF",
            "&.MuiAlert-outlined": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack gap={content.js ? 2 : 0}>
            {content?.title ? (
              <AlertTitle color={theme.alert.title[content.severity]}>
                {content.title}
              </AlertTitle>
            ) : null}
            {content.text}
            {content.js}
          </Stack>
        </Alert>
      </Stack>
    </motion.div>
  )
}

export default AlertInfo
