import { AlertTitle, Stack } from "@mui/material"
import Alert from "@mui/material/Alert"
import React from "react"
import theme from "../../config/theme"
import { motion } from "framer-motion"

function AlertInfo({ content, noAnimation }) {
  if (!content.show) return <></>
  return (
    <motion.div
      initial={{ opacity: noAnimation ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%" }}
    >
      <Stack
        style={{
          marginTop: 10,
          marginBottom: 10,
          width: "100%",
          textAlign: "left",
        }}
      >
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
          <Stack gap={content.js ? 1 : 0}>
            {content?.title ? (
              <AlertTitle color={theme.alert.title[content.severity].color}>
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
