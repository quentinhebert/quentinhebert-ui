import { Input } from "@mui/material"
import { styled } from "@mui/system"

const CssFilledInput = styled((props) => (
  <Input
    size="small"
    sx={{
      width: "100%",
      background: (theme) =>
        `linear-gradient(-90deg, transparent 0%, ${theme.palette.background.main} 10%)`,
      borderRadius: "5px",
      padding: "12px",
      textDecoration: "none",
      color: (theme) => theme.palette.text.white,
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
  },
}))

export default function CustomFilledInputIcon(props) {
  return <CssFilledInput {...props} />
}
