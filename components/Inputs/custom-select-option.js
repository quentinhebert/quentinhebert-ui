import { MenuItem } from "@mui/material"
import { styled } from "@mui/system"

const SelectOption = styled((props) => (
  <MenuItem
    sx={{
      ...props.sx,
      padding: props.padding || "",
      color: (theme) => theme.palette.text.secondary,
      "&&.Mui-selected": {
        color: "#000",
        background: (theme) => theme.palette.background.secondary,
      },
    }}
    {...props}
  />
))(() => ({}))

export default function CustomSelectOption(props) {
  return <SelectOption {...props} />
}
