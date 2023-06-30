import { defaultConfig } from "../config/defaultConfig"

window.fbAsyncInit = function () {
  FB.init({
    appId: defaultConfig.facebookAppId,
    xfbml: true,
    version: "v17.0",
  })
  FB.AppEvents.logPageView()
}
function initFB(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = "https://connect.facebook.net/en_US/sdk.js"
  fjs.parentNode.insertBefore(js, fjs)
}

initFB(document, "script", "facebook-jssdk")
