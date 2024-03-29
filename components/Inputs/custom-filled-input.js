import { TextField } from "@mui/material"
import { styled } from "@mui/system"

const CssFilledInput = styled(({ width, background, ...props }) => (
  <TextField
    size="small"
    variant="filled"
    InputProps={{ disableUnderline: true, endAdornment: props?.endAdornment }}
    sx={{
      width: width || "100%",
    }}
    {...props}
  />
))(({ theme, borderColor, labelColor, background }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    // border: `1px solid ${theme.palette.secondary.main}`,
    border: `1px solid ${borderColor || theme.palette.secondary.main}`,
    // background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
    // background: theme.palette.background.main,
    background: background || "#000",
    color: theme.palette.text.white, // input value
    borderRadius: "10px",
    "&:hover": {
      // background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
      // background: theme.palette.background.main,
      background: "#000",
    },
    "&.Mui-focused": {
      // backgroundColor: theme.palette.background.main,
      background: "#000",
    },
  },
  "& .MuiFilledInput-input.Mui-disabled": {
    // background: `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
    color: "grey",
  },
  "& .MuiFormLabel-root": {
    color: labelColor || theme.palette.secondary.main,
  },
  "& .MuiFormLabel-root.Mui-focused.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: labelColor || theme.palette.secondary.main,
  },
  "& .MuiFilledInput-root.Mui-error": {
    color: theme.palette.error.main,
    borderColor: `${theme.palette.error.main} !important`,
    margin: 0,
    marginLeft: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme.palette.error.main,
    margin: 0,
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
    marginTop: 5,
  },
}))

export default function CustomFilledInput(props) {
  return <CssFilledInput {...props} />
}
