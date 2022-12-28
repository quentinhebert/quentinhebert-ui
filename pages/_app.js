import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { getToken, removeToken } from "../services/auth"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import { AnimatePresence } from "framer-motion"
import { AppContext } from "../contexts/AppContext"
import Snacks from "../components/Navigation/snacks"
import AnimatedLogoLayout from "../components/Animation/animated-logo"

function MyApp({ Component, pageProps, router }) {
  // User
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  // Loading
  const [appLoading, setAppLoading] = useState(false)
  const [isUserDataFetching, setIsUserDataFetching] = useState(false)
  const [isAnimationProcessing, setIsAnimationProcessing] = useState(false)

  // Snacks
  const [snackSeverity, setSnackSeverity] = useState("error")
  const [snackMessage, setSnackMessage] = useState("")

  // In case user is logged in and app is restarted
  const fetchUser = async () => {
    setIsUserDataFetching(true)

    const userFromToken = getUser(getToken())
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      setUser(userData)
      setAccessToken(getToken()) // Context
    } else if (res && res.status === 401) {
      removeToken() // Local storage
      setAccessToken(null) // Context
    }

    setIsUserDataFetching(false)
  }

  // Everytime the app is restarted, we look for a token stocked in cookies. If the user context has no user but cookies do, we fetch up-to-date user info to set the user from the context
  useEffect(() => {
    if (!!getToken() && getToken() !== "" && !user) fetchUser()
  }, [])

  useEffect(() => {
    if (!isAnimationProcessing && !isUserDataFetching) setAppLoading(false)
    else {
      setAppLoading(true)
      setIsAnimationProcessing(true)
      setTimeout(() => setIsAnimationProcessing(false), 800)
    }
  }, [isAnimationProcessing, isUserDataFetching])

  // Initial state
  useEffect(() => {
    setAppLoading(!!getToken() && getToken() !== "" && !user)
  }, [])

  // Loading page
  if (appLoading) return <AnimatedLogoLayout />

  return (
    <AnimatePresence exitBeforeEnter>
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
            <Component {...pageProps} key={router.route} />
            <Snacks
              severity={snackSeverity}
              message={snackMessage}
              setMessage={setSnackMessage}
            />
          </ThemeProvider>
        </UserContext.Provider>
      </AppContext.Provider>
    </AnimatePresence>
  )
}

export default MyApp
