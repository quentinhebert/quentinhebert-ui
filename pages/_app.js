import { ThemeProvider } from "@mui/material"
import "../styles/globals.css"
import theme from "../config/theme"
import { useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { getToken } from "../services/cookies"
import { getUser } from "../services/utils"
import apiCall from "../services/apiCalls/apiCall"
import Loading from "../components/Other/loading"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps, router }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(getToken())

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
  if (!user && !!accessToken && accessToken !== "") {
    fetchUser()
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
