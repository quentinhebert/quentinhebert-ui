import { getTimezoneOffset } from "date-fns-tz"

export default function getLocaleDateTime(
  dateTimeToConvert,
  timezoneToDisplay
) {
  const unix = new Date(dateTimeToConvert).getTime()
  const offset = getTimezoneOffset(timezoneToDisplay)
  const date = new Date(unix + offset)
  return date
}
