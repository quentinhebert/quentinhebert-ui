import { MenuItem } from "@mui/material"
import { styled } from "@mui/system"

const SelectOption = styled((props) => (
  <MenuItem
    sx={{
      color: (theme) => theme.palette.text.secondary,
    }}
    {...props}
  />
))(() => ({}))

export default function CustomSelectOption(props) {
  return <SelectOption {...props} />
}
