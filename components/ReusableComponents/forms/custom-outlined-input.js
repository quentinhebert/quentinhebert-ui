import { TextField } from "@mui/material"
import { styled } from "@mui/system"

const CssOutlinedInput = styled((props) => (
  <TextField
    size="small"
    variant="outlined"
    color="primary"
    sx={{
      width: "100%",
    }}
    inputProps={{
      sx: {
        color: (theme) => theme.palette.text.white,
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  // color of the fieldset
  "& fieldset": {
    borderColor: theme.palette.secondary.main,
  },
  // color of the label on focus
  "& .Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiOutlinedInput-root": {
    // Color of the fieldset on focus
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    // Color of the fieldset on hover
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },

  // Handle error styles
  "& .Mui-error": {
    // Default fieldset
    "& fieldset": {
      color: "#f44336",
    },
    // Fieldset on hover
    "&:hover fieldset": {
      borderColor: "#f44336",
    },
    // Fieldset on focus
    "&.Mui-focused fieldset": {
      borderColor: "#f44336",
    },
    // Color of the label
    color: "#f44336",
    // Some css for the helper text
    lineHeight: 1,
    marginLeft: 0,
  },
}))

export default function CustomOutlinedInput(props) {
  return <CssOutlinedInput {...props} />
}
