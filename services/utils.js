import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"
import apiCall from "./apiCalls/apiCall"
import { getToken, removeToken, setRefreshToken, setToken } from "./cookies"

export async function logout() {
  const res = await apiCall.users.logout()
  if (res && res.ok) {
    removeToken()
    return true
  }
  return false
}

export function getUser(token) {
  if (getToken() || token) {
    return jsonwebtoken.decode(getToken() || token)
  }
  return null
}

export function isTokenExpired(decodedToken) {
  if (decodedToken && decodedToken.exp < Date.now() / 1000) {
    return true
  }
  return false
}

export async function getFreshToken() {
  if (!isTokenExpired(getUser())) {
    return getToken()
  }
  console.info("Token is expired")
  const res = await apiCall.users.getAccessToken()

  if (res && res.ok) {
    const tokens = await res.json()
    setToken(tokens.token)
    setRefreshToken(tokens.refresh_token)
    return tokens.token
  }
  console.info("Couldn't get an access token")
  return logout()
}

export function checkEmail(email) {
  const regex = RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm
  )
  return regex.test(email)
}

export function checkPhone(phone) {
  const regex = RegExp(/^(?:(?:\+|00)33|0|33)\s*[1-9](?:[\s.-]*\d{2}){4}$/gm)
  return regex.test(phone)
}

export function checkPassword(password) {
  const regex = RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
  )
  return regex.test(password)
}

export function getQueryParam(queryParam) {
  const router = useRouter()
  const res =
    router.asPath.match(new RegExp(`[?&]${queryParam}(=([^&#]*)|&|#|$)`)) || []
  return res[2]
}

export function generateUuidV4() {
  let dt = new Date().getTime()
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}
