import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { getToken, removeToken } from "../services/auth"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import Loading from "../components/Other/loading"
import { AnimatePresence } from "framer-motion"
import AnimatedLogoLayout from "../components/ReusableComponents/animations/animated-logo"
import { AppContext } from "../contexts/AppContext"

function MyApp({ Component, pageProps, router }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [appLoading, setAppLoading] = useState(true)

  setTimeout(() => {
    setAppLoading(false)
  }, 2000)

  // In case we have to convert access token into a user (i.e. when coming directly from URL)
  const fetchUser = async () => {
    const userFromToken = getUser(accessToken)
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      if (!appLoading) setUser(userData)
    } else {
      removeToken() // Local storage
      setAccessToken(null) // Context
    }
  }

  useEffect(() => {
    if (window && getToken()) setAccessToken(getToken())
    if (!user && !!accessToken && accessToken !== "") {
      fetchUser()
    }
  }, [user, accessToken, appLoading])

  if ((!user && !!accessToken && accessToken !== "") || appLoading) {
    return <AnimatedLogoLayout />
  }

  return (
    <AppContext.Provider value={{ appLoading, setAppLoading }}>
      <UserContext.Provider
        value={{ user, setUser, setAccessToken, fetchUser }}
      >
        <ThemeProvider theme={theme}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </UserContext.Provider>
    </AppContext.Provider>
  )
}

export default MyApp
