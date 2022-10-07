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

function MyApp({ Component, pageProps, router }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [minimumDelay, setMinimumDelay] = useState(false)

  setTimeout(() => {
    setMinimumDelay(true)
  }, 2000)

  // In case we have to convert access token into a user (i.e. when coming directly from URL)
  const fetchUser = async () => {
    const userFromToken = getUser(accessToken)
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      if (minimumDelay) setUser(userData)
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
  }, [user, accessToken, minimumDelay])

  if (!user && !!accessToken && accessToken !== "") {
    return <AnimatedLogoLayout />
  }

  return (
    <UserContext.Provider value={{ user, setUser, setAccessToken, fetchUser }}>
      <ThemeProvider theme={theme}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
