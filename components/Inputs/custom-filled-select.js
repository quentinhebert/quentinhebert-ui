import { FormControl, Select } from "@mui/material"
import { styled } from "@mui/system"

const CustomSelect = styled((props) => (
  <Select
    size="small"
    displayEmpty
    variant="outlined"
    color="secondary"
    sx={{
      background: "#000",
      border: `1px solid`,
      borderColor:
        props.borderColor || ((theme) => theme.palette.secondary.main),
      borderRadius: "10px",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    }}
    MenuProps={{
      sx: {
        // Backdrop
        background: "rgb(0,0,0,0.5)",
        // Background of selection options
        "& .MuiPopover-paper": {
          background: "#000",
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          boxShadow: (theme) =>
            `1px 1px 20px 2px ${theme.palette.secondary.main}`,
        },
        // overrides the color and background-color of the selected option of the select
        "&& .Mui-selected": {
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
