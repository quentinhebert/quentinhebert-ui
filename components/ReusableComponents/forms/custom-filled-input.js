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
    // background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
    background: theme.palette.background.main,
    color: theme.palette.text.white, // input value
    "&:hover": {
      // background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
      background: theme.palette.background.main,
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.main,
    },
  },
  "& .MuiFilledInput-input.Mui-disabled": {
    background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
    color: "grey",
  },
  "& .MuiFormLabel-root.Mui-focused.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiFilledInput-root.Mui-error": {
    color: theme.palette.error.main,
    margin: 0,
    marginLeft: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme.palette.error.main,
    margin: 0,
  },
}))

export default function CustomFilledInput(props) {
  return <CssFilledInput {...props} />
}
