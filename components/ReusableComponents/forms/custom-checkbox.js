import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { styled } from "@mui/system"

const CssCheckbox = styled((props) => (
  <Checkbox
    sx={{
      "&.Mui-checked": {
        color: props.checkedcolor || ((theme) => theme.palette.text.primary),
      },
    }}
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
      control={
        <CssCheckbox
          sx={{
            color:
              props.checkboxcolor || ((theme) => theme.palette.text.primary),
          }}
          checkedcolor={props.checkboxcolor}
          {...props}
        />
      }
      sx={{
        color: props.labelcolor || ((theme) => theme.palette.text.primary),
        "& .MuiFormControlLabel-label": {
          fontFamily: props.fontFamily || "Helmet",
          fontWeight: props.fontWeight || "",
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          letterSpacing: { xs: 0.25, sm: 0.5, md: 1 },
        },
      }}
      label={props.label}
      {...props}
    />
  </FormGroup>
))(() => ({}))

export default function CustomCheckbox(props) {
  return <CssFormGroup {...props} />
}
