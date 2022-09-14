import { FormControlLabel, FormGroup } from "@mui/material"
import { alpha, styled } from "@mui/material/styles"
import Switch from "@mui/material/Switch"

const MySwitchButton = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.secondary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.secondary.main,
  },
}))

export default function SwitchButton(props) {
  const { checked, handleCheck } = props

  const handleChange = (event) => {
    handleCheck(event.target.checked)
  }

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ color: (theme) => theme.palette.text.secondary }}
        control={
          <MySwitchButton
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={props.label}
      />
    </FormGroup>
  )
}
