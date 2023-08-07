import { MuiTelInput, matchIsValidTel } from "mui-tel-input"
import { useState } from "react"

export default function CustomFilledPhoneInput({
  required,
  value,
  handleChange,
  label,
  error,
  helperText,
}) {
  const [hasError, setHasError] = useState(error)

  const onChange = (newValue, info) => {
    if (info.countryCallingCode === null) return
    setHasError(
      (!matchIsValidTel(newValue) || error) && info.nationalNumber !== ""
    )
    return handleChange(info.numberValue)
  }

  return (
    <MuiTelInput
      MenuProps={{
        sx: { "& .MuiTelInput-MenuItem": { color: "#fff" } },
      }}
      defaultCountry="FR"
      type="phone"
      variant="filled"
      label={label || <>Téléphone{!required ? " (optionnel)" : ""}</>}
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
        "& .MuiFilledInput-input": {
          color: "#fff",
          pt: "21px",
          pb: "4px",
        },
        "& .MuiFilledInput-root": {
          border: (theme) =>
            `1px solid ${
              hasError
                ? theme.palette.error.main
                : !required
                ? "grey"
                : theme.palette.secondary.main
            }`,
          borderRadius: "10px",
          background: "#000",
        },
        borderColor: (theme) => theme.palette.secondary.main,
        color: "#fff",
        "& .MuiInputLabel-root": {
          transform: "translate(12px, 4px) scale(0.75)",
          color: (theme) =>
            hasError
              ? theme.palette.error.main
              : !required
              ? "grey"
              : theme.palette.secondary.main,
          "&.Mui-focused": {
            color: (theme) =>
              hasError
                ? theme.palette.error.main
                : !required
                ? "grey"
                : theme.palette.secondary.main,
          },
          "&.Mui-active": {
            background: "#000",
          },
        },
        "& .MuiFormHelperText-root": {
          ml: 0,
        },
        "& .MuiIconButton-root": {
          padding: 0,
        },
      }}
      InputProps={{ disableUnderline: true }}
      error={hasError}
      helperText={hasError && helperText ? helperText : null}
    />
  )
}
