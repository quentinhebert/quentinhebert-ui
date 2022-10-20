import React, { useContext } from "react"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import AdminFilesPanel from "../../components/Layouts/admin/AdminFilesPanel"
import { useRouter } from "next/router"
import LoginLayout from "../../components/Layouts/LoginLayout"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Admin | Gérer les fichiers du site",
  description:
    "Page d'administration du site : gérez les fichiers de votre site",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function AdminFilesManagementPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  const router = useRouter()
  if (!!user && user.type !== USERTYPES.ADMIN) router.push("/account")

  return (
    <PagesLayout head={head}>
      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminFilesPanel />
      ) : (
        <LoginLayout />
      )}
    </PagesLayout>
  )
}
