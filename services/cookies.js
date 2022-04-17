import Cookies from "js-cookie";

export function setToken(token) {
  Cookies.set("token", token);
}

export function getToken() {
  return Cookies.get("token");
}

export function setRefreshToken(refreshToken) {
  Cookies.set("refresh_token", refreshToken);
}

export function getRefreshToken() {
  return Cookies.get("refresh_token");
}

export function removeToken() {
  Cookies.set("token", "");
  Cookies.set("refresh_token", "");
}

export function setFirstEntry() {
  Cookies.set("welcome", true);
}

export function getFirstEntry() {
  return Cookies.get("welcome");
}

export function removeFirstEntry() {
  Cookies.set("welcome", false);
}
