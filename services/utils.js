import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"
import { defaultConfig } from "../config/defaultConfig"
import apiCall from "./apiCalls/apiCall"
import { getToken, removeToken, setRefreshToken, setToken } from "./cookies"

export async function logout() {
  const res = await apiCall.users.auth.logout()
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
  if (decodedToken && decodedToken.exp < Date.now() / 1000) return true
  return false
}

export async function getFreshToken() {
  if (!isTokenExpired(getUser())) {
    return getToken()
  }
  console.info("Token is expired")
  const res = await apiCall.users.auth.getAccessToken()

  if (res && res.ok) {
    const tokens = await res.json()
    setToken(tokens.token)
    setRefreshToken(tokens.refresh_token)
    return tokens.token
  }
  console.info("Couldn't get an access token")

  removeToken()

  // Trick to force the app to reload and detect there is no access token anymore from cookies
  window.location.reload()
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

export function checkVATnumber(phone) {
  const regex = RegExp(
    /^(ATU[0-9]{8}|BE[01][0-9]{9}|BG[0-9]{9,10}|HR[0-9]{11}|CY[A-Z0-9]{9}|CZ[0-9]{8,10}|DK[0-9]{8}|EE[0-9]{9}|FI[0-9]{8}|FR[0-9A-Z]{2}[0-9]{9}|DE[0-9]{9}|EL[0-9]{9}|HU[0-9]{8}|IE([0-9]{7}[A-Z]{1,2}|[0-9][A-Z][0-9]{5}[A-Z])|IT[0-9]{11}|LV[0-9]{11}|LT([0-9]{9}|[0-9]{12})|LU[0-9]{8}|MT[0-9]{8}|NL[0-9]{9}B[0-9]{2}|PL[0-9]{10}|PT[0-9]{9}|RO[0-9]{2,10}|SK[0-9]{10}|SI[0-9]{8}|ES[A-Z]([0-9]{8}|[0-9]{7}[A-Z])|SE[0-9]{12}|GB([0-9]{9}|[0-9]{12}|GD[0-4][0-9]{2}|HA[5-9][0-9]{2}))$/gm
  )
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

export function removeHtmlTags(htmlString) {
  if (!htmlString) return ""
  return htmlString.replace(/(<([^>]+)>)/gi, "")
}

export const buildPublicURL = (path, opt = { imgSize: null }) => {
  if (!path) return null
  if (!!opt.imgSize)
    return `${defaultConfig.ftpPublicBasePath}${path.split(".")[0]}-${
      opt.imgSize
    }.${path.split(".")[1]}`
  return `${defaultConfig.ftpPublicBasePath}${path}`
}

export const notEmptyString = (string) => {
  if (!string) return false
  if (typeof string !== "string") return false
  if (string.trim() === "") return false
  return true
}

export const scrollTo = (ref) => {
  ref.current.scrollIntoView({
    behavior: "smooth",
  })
}

export const formatPrice = (price) => {
  return Number(price / 100).toFixed(2)
}

export const VimeoYoutubeURLparser = (url) => {
  let service = ""
  let id = ""
  if (!url) return { service, id }

  if (url.includes("youtu")) {
    service = "youtube"
    if (url.includes("watch?v=")) id = url.split("watch?v=")[1].split("&")[0]
    else if (url.includes("youtu.be/"))
      id = url.split("youtu.be/")[1].split("?")[0].split("/")[0]
  }

  if (url.includes("vimeo")) {
    service = "vimeo"
    id = url.split("vimeo.com/")[1].split("?")[0]
  }

  return { service, id }
}

export const zeroPad = (num, places) => String(num).padStart(places, "0")
