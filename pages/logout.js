import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import { defaultConfig } from "../config/defaultConfig"
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

  // Check if user is logged in
  const { user } = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      logout()
    }
    router.push("/")
  }, [user, router])

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />
    </PageRoot>
  )
}
