import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import {
  getLanguage,
  getToken,
  removeToken,
  setLanguage,
} from "../services/cookies"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import { AnimatePresence } from "framer-motion"
import { AppContext } from "../contexts/AppContext"
import Snacks from "../components/Navigation/snacks"
import AnimatedLogoLayout from "../components/Animation/animated-logo"

function MyApp({ Component, pageProps, router }) {
  // User
  const [user, setUser] = useState(null)

  // Loading
  const [appLoading, setAppLoading] = useState(true)
  const [isUserDataFetching, setIsUserDataFetching] = useState(false)
  const [isAnimationProcessing, setIsAnimationProcessing] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [lang, setLang] = useState("fr")

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
    } else if (res && res.status === 401) {
      removeToken() // Local storage
    }

    setIsUserDataFetching(false)
  }

  // Everytime the app is restarted, we look for a token stocked in cookies. If the user context has no user but cookies do, we fetch up-to-date user info to set the user from the context
  useEffect(() => {
    if (!!getToken() && getToken() !== "" && !user) fetchUser()
  }, [])

  useEffect(() => {
    if (!isAnimationProcessing && !isUserDataFetching && !firstLoad) {
      setAppLoading(false)

      // Trick to hide scrollbar (in globals.css > body) and make it auto visible once appLoading is finished
      document.body.style.overflowY = "auto"
    } else {
      setAppLoading(true)
      setIsAnimationProcessing(true)
      setTimeout(() => {
        setFirstLoad(false)
        setIsAnimationProcessing(false)
      }, 1000)
    }
  }, [isAnimationProcessing, isUserDataFetching])

  function toggleLang(lg) {
    // Set context value
    setLang(lg)
    // Set cookie
    setLanguage(lg)
  }
  useEffect(() => {
    // If th language cookie is set, we update the context state
    setLang(getLanguage() || "fr")
    // If the URL overrides (i.e. "?lang=en") we update the context state
    if (!!router?.state?.query?.lang) return setLang(router.state.query.lang)
  }, [])

  return (
    <AppContext.Provider
      value={{
        appLoading,
        setAppLoading,
        setSnackSeverity,
        setSnackMessage,
        lang,
        toggleLang,
      }}
    >
      <UserContext.Provider value={{ user, setUser, fetchUser }}>
        <ThemeProvider theme={theme}>
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.route} />
            <Snacks
              severity={snackSeverity}
              message={snackMessage}
              setMessage={setSnackMessage}
            />
          </AnimatePresence>

          {appLoading && <AnimatedLogoLayout />}
        </ThemeProvider>
      </UserContext.Provider>
    </AppContext.Provider>
  )
}

export default MyApp
