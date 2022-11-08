import { Autocomplete } from "@mui/material"
import { styled } from "@mui/system"
import CustomOutlinedInput from "./custom-outlined-input"

const Grouped = styled(
  ({ options, groupBy, getOptionLabel, label, renderOption, ...props }) => (
    <Autocomplete
      options={options}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => {
        return <CustomOutlinedInput {...params} label={label} />
      }}
      renderOption={renderOption}
      ListboxProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.background.main,
          color: (theme) => theme.palette.text.white,
          "& .MuiAutocomplete-groupLabel": {
            color: (theme) => theme.palette.text.primary,
            fontSize: "1.5rem",
            fontStyle: "italic",
            backgroundColor: (theme) => theme.palette.background.secondary,
          },
        },
      }}
      {...props}
    />
  )
)(({ theme }) => ({}))

export default function CustomOutlinedAutocomplete(props) {
  return (
    <Grouped
      options={props.options}
      groupBy={props.groupBy}
      getOptionLabel={props.getOptionLabel}
      label={props.label}
      renderOption={props.renderOption}
      {...props}
    />
  )
}
