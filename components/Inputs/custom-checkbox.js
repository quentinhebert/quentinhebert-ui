import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { styled } from "@mui/system"

const CssCheckbox = styled((props) => (
  <Checkbox
    sx={{
      "&.MuiCheckbox-root": {
        color: (theme) => theme.palette.text.secondary,
      },
      "&.Mui-checked": {
        color: props.checkedcolor || ((theme) => theme.palette.text.secondary),
      },
    }}
    value={props.value}
    {...props}
  />
))(() => ({}))

const CssFormGroup = styled((props) => (
  <FormGroup
    sx={{
      "& .MuiFormControlLabel-root": {
        marginRight: 0,
      },
    }}
  >
    <FormControlLabel
      control={<CssCheckbox checkedcolor={props.checkboxcolor} {...props} />}
      sx={{
        color: props.labelcolor || ((theme) => theme.palette.text.primary),
        "& .MuiFormControlLabel-label": {
          color: props.labelcolor || ((theme) => theme.palette.text.secondary),
          fontFamily: props.fontFamily || "Helmet",
          fontWeight: props.fontWeight || "",
          fontSize: props.fontSize || {
            xs: "0.8rem",
            sm: "0.9rem",
            md: "1rem",
          },
          letterSpacing: { xs: 0.25, sm: 0.5, md: 1 },
        },
      }}
      label={props.label}
    />
  </FormGroup>
))(() => ({}))

export default function CustomCheckbox(props) {
  return <CssFormGroup {...props} />
}
