import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect(props) {
  const { placeholder, required, options, value, setValue } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">
        {placeholder}
        {required ? " *" : ""}
      </InputLabel>
      <Select
        value={value}
        label={placeholder}
        onChange={handleChange}
        sx={{ backgroundColor: (theme) => theme.palette.background.main }}
      >
        {options.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
