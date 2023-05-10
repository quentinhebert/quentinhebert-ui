import { Box } from "@mui/material"
import React from "react"

export default class Multiline extends React.Component {
  render() {
    return (
      <Box component="span" whiteSpace="pre-line">
        {this.props?.text
          ?.split("\n")
          .map((text, i) => (i ? [<br />, text] : text))}
      </Box>
    )
  }
}
