import { TextField } from "@mui/material"
import { styled } from "@mui/system"

const CssFilledInput = styled((props) => (
  <TextField
    size="small"
    variant="filled"
    InputProps={{ disableUnderline: true }}
    sx={{
      width: "100%",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fff",
    color: theme.palette.text.primary, // input value
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
  "& .MuiFormLabel-root.Mui-focused.Mui-error": {
    color: "#f44336",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiFilledInput-root.Mui-error": {
    color: "#f44336",
    margin: 0,
    marginLeft: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#fff",
    margin: 0,
  },
}))

export default function CustomFilledInput(props) {
  return <CssFilledInput {...props} />
}
