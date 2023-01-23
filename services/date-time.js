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

export function convertDateToShortString(dateTime) {
  if (!dateTime) return ""
  const date = new Date(dateTime)
  const thisYear = new Date().getFullYear()

  let options = {
    weekday: "short",
    month: "2-digit",
    day: "numeric",
  }
  if (date.getFullYear() !== thisYear) options.year = "2-digit"

  return date.toLocaleDateString("fr-FR", options)
}

export function convertDateToLongString(dateTime) {
  if (!dateTime) return ""
  const date = new Date(dateTime)
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getTodayShortString() {
  const today = new Date()
  const todayDate = convertToShortString(today)
  return todayDate
}

export function getYesterdayShortString() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayDate = convertToShortString(yesterday)
  return yesterdayDate
}

export function formatDayDate({ timestamp, timezone }) {
  const today = getTodayShortString().split(" ")[0]
  const yesterday = getYesterdayShortString().split(" ")[0]
  const dateTime = convertToShortString(
    getLocaleDateTime(new Date(timestamp), timezone)
  )
  const date = dateTime.split(" ")[0]
  const time = dateTime.split(" ")[1]
  let formattedDate = `${date} à ${time}`
  if (date === today) formattedDate = `${time}`
  if (date === yesterday) formattedDate = `Hier à ${time}`
  return formattedDate
}
