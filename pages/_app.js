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
import { defaultConfig } from "../config/defaultConfig"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { FacebookProvider } from "react-facebook"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  // User
  const [user, setUser] = useState(null)

  // Loading
  const [appLoading, setAppLoading] = useState(true)
  const [isUserDataFetching, setIsUserDataFetching] = useState(false)
  const [isAnimationProcessing, setIsAnimationProcessing] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [lang, setLang] = useState("fr")

  const router = useRouter()

  // Snacks
  const [snackSeverity, setSnackSeverity] = useState("error")
  const [snackMessage, setSnackMessage] = useState("")

  function handleSuccess(msg) {
    setSnackSeverity("success")
    setSnackMessage(msg)
  }
  function handleError(msg) {
    setSnackSeverity("error")
    setSnackMessage(msg)
  }
  function handleInfo(msg) {
    setSnackSeverity("info")
    setSnackMessage(msg)
  }

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
        handleSuccess,
        handleError,
        handleInfo,
        lang,
        toggleLang,
      }}
    >
      <GoogleOAuthProvider clientId={defaultConfig.googleId}>
        <FacebookProvider appId={defaultConfig.facebookAppId}>
          <UserContext.Provider value={{ user, setUser, fetchUser }}>
            <ThemeProvider theme={theme}>
              <AnimatePresence
                mode="wait"
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <motion.div key={router.pathname}>
                  <Component {...pageProps} />
                  <Snacks
                    severity={snackSeverity}
                    message={snackMessage}
                    setMessage={setSnackMessage}
                  />

                  {appLoading && <AnimatedLogoLayout />}

                  <PageTransitionIn background={theme.palette.secondary.main} />
                  <PageTransitionOut
                    background={theme.palette.secondary.main}
                  />
                </motion.div>
              </AnimatePresence>
            </ThemeProvider>
          </UserContext.Provider>
        </FacebookProvider>
      </GoogleOAuthProvider>
    </AppContext.Provider>
  )
}

function PageTransitionIn({ duration, delay, background, ...props }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        minWidth: "100vh",
        width: "100vw",
        background: background || "#fff",
        zIndex: 1000000000000,
      }}
      initial={{
        y: "-100vh",
        borderRadius: "0 0 100% 100%",
      }}
      animate={{ y: "-100vh", borderRadius: "0 0 100% 100%" }}
      exit={{ y: 0, borderRadius: "0%" }}
      transition={{
        duration: duration || 1,
        delay: delay || 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    ></motion.div>
  )
}
function PageTransitionOut({ duration, delay, background }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        minWidth: "100vh",
        width: "100vw",
        background: background || "#fff",
        zIndex: 1000000000000,
      }}
      initial={{ y: 0, borderRadius: "0%" }}
      animate={{ y: "100vh", borderRadius: "100% 100% 0 0" }}
      transition={{
        duration: duration || 1,
        delay: delay || 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    ></motion.div>
  )
}

export default MyApp
