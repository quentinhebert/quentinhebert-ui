import Cookies from "js-cookie"

export function setToken(token) {
  Cookies.set("token", token, { expires: 7 })
}

export function getToken() {
  return Cookies.get("token")
}

export function setRefreshToken(refreshToken) {
  Cookies.set("refresh_token", refreshToken, { expires: 7 })
}

export function getRefreshToken() {
  return Cookies.get("refresh_token")
}

export function getLanguage() {
  return Cookies.get("lang")
}
export function setLanguage(lang) {
  Cookies.set("lang", lang, { expires: 7 })
}

export function removeToken() {
  Cookies.set("token", "")
  Cookies.set("refresh_token", "")
}
