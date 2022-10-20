import React, { useContext } from "react"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import LoginLayout from "../../components/Layouts/LoginLayout"
import AdminManageWebsiteInfoPanel from "../../components/Layouts/admin/AdminWebsiteInfoPanel"
import { useRouter } from "next/router"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Admin | Gérer les informations du site",
  description:
    "Page d'administration du site : gérer les informations de votre site (footer, navbar, contenu...)",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AdminManageWebsiteInformations() {
  // Check if user has grant to access that page
  const router = useRouter()
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN) router.push("/account")

  return (
    <PagesLayout head={head}>
      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminManageWebsiteInfoPanel />
      ) : (
        <LoginLayout />
      )}
    </PagesLayout>
  )
}
