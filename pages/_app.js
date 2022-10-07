import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { getToken } from "../services/auth"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import Loading from "../components/Other/loading"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps, router }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  // In case we have to convert access token into a user (i.e. when coming directly from URL)
  const fetchUser = async () => {
    const userFromToken = getUser(accessToken)
    const res = await apiCall.users.get(userFromToken.id)
    if (res && res.ok) {
      const userData = await res.json()
      setUser(userData)
    } else {
      setAccessToken(null)
    }
  }

  useEffect(() => {
    if (window) setAccessToken(getToken())
    if (!user && !!accessToken && accessToken !== "") {
      fetchUser()
    }
  }, [user, accessToken])

  if (!user && !!accessToken && accessToken !== "") {
    return (
      <body>
        <Loading />
      </body>
    )
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
