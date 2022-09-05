import { FormControl, Select } from "@mui/material"
import { styled } from "@mui/system"
import theme from "../../../config/theme"

const CustomSelect = styled((props) => (
  <Select
    size="small"
    displayEmpty
    variant="outlined"
    color="secondary"
    sx={{
      // backgroundColor: "#fff",
      background: `linear-gradient(-20deg, rgb(0,0,0) 0%, ${theme.palette.background.main} 80%)`, // Overrides the background-color of the select input
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
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
