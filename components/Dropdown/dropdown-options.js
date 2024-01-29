import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"

export default function DropdownOptions({ options, visible }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event) => {
    event?.stopPropagation()
    event?.preventDefault()
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ visibility: visible ? "visible" : "hidden" }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "auto",
          },
        }}
      >
        {options.map((option, key) => (
          <MenuItem
            key={key}
            onClick={(e) => {
              e?.stopPropagation()
              e?.preventDefault()
              option.handleClick(e)
              handleClose()
            }}
            sx={{ color: "white", display: "flex", gap: 2 }}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
