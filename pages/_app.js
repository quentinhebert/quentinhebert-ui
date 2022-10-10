import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { getToken, removeToken } from "../services/auth"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import { AnimatePresence } from "framer-motion"
import AnimatedLogoLayout from "../components/ReusableComponents/animations/animated-logo"
import { AppContext } from "../contexts/AppContext"
import Snacks from "../components/Navigation/snacks"
import Navbar from "../components/Navigation/Navbars/navbar"

function MyApp({ Component, pageProps, router }) {
  // User
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  // Loading
  const [appLoading, setAppLoading] = useState(false)
  const [isUserDataFetching, setIsUserDataFetching] = useState(false)
  const [isAppDataFetching, setIsAppDataFetching] = useState(false)

  // Snacks
  const [snackSeverity, setSnackSeverity] = useState("error")
  const [snackMessage, setSnackMessage] = useState("")

  // In case user is logged in and app is restarted
  const fetchUser = async () => {
    setIsUserDataFetching(true)
    const userFromToken = getUser(accessToken)
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      if (!appLoading) setUser(userData)
    } else {
      removeToken() // Local storage
      setAccessToken(null) // Context
    }
    setIsUserDataFetching(!!user)
  }

  // In case app is restarted
  const fetchAppInfos = async () => {
    setIsAppDataFetching(true)
    //
    setIsAppDataFetching(false)
  }

  // Everytime the app is restarted, we look for a token stocked in cookies. If the user context has no user but cookies do, we fetch up-to-date user info to set the user from the context
  useEffect(() => {
    // Get token from cookies
    if (window && getToken()) setAccessToken(getToken())

    // If user from context is null, but there is a token in cookies
    if (!user && !!accessToken && accessToken !== "") fetchUser()
  }, [user, accessToken])

  // Let the loading animation finish if it started
  useEffect(() => {
    if (appLoading)
      setTimeout(() => {
        setAppLoading(false)
      }, 1000)
  }, [appLoading])

  // Update loading state
  useEffect(() => {
    if (isAppDataFetching || isUserDataFetching) setAppLoading(true)
  }, [isAppDataFetching, isUserDataFetching])

  // Loading page
  if (appLoading) return <AnimatedLogoLayout />

  return (
    <AppContext.Provider
      value={{
        appLoading,
        setAppLoading,
        setSnackSeverity,
        setSnackMessage,
      }}
    >
      <UserContext.Provider
        value={{ user, setUser, setAccessToken, fetchUser }}
      >
        <ThemeProvider theme={theme}>
          <Navbar />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Snacks
            severity={snackSeverity}
            message={snackMessage}
            setMessage={setSnackMessage}
          />
        </ThemeProvider>
      </UserContext.Provider>
    </AppContext.Provider>
  )
}

export default MyApp
