import { FormControl, Select } from "@mui/material"
import { styled } from "@mui/system"
import theme from "../../config/theme"

const CustomSelect = styled((props) => (
  <Select
    size="small"
    displayEmpty
    variant="outlined"
    color="secondary"
    sx={{
      // backgroundColor: "#fff",
      background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`, // Overrides the background-color of the select input
      "& .MuiOutlinedInput-notchedOutline": {
        border: (theme) => `1px solid ${theme.palette.secondary.main}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: (theme) => `1px solid ${theme.palette.secondary.main}`,
      },
    }}
    MenuProps={{
      sx: {
        "&& .Mui-selected": {
          // overrides the color and background-color of the selected option of the select
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) => theme.palette.text.secondary,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.background.secondary,
          },
        },
        "&& .MuiPaper-root": {
          maxHeight: "200px",
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
        color: "#fff !important",
      },
      ".MuiSelect-iconOutlined": {
        color: (theme) => `${theme.palette.secondary.main} !important`,
      },
    }}
    {...props}
  />
))(() => ({}))

export default function CustomOutlinedSelect(props) {
  return (
    <SelectFormControl>
      <CustomSelect {...props} />
    </SelectFormControl>
  )
}
