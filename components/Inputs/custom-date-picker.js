import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Stack } from "@mui/material"
import CustomFilledInput from "./custom-filled-input"
import dayjs from "dayjs"
import "dayjs/locale/fr"

export default function CustomDatePicker({
  label,
  value,
  handleChange,
  error,
  noPicker,
  disabled,
  disablePast,
}) {
  let minDate = null
  if (disablePast) minDate = new Date()

  return (
    <Stack
      sx={{
        "& >.MuiPickersDay-root": { color: "#fff !important" },
        "& .MuiOutlinedInput-input": {
          color: "#fff",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
        <DatePicker
          minDate={minDate}
          disabled={disabled}
          disableOpenPicker={noPicker}
          label={label || "Date"}
          value={value ? dayjs(value).format() : null}
          onChange={(newValue) => {
            if (!newValue) return handleChange(null)
            handleChange(dayjs(newValue).format())
          }}
          inputFormat="DD/MM/YYYY"
          renderInput={(params) => {
            params.InputProps.disableUnderline = true
            params.inputProps.placeholder = "jj/mm/aaaa"
            return <CustomFilledInput {...params} error={error} />
          }}
          PaperProps={{
            sx: {
              "&&.MuiPickersPopper-paper": {
                color: (theme) => theme.palette.text.secondary,
              },
              "& .MuiPickersDay-root": {
                fontSize: "1rem",
                color: (theme) => theme.palette.text.secondary,
                "&.Mui-selected": {
                  backgroundColor: (theme) => theme.palette.text.secondary,
                  color: "#000",
                },
                "&.Mui-active": {
                  backgroundColor: (theme) => theme.palette.text.secondary,
                  color: "#000",
                },
                "&:hover.Mui-selected": {
                  backgroundColor: (theme) => theme.palette.text.secondary,
                  color: "#000",
                },
                "&.Mui-disabled": {
                  color: "grey !important",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  )
}
