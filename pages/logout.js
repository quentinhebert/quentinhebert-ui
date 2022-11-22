import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import CustomCircularProgress from "../components/Helpers/custom-circular-progress"
import Redirect from "../components/Helpers/redirect"
import PagesLayout from "../components/Layouts/PagesLayout"
import BodyText from "../components/Text/body-text"
import { UserContext } from "../contexts/UserContext"
import { logout } from "../services/utils"

const head = {
  // Main meta tags
  title: "Déconnexion",
  description: "Page de déconnexion",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function LogoutPage() {
  // USER CONTEXT
  const { user, setUser, setAccessToken } = useContext(UserContext)

  const handleLogout = async () => {
    const isLoggedOut = await logout() // clean local cookies
    if (isLoggedOut) {
      setAccessToken(null) // User Context
      setUser(null) // User Context}
    } else {
      window.location.href = "/"
    }
  }

  useEffect(() => {
    if (user) {
      handleLogout()
    }
  }, [user])

  return (
    <PagesLayout head={head}>
      {!!user && (
        <Stack
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={4}
          flexGrow={1}
        >
          <CustomCircularProgress />
          <BodyText fontSize="1rem">Déconnexion...</BodyText>
        </Stack>
      )}

      {!user && <Redirect target="/" />}
    </PagesLayout>
  )
}
