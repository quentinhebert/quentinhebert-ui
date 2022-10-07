export function setToken(token) {
  localStorage.setItem("token", token)
}

export function getToken() {
  return localStorage.getItem("token")
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refresh_token", refreshToken)
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token")
}

export function removeToken() {
  localStorage.clear()
}
