import { Input } from "@mui/material"
import { styled } from "@mui/system"

const CssFilledInput = styled((props) => (
  <Input
    size="small"
    sx={{
      width: "100%",
      borderRadius: "10px",
      padding: "12px",
      textDecoration: "none",
      color: (theme) => theme.palette.text.white,
      border: (theme) => `1px solid ${theme.palette.secondary.main}`,
      background: "#000",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiInput-input": {
    padding: 0,
    opacity: 1,
  },
  "& .MuiInput-input::placeholder": {
    padding: 0,
    opacity: 1,
    color: theme.palette.text.secondary,
  },
}))

export default function CustomFilledInputIcon(props) {
  return <CssFilledInput {...props} />
}
