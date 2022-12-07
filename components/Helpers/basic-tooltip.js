import { Tooltip } from "@mui/material"
import { useState } from "react"

export default function BasicTooltip({ disabled, title, ...props }) {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip
      title={title}
      open={open}
      onOpen={() => !disabled && setOpen(true)}
      onClose={() => setOpen(false)}
      enterDelay={750}
      leaveDelay={0}
      {...props}
    />
  )
}
