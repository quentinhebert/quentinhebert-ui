import { FormControl, Select } from "@mui/material"
import { styled } from "@mui/system"

const CustomSelect = styled((props) => (
  <Select
    size="small"
    displayEmpty
    variant="outlined"
    color="secondary"
    sx={{
      backgroundColor: "#fff", // Overrides the background-color of the select input
    }}
    MenuProps={{
      sx: {
        "&& .Mui-selected": {
          // overrides the color and background-color of the selected option of the select
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) => theme.palette.text.secondaryDark,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.background.secondary,
          },
        },
      },
    }}
    {...props}
  />
))(() => ({}))

const SelectFormControl = styled((props) => (
  <FormControl
    sx={{
      width: "100%",
      ".MuiOutlinedInput-input": {
        padding: "0.8rem",
        // color of the select value text
        color: (theme) => `${theme.palette.text.primary} !important`,
      },
      ".MuiSelect-iconOutlined": {
        color: (theme) => `${theme.palette.secondary.main} !important`,
      },
      ".Mui-selected": {
        background: "red !important",
      },
    }}
    {...props}
  />
))(() => ({}))

export default function CustomFilledSelect(props) {
  return (
    <SelectFormControl>
      <CustomSelect {...props} />
    </SelectFormControl>
  )
}
