import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { alpha } from "@mui/material/styles"

export default function CustomSelect(props) {
  const {
    placeholder,
    required,
    options,
    value,
    setValue,
    size,
    backgroundColor,
    error,
  } = props

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl fullWidth size={size || null}>
      <InputLabel
        id="select-label"
        color="secondary"
        sx={{
          color: (theme) => (error ? theme.palette.error.main : ""),
          "&.Mui-focused": {
            color: (theme) => (error ? theme.palette.error.main : ""),
          },
        }}
      >
        {placeholder}
        {required ? " *" : ""}
      </InputLabel>
      <Select
        labelId="select-label"
        value={value}
        label={placeholder}
        onChange={handleChange}
        sx={{
          backgroundColor: backgroundColor || "transparent",
          "&:hover": {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.secondary, 0.1),
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              error ? theme.palette.error.main : theme.palette.secondary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              error ? theme.palette.error.main : theme.palette.secondary.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              error ? theme.palette.error.main : theme.palette.secondary.main,
          },
          "& .MuiOutlinedInput-input": {
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.text.secondary,
          },
        }}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              // overrides the color and background-color of the selected option of the select
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) => theme.palette.text.secondary,
              "&:hover": {
                color: (theme) => theme.palette.text.secondary,
                backgroundColor: (theme) => theme.palette.background.main,
              },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            value={option.id}
            key={option.id}
            sx={{
              color: (theme) => theme.palette.text.white,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.background.main,
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
