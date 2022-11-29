import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"
import PillButton from "../Buttons/pill-button"

export default function DropdownButton({ buttonText, buttonIcon, options }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <PillButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={buttonIcon}
      >
        {buttonText || "Options"}
      </PillButton>
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
            onClick={option.handleClick}
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
