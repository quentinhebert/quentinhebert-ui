import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Stack, Typography } from "@mui/material"

export default function dropdownButton({ buttonText, menuList }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Stack onClick={(e) => handleClick(e)} zIndex={1001}>
        <Button>{buttonText}</Button>
      </Stack>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuList.map((item, key) => {
          const handleItemClick = () => {
            handleClose() // Close menu pop-up
            item.onClick()
          }
          return (
            <MenuItem onClick={handleItemClick} key={key}>
              <Stack
                gap={1}
                className="row"
                padding={1}
                sx={{ color: (theme) => theme.palette.text.white }}
              >
                {item?.icon || null}
                <Typography color="text.white">{item.label}</Typography>
              </Stack>
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
