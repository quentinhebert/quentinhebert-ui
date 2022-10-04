import { Stack } from "@mui/material"
import { useContext, useEffect } from "react"
import CustomCircularProgress from "../components/ReusableComponents/custom-circular-progress"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import BodyText from "../components/ReusableComponents/text/body-text"
import { UserContext } from "../contexts/UserContext"
import { logout } from "../services/utils"

export default function LogoutPage() {
  // Main meta tags
  const title = "Déconnexion"
  const description = "Page de déconnexion"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

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
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />
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
    </PageRoot>
  )
}
