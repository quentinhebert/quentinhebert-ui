import { IconButton, Tooltip } from "@mui/material"

export default function IconButtonWrapper({ tooltip, ...props }) {
  return (
    <Tooltip title={tooltip || ""}>
      <IconButton {...props} />
    </Tooltip>
  )
}
