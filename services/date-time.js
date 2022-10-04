import { getTimezoneOffset } from "date-fns-tz"

export function getLocaleDateTime(dateTimeToConvert, timezoneToDisplay) {
  const unix = new Date(dateTimeToConvert).getTime()
  const offset = getTimezoneOffset(timezoneToDisplay)
  const date = new Date(unix + offset)
  return date
}

export function convertToShortString(dateTime) {
  return dateTime.toLocaleDateString("fr-FR", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function convertToLongString(dateTime) {
  return dateTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
