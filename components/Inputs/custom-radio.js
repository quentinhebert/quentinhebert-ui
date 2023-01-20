import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"

export default function CustomRadio({ options, label, setValue }) {
  return (
    <FormControl sx={{ width: "100%" }}>
      {!!label && (
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      )}
      <RadioGroup
        onChange={(e) => setValue(e.target.value)}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={options[0].id}
        name="radio-buttons-group"
        sx={{
          "& .MuiFormControlLabel-label": {
            color: "#fff",
          },
          "& .Mui-checked": {
            color: (theme) => `${theme.palette.text.secondary} !important`,
          },
          "& .Mui-active": {
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        {options.map((option, key) => (
          <FormControlLabel
            key={key}
            value={option.id}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
